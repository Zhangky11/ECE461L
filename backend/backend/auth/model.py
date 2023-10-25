from flask_mongoengine import MongoEngine
from werkzeug.security import generate_password_hash, check_password_hash
from backend import db
from backend.api.project.model import Project
from backend.shared.hardware_pool import HardwarePool
from mongoengine import Document, ReferenceField

#class Pet(db.Document):
    #name = db.StringField(unique=True, required=True)
    
class User(db.Document):
    
    username = db.StringField(unique=True, required=True)
    #email = db.EmailField()
    password_hash = db.StringField(required=True)
    joined_projects = ReferenceField(Project)
    

    #pets = db.ReferenceField('Pet')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    