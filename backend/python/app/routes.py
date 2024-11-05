import time
import difflib
from flask import Blueprint, jsonify, request, send_file
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from deep_translator import GoogleTranslator
from transformers import pipeline
# from googletrans import Translator
# from openai import OpenAI
from transformers import pipeline
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import JSONFormatter
from pydub import AudioSegment
import gspread
import os
import numpy as np
import librosa
from flask_cors import CORS
import re
import assemblyai as aai
import requests
from googleapiclient.discovery import build
from youtube_transcript_api import YouTubeTranscriptApi
import nltk
from nltk.corpus import wordnet, stopwords
import speech_recognition as sr
import firebase_admin
from firebase_admin import credentials, storage
from gtts import gTTS
from PIL import Image
from pathlib import Path
import google.generativeai as genai
nltk.download('punkt')
nltk.download('wordnet')
generate_response_api = Blueprint('generate_response_api', __name__)
CORS(generate_response_api)

# Replace with your API key
aai.settings.api_key = "1d122f8f2f644b43a9b690494f619db0"

def upload_audio(file_path):
    # Note: AssemblyAI doesn't require separate upload for local files
    return file_path

def transcribe_audio(file_url):
    transcriber = aai.Transcriber()
    transcript = transcriber.transcribe(file_url)
    return transcript

def get_transcription_result(transcript):
    while transcript.status not in [aai.TranscriptStatus.completed, aai.TranscriptStatus.error]:
        time.sleep(5)  # Wait before polling again
        transcript = aai.Transcriber.get_transcript(transcript.id)
    
    if transcript.status == aai.TranscriptStatus.error:
        raise Exception(f"Transcription failed: {transcript.error}")
    
    return transcript.text

def convert_audio_to_text(file_path):
    try:
        file_url = upload_audio(file_path)
        transcript = transcribe_audio(file_url)
        return get_transcription_result(transcript)
    except Exception as e:
        raise Exception(f"Error converting audio to text: {str(e)}")

def convert_mp3_to_wav(mp3_path, wav_path):
    try:
        audio = AudioSegment.from_mp3(mp3_path)
        audio.export(wav_path, format='wav')
    except Exception as e:
        raise Exception(f"Error converting MP3 to WAV: {str(e)}")

def download_audio(url, output_path):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        with open(output_path, 'wb') as file:
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:
                    file.write(chunk)
    except requests.RequestException as e:
        raise Exception(f"Failed to download audio: {e}")

def compute_mfcc(file_path):
    try:
        y, sr = librosa.load(file_path, sr=22050)
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
        return np.mean(mfccs, axis=1)
    except Exception as e:
        raise Exception(f"Error computing MFCC for {file_path}: {str(e)}")

def compare_audio(user_audio_path, reference_audio_path):
    try:
        user_mfcc = compute_mfcc(user_audio_path)
        reference_mfcc = compute_mfcc(reference_audio_path)
        distance = np.linalg.norm(user_mfcc - reference_mfcc)
        return distance
    except Exception as e:
        raise Exception(f"Error comparing audio files: {str(e)}")

def calculate_proficiency(distance, max_distance):
    proficiency_percentage = max(0, 100 - (distance / max_distance * 100))
    return proficiency_percentage

def get_reference_audio_path(word):
    return os.path.join('audio_samples', f'{word}.wav')

def compare_text(text1, text2):
    words1 = set(re.findall(r'\w+', text1.lower()))
    words2 = set(re.findall(r'\w+', text2.lower()))
    common_words = words1.intersection(words2)
    similarity = len(common_words) / max(len(words1), len(words2)) * 100
    return similarity

MAX_DISTANCE = 10.0

