from flask_cors import CORS
from app import create_app  

app = create_app()
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
if __name__ == '__main__':
    app.run(debug=True)
