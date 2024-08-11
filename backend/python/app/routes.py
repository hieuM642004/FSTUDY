import time
from flask import Blueprint, jsonify, request
from googleapiclient.discovery import build
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import JSONFormatter
from pydub import AudioSegment
import os
import numpy as np
import librosa
from flask_cors import CORS
import re
import assemblyai as aai
import requests

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

search_api = Blueprint('search_api', __name__)

def search_youtube(query):
    request = youtube.search().list(
        q=query,
        part='id,snippet',
        type='video',
        order='relevance',
        
    )
    response = request.execute()
    return response.get('items', [])

def get_video_transcript(video_id):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        return transcript
    except Exception as e:
        return None

def find_word_in_transcript(transcript, word):
    timestamps = []
    for entry in transcript:
        if word.lower() in entry['text'].lower():
            timestamps.append(entry['start'])  
    return timestamps

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
            timestamps = find_word_in_transcript(transcript, word)
            if timestamps:
                first_timestamp = timestamps[0]
                video_url = f'https://www.youtube.com/watch?v={video_id}&t={int(first_timestamp)}s'
                results.append({
                    'video_url': video_url,
                    'timestamp': int(first_timestamp)
                })

    if not results:
        return jsonify({'message': 'No video found with the specified word.'}), 404

    return jsonify(results), 200