#from backend.auth.model import User
from backend.api.hardware.model import HwSet
from flask_mongoengine import MongoEngine
from mongoengine import Document, ReferenceField,ListField
from backend import db


# class Sequence(db.Document):
#     name = db.StringField()
#     value = db.IntField()


class Project(db.Document):
    id_inc = db.StringField(unique=True,required=True)   
    # id_inc = db.IntField()
    name = db.StringField(required=True)   
    description = db.StringField(required=True)
    member_list = db.ListField()
    joined_hwsets = ListField(ReferenceField(HwSet), default=list)

    def associated_hardwares(self):
        hardwares = self.joined_hwsets
        hardwares_list = []
        for hardware in hardwares:
            hardware_info = {
                'hw_name':hardware.hw_name,
                'hw_amount': hardware.hw_amount,
                'total_availability': hardware.hardware_from_pool.total_availability,
            }
            hardwares_list.append(hardware_info)
        return hardwares_list
    
    # @classmethod
    # def get_next_sequence(cls):
    #     sequence = Sequence.objects(name="project_id").modify(upsert=True, new=True, inc__value=1)
    #     return sequence.value

    