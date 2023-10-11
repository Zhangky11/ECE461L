from backend.shared.hardware_pool import HardwarePool
from flask_mongoengine import MongoEngine
from flask import Blueprint
from backend import db

project_bp = Blueprint('project_bp', __name__)