@generate_response_api.route('/evaluate_proficiency', methods=['POST'])
def evaluate_proficiency():
    if 'user_audio' not in request.files:
        return jsonify({'error': 'Missing user_audio'}), 400

    if 'word' not in request.form:
        return jsonify({'error': 'Missing word'}), 400

    if 'reference_audio_url' not in request.form:
        return jsonify({'error': 'Missing reference_audio_url'}), 400

    user_audio = request.files['user_audio']
    word = request.form.get('word')
    reference_audio_url = request.form.get('reference_audio_url')

    if not reference_audio_url.startswith('http'):
        return jsonify({'error': 'reference_audio_url should be a valid URL'}), 400

    user_audio_path = os.path.join('audio_samples', f'{word}_user.wav')
    user_audio.save(user_audio_path)

    mp3_path = os.path.join('audio_samples', f'{word}.mp3')
    wav_path = get_reference_audio_path(word)
    
    try:
        download_audio(reference_audio_url, mp3_path)
        convert_mp3_to_wav(mp3_path, wav_path)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    try:
        user_text = convert_audio_to_text(user_audio_path)
        print(user_text)
        reference_text = convert_audio_to_text(wav_path)
        text_similarity = compare_text(user_text, word)
        result = {'text_similarity': text_similarity}
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify(result), 200




YOUTUBE_API_KEY = 'AIzaSyCH8l3BK-JCGRe6p8DmZZg5D17_anLHTfk'
youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

# Download stopwords
nltk.download('stopwords')

search_api = Blueprint('search_api', __name__)

# Function to search videos on YouTube
def search_youtube(query):
    request = youtube.search().list(
        q=query,
        part='id,snippet',
        type='video',
        order='relevance',
    )
    response = request.execute()
    return response.get('items', [])

# Function to get the video transcript
def get_video_transcript(video_id):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        return transcript
    except Exception as e:
        return None

# Function to find the word in transcript and return its timestamp
def find_word_in_transcript(transcript, word):
    timestamps = []
    for entry in transcript:
        if word.lower() in entry['text'].lower():
            timestamps.append(entry['start'])  
    return timestamps

# Function to extract vocabulary from the transcript
def extract_vocabulary(transcript):
    stop_words = set(stopwords.words('english'))  
    words = nltk.word_tokenize(transcript)
    words = [word.lower() for word in words if word.isalpha()]  
    vocabulary = set([word for word in words if word not in stop_words and len(word) > 1])
    return vocabulary

# Route to search videos and return results with vocabulary and timestamps
@generate_response_api.route('/search_video', methods=['GET'])
def search_video():
    word = request.args.get('word')
    
    if not word:
        return jsonify({'error': 'Missing word parameter'}), 400

    videos = search_youtube(word)
    results = []

    for video in videos:
        video_id = video['id']['videoId']
        transcript = get_video_transcript(video_id)
        if transcript:
            # Join transcript into a single string for tokenization
            transcript_text = " ".join([entry['text'] for entry in transcript])
            
            # Extract vocabulary
            vocabulary = extract_vocabulary(transcript_text)

            # Find timestamps for the given word
            timestamps = find_word_in_transcript(transcript, word)
            if timestamps:
                first_timestamp = timestamps[0]
                video_url = f'https://www.youtube.com/embed/{video_id}?start={int(first_timestamp)}'

                
                vocab_with_timestamps = {}
                for vocab_word in vocabulary:
                    word_timestamps = find_word_in_transcript(transcript, vocab_word)
                    if word_timestamps:
                        vocab_with_timestamps[vocab_word] = f'https://www.youtube.com/embed/{video_id}?start={int(word_timestamps[0])}'
                
                results.append({
                    'video_url': video_url,
                    'timestamp': int(first_timestamp),
                    'vocabulary': vocab_with_timestamps  
                })

    if not results:
        return jsonify({'message': 'No video found with the specified word.'}), 404

    return jsonify(results), 200


cred = Credentials.from_service_account_file('./app/sheet.json', scopes=['https://www.googleapis.com/auth/spreadsheets'])
client = gspread.authorize(cred)
spreadsheet_id = '1_YqlF-DWDpsOhv2KlFoKsE6bypYnkBvoRr9ZCIhtXxc'
sheet_name = 'fsyudy'

