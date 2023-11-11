from flask_mongoengine import MongoEngine
from backend import db


class HardwarePool(db.Document):
    name = db.StringField(unique=True)
    total_capacity = db.IntField()
    total_availability = db.IntField(default=0)

    def request_hardware(self, amount):
        if self.total_availability >= amount:
            self.total_availability -= amount
            self.save()
            return True
        else:
            return False 

    def return_hardware(self, amount):
        amount = int(amount)
        if self.total_availability+amount <= self.total_capacity:
            self.total_availability += amount
            self.save()
            return True
        else:
            return False
