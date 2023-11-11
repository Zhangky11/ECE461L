from xmlrpc.client import TRANSPORT_ERROR
from flask import Flask
from backend import app
from backend.auth.model import User
from backend.api.project.model import Project
from backend.api.hardware.model import HwSet
from backend.shared.hardware_pool import HardwarePool
import os

app = Flask(__name__, static_folder='frontend/build', static_url_path='/')

@app.route('/', methods=["GET"])
def index():
    return app.send_static_file('index.html')

if __name__ == "__main__":
    HardwarePool.objects().delete()
    hwpool1 = HardwarePool(name="HW 1", total_capacity=100, total_availability=100)
    hwpool2 = HardwarePool(name="HW 2", total_capacity=100, total_availability=100)
    hwpool1.save()
    hwpool2.save()
    User.objects().delete()
    Project.objects().delete()
    HwSet.objects().delete()
    app.run(debug=True)
    #app.run(debug=True, host='0.0.0.0', port=os.environ.get('PORT', 80))
