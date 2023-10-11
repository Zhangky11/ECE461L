from flask_mongoengine import MongoEngine
from werkzeug.security import generate_password_hash, check_password_hash
from backend import db
from backend.api.project.model import Project

class User(db.Document):
    from backend.api.project.model import Project
    username = db.StringField(unique=True, required=True)
    email = db.EmailField(unique=True, required=True)
    password_hash = db.StringField(required=True)
    joined_projects = db.ListField(db.ReferenceField('Project'))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)