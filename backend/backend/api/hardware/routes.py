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
    data = request.get_json()
    data = {}
    current_user = get_jwt_identity()
    print("current_user:", current_user)
    data['username'] = User.objects(username=current_user).first()
    # data['username'] = 'k'
    data['project_id'] = data.get('project_id')
    data['hw_name'] = data.get('hw_name')
    data['hw_amount'] = data.get('amount')

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

    return jsonify({"message": "Request Completed!"}), 200

@hardware_bp.route('/return_hw', methods=['POST','GET'])
@jwt_required()
def return_hw():
    print("Return Hardware!")
    data = request.get_json()
    data = {}
    current_user = get_jwt_identity()
    print("current_user:", current_user)
    data['username'] = User.objects(username=current_user).first()
    # data['username'] = 'k'
    data['project_id'] = data.get('project_id')
    data['hw_name'] = data.get('hw_name')
    data['hw_amount'] = data.get('amount')
    if not Project.objects(id_inc=data['project_id']).first():
        return jsonify({"message": "Project doesn't exists"}), 400
    
    project = Project.objects(id_inc=data['project_id']).first()

    if not HardwarePool.objects(name=data['hw_name']).first():
        return jsonify({"message": "HW doesn't exists"}), 400
    
    hw_from_pool = HardwarePool.objects(name=data['hw_name']).first()
    
    if HwSet.objects(hw_name=data['hw_name']).first():
        hardware1 = HwSet.objects(hw_name=data['hw_name']).first()
        if not hardware1.return_hardware(data['hw_amount']):
            return jsonify({"message": "Incorrect return hardware amount!"}), 400
        if not hw_from_pool.return_hardware(data['hw_amount']):
            return jsonify({"message": "Incorrect return hardware amount!"}), 400
        if hardware1.get_totalamount() == 0:
           project.update(pull__joined_hwsets=hardware1)
           hardware1.delete()
           return jsonify({"message": "All the hardware from this HWset has been returned!"}), 200
    
    else:           
         return jsonify({"message": "This hardware hasn't been requested yet!"}), 400

    return jsonify({"message": "Return Completed!"}), 200

        