firebase_cred = credentials.Certificate('./app/keyfirebase.json')
firebase_admin.initialize_app(firebase_cred, {
    'storageBucket': 'podcast-4073a.appspot.com'
})

# Biến toàn cục để lưu trữ trạng thái hội thoại
user_responses_list = []
current_step = 0
system_responses_cache = []
current_topic = ""  # Thêm biến để lưu trữ chủ đề hiện tại

# Đọc dữ liệu từ Google Sheets
def read_data_from_sheets(spreadsheet_id, sheet_name):
    workbook = client.open_by_key(spreadsheet_id)
    worksheet = workbook.worksheet(sheet_name)
    values = worksheet.get_all_values()
    if not values:
        print('No data found.')
    return values

# Lấy dữ liệu hội thoại theo chủ đề
def get_conversation_data(topic):
    data = read_data_from_sheets(spreadsheet_id, sheet_name)
    filtered_data = [row for row in data if row[0] == topic]
    system_responses = [row[2] for row in filtered_data]
    return system_responses

# Chuyển văn bản thành giọng nói
def text_to_speech(text, output_file):
    tts = gTTS(text=text, lang='en')
    tts.save(output_file)
    return output_file


# Chuyển âm thanh thành văn bản
def audio_to_text(audio_file_path):
    recognizer = sr.Recognizer()
    try:
        with sr.AudioFile(audio_file_path) as source:
            audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data)
            return text
    except sr.UnknownValueError:
        return "Speech recognition could not understand the audio"
    except sr.RequestError as e:
        return f"Speech recognition service error: {str(e)}"

# Tải lên Firebase
def upload_audio_to_firebase(local_file_path, audio_name):
    bucket = storage.bucket()
    blob = bucket.blob(f'audio/{audio_name}')
    blob.upload_from_filename(local_file_path)
    blob.make_public()
    return blob.public_url

# API: Lấy danh sách chủ đề
@generate_response_api.route('/get-topics', methods=['GET'])
def get_topics():
    data = read_data_from_sheets(spreadsheet_id, sheet_name)
    topics = list(set(row[0] for row in data[1:]))
    return jsonify({"topics": topics})

# API: Bắt đầu hội thoại
@generate_response_api.route('/start-conversation', methods=['POST'])
def start_conversation():
    global current_step, system_responses_cache, user_responses_list, current_topic
    topic = request.form.get('topic', '')
    
    # Lấy dữ liệu hội thoại cho chủ đề
    system_responses_cache = get_conversation_data(topic)
    if not system_responses_cache:
        return jsonify({"error": "Invalid topic"}), 400

    current_topic = topic  # Lưu chủ đề hiện tại
    current_step = 0  # Đặt bước bắt đầu về 0
    user_responses_list = []  # Đặt lại danh sách phản hồi
    system_response = system_responses_cache[current_step]

    # Chuyển văn bản thành giọng nói
    audio_file = f"response_{topic}_{current_step}.mp3"
    text_to_speech(system_response, audio_file)
    audio_url = upload_audio_to_firebase(audio_file, audio_file)
    os.remove(audio_file)

    return jsonify({
        "text_response": system_response,
        "audio_file_url": audio_url
    })

