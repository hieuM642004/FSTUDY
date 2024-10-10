import time
import difflib
from flask import Blueprint, jsonify, request, send_file
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from openai import OpenAI
import pytesseract
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


cred = credentials.Certificate('./app/keyfirebase.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'podcast-4073a.appspot.com'
})

spreadsheet_id = '1_YqlF-DWDpsOhv2KlFoKsE6bypYnkBvoRr9ZCIhtXxc'
sheet_name = 'fsyudy'

def read_data_from_sheets(spreadsheet_id, sheet_name):
  
    creds = Credentials.from_service_account_file('./app/sheet.json', scopes=['https://www.googleapis.com/auth/spreadsheets'])
    
    
    client = gspread.authorize(creds)
    
    
    workbook = client.open_by_key(spreadsheet_id)
    
   
    worksheet = workbook.worksheet(sheet_name)
    
   
    values = worksheet.get_all_values()
    
    if not values:
        print('No data found.')
    return values


def get_conversation_data(topic):
    
    data = read_data_from_sheets(spreadsheet_id, sheet_name)

   
    filtered_data = [row for row in data if row[0] == topic]

   
    system_responses = [row[2] for row in filtered_data]
    user_expected_responses = [row[3] for row in filtered_data]
    
    return system_responses, user_expected_responses


def upload_audio_to_firebase(local_file_path, audio_name):
    bucket = storage.bucket()
    blob = bucket.blob(f'audio/{audio_name}')
    blob.upload_from_filename(local_file_path)
    blob.make_public()
    return blob.public_url


def text_to_speech(text, output_file):
    tts = gTTS(text=text, lang='en')
    tts.save(output_file)
    return output_file

def speech_to_text(audio_file_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_file_path) as source:
        audio = recognizer.record(source)
    try:
        text = recognizer.recognize_google(audio, language="en-US")
        return text
    except sr.UnknownValueError:
        return "Sorry, I couldn't understand what you said."
    except sr.RequestError:
        return "Could not request results from the speech recognition service."

def calculate_similarity(user_input, expected_response):
    ratio = difflib.SequenceMatcher(None, user_input.strip().lower(), expected_response.strip().lower()).ratio()
    return round(ratio * 100, 2)

@generate_response_api.route('/get-topics', methods=['GET'])
def get_topics():
   
    data = read_data_from_sheets(spreadsheet_id, sheet_name)

   
    topics = list(set(row[0] for row in data[1:]))  

    return jsonify({"topics": topics})

@generate_response_api.route('/start-conversation', methods=['POST'])
def start_conversation():
    topic = request.form.get('topic', '')

 
    system_responses, user_expected_responses = get_conversation_data(topic)

    if not system_responses:
        return jsonify({"error": "Invalid topic"}), 400

  
    system_response = system_responses[0]
    expected_user_response = user_expected_responses[0]


    audio_file = f"response_{topic}_0.mp3"
    text_to_speech(system_response, audio_file)

  
    audio_url = upload_audio_to_firebase(audio_file, audio_file)

    os.remove(audio_file)

   
    return jsonify({
        "text_response": system_response,
        "audio_file_url": audio_url,
        "expected_user_response": expected_user_response
    })


@generate_response_api.route('/conversation', methods=['POST'])
def conversation():
    step = int(request.form.get('step', 1))
    topic = request.form.get('topic', '')

   
    system_responses, user_expected_responses = get_conversation_data(topic)

    if not system_responses:
        return jsonify({"error": "Invalid topic"}), 400

 
    if step < len(system_responses):
        system_response = system_responses[step]
        expected_user_response = user_expected_responses[step]
    else:
        return jsonify({"error": "End of conversation"}), 400

    
    if 'file' not in request.files:
        return jsonify({"error": "No audio file found"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    file_path = os.path.join("temp_user_audio.wav")
    file.save(file_path)

    
    user_input = speech_to_text(file_path)
    os.remove(file_path)

   
    similarity_percentage = calculate_similarity(user_input, expected_user_response)

    
    audio_file = f"response_{topic}_{step}.mp3"
    text_to_speech(system_response, audio_file)
    audio_url = upload_audio_to_firebase(audio_file, audio_file)
    os.remove(audio_file)

    return jsonify({
        "text_response": system_response,
        "user_input_text": user_input,
        "similarity_percentage": similarity_percentage,
        "audio_file_url": audio_url,
        "next_step": step + 1,
        "expected_user_response": expected_user_response
    })




#Hanlde score IELST WRITING

client = OpenAI(api_key='sk-MKz2Dk9E3vabI0oedOammOmBVoCW_FuyCOOFuRyO5xT3BlbkFJQJfnGdh3kv5QQ15KvAlYeEvhHJ3iEW6jRSF_9aP50A')

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

def analyze_answer_with_gpt(user_answer, exam_text):
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
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                },
            ]
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        raise Exception(f"Error analyzing text with GPT: {str(e)}")



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


        analysis_result = analyze_answer_with_gpt(user_answer, combined_exam_text)

   
        os.remove(image_path)

        return jsonify({'result': analysis_result}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500