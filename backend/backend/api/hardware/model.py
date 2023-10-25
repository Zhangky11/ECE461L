from backend.shared.hardware_pool import HardwarePool
from flask_mongoengine import MongoEngine
from mongoengine import Document, ReferenceField,ListField
from backend import db

class HwSet(db.Document):
    hw_name = db.StringField(unique=True,required=True)   
    hw_amount = db.IntField(required=True)
    hardware_from_pool = ReferenceField(HardwarePool)
