from flask import Blueprint, jsonify, request
from pydub import AudioSegment
import requests
import os
import numpy as np
import soundfile as sf
from flask_cors import CORS
import time
import re
import librosa

generate_response_api = Blueprint('generate_response_api', __name__)
CORS(generate_response_api)

ASSEMBLYAI_API_KEY = '1d122f8f2f644b43a9b690494f619db0'

def upload_audio(file_path):
    headers = {
        'authorization': ASSEMBLYAI_API_KEY,
        'content-type': 'application/json'
    }
    upload_url = 'https://api.assemblyai.com/v2/upload'

    try:
        with open(file_path, 'rb') as f:
            response = requests.post(upload_url, headers=headers, files={'file': f})
        response.raise_for_status()
        return response.json()['upload_url']
    except requests.RequestException as e:
        raise Exception(f"Error uploading file: {e}")

def transcribe_audio(upload_url):
    headers = {
        'authorization': ASSEMBLYAI_API_KEY,
        'content-type': 'application/json'
    }
    json_data = {
        'audio_url': upload_url
    }
    try:
        response = requests.post('https://api.assemblyai.com/v2/transcript', json=json_data, headers=headers)
        response.raise_for_status()
        transcript_id = response.json()['id']
        return transcript_id
    except requests.RequestException as e:
        raise Exception(f"Error starting transcription: {e}")

def get_transcription_result(transcript_id):
    headers = {
        'authorization': ASSEMBLYAI_API_KEY
    }
    try:
        response = requests.get(f'https://api.assemblyai.com/v2/transcript/{transcript_id}', headers=headers)
        response.raise_for_status()
        result = response.json()
        if result['status'] == 'completed':
            return result['text']
        elif result['status'] == 'failed':
            raise Exception(f"Transcription failed: {result['error']}")
        else:
            return None
    except requests.RequestException as e:
        raise Exception(f"Error fetching transcription result: {e}")

def convert_audio_to_text(file_path):
    try:
        upload_url = upload_audio(file_path)
        transcript_id = transcribe_audio(upload_url)
        
        # Polling until the transcription is completed
        while True:
            text = get_transcription_result(transcript_id)
            if text is not None:
                return text
            time.sleep(5)  # Wait before polling again
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
        reference_text = convert_audio_to_text(wav_path)
        text_similarity = compare_text(user_text, reference_text)
        result = {'text_similarity': text_similarity}
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify(result), 200
