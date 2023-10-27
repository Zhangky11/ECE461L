from .model import HwSet
from backend.api.project.model import Project
from backend.shared.hardware_pool import HardwarePool
from flask import Blueprint, jsonify
hardware_bp = Blueprint('hardware_bp', __name__)
@hardware_bp.route('/request_hw', methods=['POST','GET'])
def request_hw():
# def request_hw(request):
    print("Request Hardware!")
    # data = request.get_json()
    data = {}
    data['username'] = 'Jame'
    data['project_id'] = 1
    data['hw_name'] = "HW 1"
    data['hw_amount'] = 10

    if not Project.objects(id_inc=data['project_id']).first():
        return jsonify({"message": "Project doesn't exists"}), 400
    
    project = Project.objects(id_inc=data['project_id']).first()

    if not HardwarePool.objects(name=data['hw_name']).first():
        return jsonify({"message": "HW doesn't exists"}), 400
    
    hw_from_pool = HardwarePool.objects(name=data['hw_name']).first()
    if hw_from_pool.request_hardware(data['hw_amount']):

        if not HwSet.objects(hw_name=data['hw_name']).first():
            hardware1 = HwSet(hw_name=data['hw_name'], hw_amount=data['hw_amount'], hardware_from_pool=hw_from_pool)
            hardware1.save()
            project.joined_hwsets.append(hardware1)
            project.save()
        else:
            hardware1 = HwSet.objects(hw_name=data['hw_name']).first()
            hardware1.add_hardware(data['hw_amount'])
    else:
        return jsonify({"message": "Not enough HW!"}), 400

    return jsonify({"message": "Request Completed!"}), 400
