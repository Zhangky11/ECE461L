from backend.auth.model import User
from flask_mongoengine import MongoEngine
from backend import db

class Project(db.Document):
    #...
    user = db.ReferenceField(User)
    description = db.StringField(required=True)
    members = db.ListField(db.ReferenceField('User'))