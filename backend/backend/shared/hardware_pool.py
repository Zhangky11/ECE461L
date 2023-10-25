from flask_mongoengine import MongoEngine
from backend import db


class HardwarePool(db.Document):
    name = db.StringField(unique=True)
    total_capacity = db.IntField()
    available_capacity = db.IntField(default=0)

    def request_hardware(self, amount):
        if self.available_capacity >= amount:
            self.available_capacity -= amount
            self.save()
            return True
        else:
            return False 

    def return_hardware(self, amount):
        self.available_capacity += amount
        if self.available_capacity > self.total_capacity:
            self.available_capacity = self.total_capacity
        self.save()