@generate_response_api.route('/process-user-response', methods=['POST'])
def process_user_response():
    global current_step, system_responses_cache, user_responses_list, current_topic

    # Nhận file âm thanh từ yêu cầu
    audio_file = request.files.get('audio_file')
    if not audio_file or current_step >= len(system_responses_cache):
        return jsonify({"error": "Invalid input or conversation already ended"}), 400

    # Lưu file âm thanh tạm thời
    audio_file_path = f"./temp_audio_{current_step}.wav"
    audio_file.save(audio_file_path)

    # Chuyển đổi âm thanh thành văn bản
    user_response_text = audio_to_text(audio_file_path)
    os.remove(audio_file_path)  # Xóa file âm thanh tạm sau khi xử lý

    # Lưu phản hồi của người dùng vào danh sách tạm thời
    user_responses_list.append({
        "system_response": system_responses_cache[current_step],
        "user_response": user_response_text
    })

    # Kiểm tra xem có tiếp tục hay không
    current_step += 1
    if current_step < len(system_responses_cache):
        # Tiếp tục với câu hỏi tiếp theo
        system_response = system_responses_cache[current_step]
        audio_file = f"response_{current_topic}_{current_step}.mp3"
        text_to_speech(system_response, audio_file)
        audio_url = upload_audio_to_firebase(audio_file, audio_file)
        os.remove(audio_file)

        return jsonify({
            "text_response": system_response,
            "audio_file_url": audio_url,
            "user_response_text": user_response_text 
        })
    else:
        # Kết thúc hội thoại và gửi dữ liệu lên Gemini
        conversation_history = "".join(
            f"<div class='conversation'><strong>System:</strong> {item['system_response']}<br>"
            f"<strong>User:</strong> {item['user_response']}</div><br>"
            for item in user_responses_list
        )

        # Tạo prompt yêu cầu mô hình Gemini trả về nội dung HTML
        prompt = (
            f"Please evaluate the user's responses based on the IELTS Speaking criteria. "
            f"Here is the conversation in HTML format:\n\n{conversation_history}\n\n"
            f"Provide a detailed assessment in HTML format based on the following IELTS criteria:\n\n"
            f"<h2>IELTS Speaking Assessment</h2>"
            f"<h3>1. Fluency and Coherence</h3>"
            f"<p>Comment on the fluency, natural flow of speech, and the logical arrangement of ideas, and provide a score out of 9.</p>"
            f"<h3>2. Lexical Resource</h3>"
            f"<p>Evaluate the variety and appropriateness of the vocabulary used, including any paraphrasing or idiomatic expressions, and provide a score out of 9.</p>"
            f"<h3>3. Grammatical Range and Accuracy</h3>"
            f"<p>Assess the range and accuracy of grammatical structures, mentioning any mistakes or strengths, and provide a score out of 9.</p>"
            f"<h3>4. Pronunciation</h3>"
            f"<p>Discuss the clarity of the pronunciation, stress, intonation, and any areas of difficulty, and provide a score out of 9.</p>"
            f"<h3>Overall Performance</h3>"
            f"<p>Provide a summary of the overall performance, along with recommendations for improvement.</p>"
        )

        # Sử dụng mô hình Gemini để đánh giá phản hồi
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        evaluation_html = response.text.strip()

        # Tạo HTML cho lịch sử hội thoại
        conversation_history_html = (
            "<div class='conversation-history'>"
            "<h3>Conversation History</h3>"
            f"{conversation_history}"
            "</div>"
        )

        # Đặt lại trạng thái
        current_step = 0
        system_responses_cache = []
        user_responses_list.clear()

        return jsonify({
            "evaluation": evaluation_html,
            "conversation_history": conversation_history_html
        })



#Hanlde score IELST WRITING

# Comment out the OpenAI client configuration
# client = OpenAI(api_key='sk-MKz2Dk9E3vabI0oedOammOmBVoCW_FuyCOOFuRyO5xT3BlbkFJQJfnGdh3kv5QQ15KvAlYeEvhHJ3iEW6jRSF_9aP50A')

# Use Gemini configuration instead
genai.configure(api_key='AIzaSyD-cOAi8GRgGHOzBe9e1TMCymT28ZIHcJs')

def download_image(image_url, save_path):
    response = requests.get(image_url)
    if response.status_code == 200:
        with open(save_path, 'wb') as f:
            f.write(response.content)
    else:
        raise Exception(f"Failed to download image from {image_url}. Status code: {response.status_code}")

def extract_text_from_image(image_path):
    api_url = 'https://api.ocr.space/parse/image'
    
    with open(image_path, 'rb') as image_file:
        response = requests.post(
            api_url,
            files={image_file.name: image_file},
            data={'apikey': 'K84559091288957', 'language': 'eng'}
        )
        
        result = response.json()
        if result['IsErroredOnProcessing']:
            raise Exception(f"Error extracting text from image: {result['ErrorMessage']}")
        
        return result['ParsedResults'][0]['ParsedText']

