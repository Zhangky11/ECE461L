#from backend.auth.model import User
from flask_mongoengine import MongoEngine
from backend import db

class Project(db.Document):
    name = db.StringField(unique=True,required=True)   
    description = db.StringField(required=True)
    #def __init__(self):
        #self.description = db.StringField(required=True)

    