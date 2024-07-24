# from transformers import pipeline
# from flask import Flask, jsonify, request
# from googletrans import Translator


# app = Flask(__name__)


# nlp_pipeline = pipeline("text-generation")


# translator = Translator()

# @generate_response_api.route('/generate_response', methods=['POST'])
# def generate_response():
#     data = request.get_json()
#     input_text = data['input']

#     response = nlp_pipeline(input_text, max_length=50, num_return_sequences=1)
#     generated_response = response[0]['generated_text'].strip()

#     translated_response = translator.translate(generated_response, src='en', dest='vi').text

#     result = {
#         'generated_response': generated_response,
#         'translated_response': translated_response
#     }

#     return jsonify(result), 200


# if __name__ == '__main__':
#     app.run(debug=True)
