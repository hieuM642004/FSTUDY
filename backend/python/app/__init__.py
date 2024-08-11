# app/__init__.py
from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    with app.app_context():
        from .routes import generate_response_api
        app.register_blueprint(generate_response_api)

    return app
