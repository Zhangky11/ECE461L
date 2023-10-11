from flask import Flask
from config import Config
from flask_mongoengine import MongoEngine
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)
db = MongoEngine(app)

from backend.auth.routes import auth
from backend.api.project.routes import project_bp
# from backend.api.hardware.routes import hardware_bp

app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(project_bp, url_prefix='/api/project')
# app.register_blueprint(hardware_bp, url_prefix='/api/hardware')


