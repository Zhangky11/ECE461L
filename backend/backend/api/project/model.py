#from backend.auth.model import User
from flask_mongoengine import MongoEngine
from backend import db


class Sequence(db.Document):
    name = db.StringField()
    value = db.IntField()


class Project(db.Document):
    id_inc = db.IntField()
    name = db.StringField(unique=True,required=True)   
    description = db.StringField(required=True)
    member_list = db.ListField()

    @classmethod
    def get_next_sequence(cls):
        sequence = Sequence.objects(name="project_id").modify(upsert=True, new=True, inc__value=1)
        return sequence.value

    