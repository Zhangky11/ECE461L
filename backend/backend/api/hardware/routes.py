from .model import HwSet
from backend.auth.model import User
from backend.api.project.model import Project
from backend.shared.hardware_pool import HardwarePool
from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
hardware_bp = Blueprint('hardware_bp', __name__)

@hardware_bp.route('/request_hw', methods=['POST','GET'])
@jwt_required()
def request_hw():
    print("Request Hardware!")
    raw_data = request.get_json()
    data = {}
    current_user = get_jwt_identity()
    print("current_user:", current_user)
    data['username'] = current_user
    # data['username'] = 'k'
    data['project_id'] = raw_data.get('project_id')
    data['hw_name'] = raw_data.get('hw_name')
    data['hw_amount'] = raw_data.get('amount')

    if not Project.objects(id_inc=data['project_id']).first():
        return jsonify({"message": "Project doesn't exists"}), 400
    
    project = Project.objects(id_inc=data['project_id']).first()

    if not HardwarePool.objects(name=data['hw_name']).first():
        return jsonify({"message": "HW doesn't exists"}), 400
    
    print(data['hw_name'])
    hw_from_pool = HardwarePool.objects(name=data['hw_name']).first()
    if hw_from_pool.request_hardware(data['hw_amount']):
        if data['hw_name'] == "HW 1":
            hardware = project.joined_hwsets[0]
        elif data['hw_name'] == "HW 2":
            hardware = project.joined_hwsets[1]
        else:
            return jsonify({"message": "HW doesn't exists"}), 400
        hardware.add_hardware(data['hw_amount'])
        hardware.save()
    else:
        return jsonify({"message": "Not enough HW!"}), 400
    return_dict = {
        "hw_possessed": hardware.hw_amount,
        "hw_available": hardware.hardware_from_pool.total_availability,
    }
    return jsonify({"message": "Request Completed!", "return_hw": return_dict}), 200

@hardware_bp.route('/return_hw', methods=['POST','GET'])
@jwt_required()
def return_hw():
    print("Return Hardware!")
    raw_data = request.get_json()
    data = {}
    current_user = get_jwt_identity()
    print("current_user:", current_user)
    data['username'] = User.objects(username=current_user).first()
    # data['username'] = 'k'
    data['project_id'] = raw_data.get('project_id')
    data['hw_name'] = raw_data.get('hw_name')
    data['hw_amount'] = raw_data.get('amount')
    if not Project.objects(id_inc=data['project_id']).first():
        return jsonify({"message": "Project doesn't exists"}), 400
    
    project = Project.objects(id_inc=data['project_id']).first()

    if not HardwarePool.objects(name=data['hw_name']).first():
        return jsonify({"message": "HW doesn't exists"}), 400
    
    hw_from_pool = HardwarePool.objects(name=data['hw_name']).first()
    
    if hw_from_pool.return_hardware(data['hw_amount']):
        if data['hw_name'] == "HW 1":
            hardware = project.joined_hwsets[0]
        elif data['hw_name'] == "HW 2":
            hardware = project.joined_hwsets[1]
        else:
            return jsonify({"message": "HW doesn't exists"}), 400
        hardware.return_hardware(data['hw_amount'])
        hardware.save()
    else:
        return jsonify({"message": "Not enough HW!"}), 400

    # if not hardware1.return_hardware(data['hw_amount']):
    #     return jsonify({"message": "Incorrect return hardware amount!"}), 400
    # if not hw_from_pool.return_hardware(data['hw_amount']):
    #     return jsonify({"message": "Incorrect return hardware amount!"}), 400
    # if hardware1.get_totalamount() == 0:
    #    project.update(pull__joined_hwsets=hardware1)
    #    hardware1.delete()
    #    return jsonify({"message": "All the hardware from this HWset has been returned!"}), 200
    return_dict = {
        "hw_possessed": hardware.hw_amount,
        "hw_available": hardware.hardware_from_pool.total_availability,
    }
    return jsonify({"message": "Return Completed!", "return_hw": return_dict}), 200

        