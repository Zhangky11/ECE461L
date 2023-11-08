from flask_mongoengine import MongoEngine
from werkzeug.security import generate_password_hash, check_password_hash
from backend import db
from backend.api.project.model import Project
from backend.shared.hardware_pool import HardwarePool
from mongoengine import Document, ReferenceField,ListField
from flask import jsonify

#class Pet(db.Document):
    #name = db.StringField(unique=True, required=True)
    
class User(db.Document):
    
    username = db.StringField(unique=True, required=True)
    #email = db.EmailField()
    password_hash = db.StringField(required=True)
    joined_projects = ListField(ReferenceField(Project), default=list)

    #pets = db.ReferenceField('Pet')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def associated_projects(self):
        projects = self.joined_projects
        project_list = []
        for project in projects:
            project_info = {
                'name' :project.name,
                'description': project.description,
                'id' :project.id_inc,
                'member_list' : project.member_list,
            }
            project_list.append(project_info)
        
        return project_list
    
    
    