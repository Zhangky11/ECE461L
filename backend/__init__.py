from flask import Flask
from config import Config
from flask_mongoengine import MongoEngine
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)
db = MongoEngine(app)
jwt = JWTManager(app)

from backend.auth.routes import auth
from backend.api.project.routes import project_bp
from backend.api.hardware.routes import hardware_bp

app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(project_bp, url_prefix='/api/project')
app.register_blueprint(hardware_bp, url_prefix='/api/hardware')



