from flask_mongoengine import MongoEngine
from backend import db


class HardwarePool(db.Document):
    name = db.StringField(unique=True)
    total_capacity = db.IntField()  # 总容量
    available_capacity = db.IntField(default=0)  # 可用容量，初始化为0或其他值

    # 请求一定数量的硬件资源
    def request_hardware(self, amount):
        if self.available_capacity >= amount:
            self.available_capacity -= amount
            self.save()
            return True
        else:
            return False  # 不足够的可用容量

    # 退还一定数量的硬件资源
    def return_hardware(self, amount):
        self.available_capacity += amount
        if self.available_capacity > self.total_capacity:
            self.available_capacity = self.total_capacity  # 确保不超过总容量
        self.save()

    # 如果你还有其他与硬件池相关的功能或逻辑，你可以继续在这里添加