def analyze_answer_with_gemini(user_answer, exam_text):
    prompt = f"""
    You are an IELTS examiner. The exam text is: '{exam_text}'.
    The user's answer is: '{user_answer}'.
    Please grade this answer based on the following IELTS criteria: 
    - Task Response 
    - Coherence and Cohesion 
    - Lexical Resource 
    - Grammatical Range and Accuracy.
    
    Provide a score for each criterion (out of 9).

   Additionally:
    - Highlight any grammatical, spelling, or meaning errors in the user's answer using yellow background color in HTML (e.g., <span style="background-color: yellow;">error</span>).
    - After each highlighted error, display the corrected version immediately after the error, using green background color in HTML (e.g., <span style="background-color: green;">correction</span>).
    - Explain each highlighted error, mentioning why it is incorrect and how it can be improved.
    - Avoid repeating the same content or corrections multiple times. Only mention recurring patterns once and indicate that they appear throughout the answer.
    - Provide a summary at the end, including overall strengths and areas for improvement.
    - Return the modified version of the user's answer with the errors highlighted in yellow and corrections in green, but avoid duplicating sentences in the response.
    - Translate the following section titles into Vietnamese in parentheses immediately after the English title, and make both the original English title and the Vietnamese translation bold:
      - "Task Response" as "Task Response (Phản hồi nhiệm vụ)"
      - "Coherence and Cohesion" as "Coherence and Cohesion (Mạch lạc và liên kết)"
      - "Lexical Resource" as "Lexical Resource (Nguồn từ vựng)"
      - "Grammatical Range and Accuracy" as "Grammatical Range and Accuracy (Phạm vi và độ chính xác ngữ pháp)"
      - "Highlighted Errors and Explanations" as "Highlighted Errors and Explanations (Các lỗi nổi bật và giải thích)"
      - "Summary" as "Summary (Tóm tắt)"
      - "Modified Answer with Highlighted Errors" as "Modified Answer with Highlighted Errors (Câu trả lời đã chỉnh sửa với lỗi được đánh dấu)"
    """
    try:
        # Use the new model from Gemini
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        raise Exception(f"Error analyzing text with Gemini: {str(e)}")

# The rest of the code remains unchanged
@generate_response_api.route('/process_exam', methods=['POST'])
def process_exam():
    if 'exam_text' not in request.form or 'user_answer' not in request.form or 'exam_image_url' not in request.form:
        return jsonify({'error': 'Missing required data'}), 400

    exam_text = request.form['exam_text']  
    user_answer = request.form['user_answer']  
    exam_image_url = request.form['exam_image_url']  

    temp_dir = Path('temp') 
    temp_dir.mkdir(exist_ok=True)  
    image_path = temp_dir / 'downloaded_exam_image.jpg'  

    try:
      
        download_image(exam_image_url, image_path)

        extracted_text_from_image = extract_text_from_image(image_path)


        combined_exam_text = exam_text + " " + extracted_text_from_image


        analysis_result = analyze_answer_with_gemini(user_answer, combined_exam_text)

   
        os.remove(image_path)

        return jsonify({'result': analysis_result}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

nlp_pipeline = pipeline("text-generation", model="gpt2")

# Tạo đối tượng dịch từ deep-translator
translator = GoogleTranslator(source='auto', target='vi')

@generate_response_api.route('/generate_response', methods=['POST'])
def generate_response():
    data = request.get_json()
    input_word = data['input']

    # Tạo prompt để sinh câu
    prompt = f"Please create a clear and natural sentence using the word '{input_word}':"

    try:
        # Sử dụng mô hình Gemini để sinh văn bản dựa trên prompt
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        generated_response = response.text.strip()

        # Dịch câu đã sinh sang tiếng Việt
        translated_response = translator.translate(generated_response)

        # Trả về kết quả dưới dạng JSON
        result = {
            'generated_response': generated_response,
            'translated_response': translated_response
        }

        return jsonify(result), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500