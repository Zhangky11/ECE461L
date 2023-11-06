from backend.shared.hardware_pool import HardwarePool
from backend.api.project.model import Project
from backend.auth.model import User
from backend.api.hardware.model import HwSet
from flask_mongoengine import MongoEngine
from flask import Blueprint, jsonify, request
from backend import db
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from mongoengine.queryset import Q
from bson import ObjectId

project_bp = Blueprint('project_bp', __name__)

@project_bp.route('/display_proj', methods=['POST', 'GET'])
@jwt_required()
def display_proj():
    print("Display Project Request!")
    data = request.get_json()
    data = {}
    current_user = get_jwt_identity()
    print("current_user:", current_user)
    # data['username'] = 'k'
    data['project_id'] = data.get('project_id')

    if not Project.objects(id_inc=data['project_id']).first():
        return jsonify({"message": "Project doesn't exists"}), 400
    project = Project.objects(id_inc=data['project_id']).first()

    return_dict = {"project_id": project.id_inc, 
                   'project_discription': project.description,
                   "project_member_list": project.member_list, 
                   "Hardware_list": project.associated_hardwares()}
    return jsonify(return_dict), 200

@project_bp.route('/create_proj', methods=['POST', 'GET'])
@jwt_required()
def create_proj():
    print("Create Project Request!")
    data = request.get_json()
    data = {}
    current_user = get_jwt_identity()
    data['username'] = User.objects(username=current_user).first()
    # data['username'] = 'k'
    data['project_id'] = data.get('project_id')
    data['project_name'] = data.get('project_name')
    data['project_description'] = data.get('project_description')
    data['HwSet'] = []

    if not User.objects(username=data['username']).first():
        return jsonify({"message": "User doesn't exists"}), 400

    user = User.objects(username=data['username']).first()

    data['project_id'] = "xxx1"
    data['project_name'] = "k's Project 1"
    data['project_description'] = "This is k's Project 1"
    data['HwSet'] = []

    project = Project(name=data['project_name'], description=data['project_description'], joined_hwsets = data['HwSet'], id_inc=data['project_id'])
    project.member_list.append(user.username)
    # project1.id_inc = Project.get_next_sequence()
    project.save()
    
    user.joined_projects.append(project)
    user.save()
    return jsonify({"message": "Create project successfully"}), 200


@project_bp.route('/join_proj', methods=['POST', 'GET'])
@jwt_required()
def join_proj():
    print("Join Project Request!")
    data = request.get_json()
    data = {}
    current_user = get_jwt_identity()
    data['username'] = User.objects(username=current_user).first()
    # data['username'] = 'k'
    data['project_id'] = data.get('project_id')
    # data['project_id'] = 'xxx1'

    if not User.objects(username=data['username']).first():
        return jsonify({"message": "User doesn't exists"}), 400
    
    user = User.objects(username=data['username']).first()


    if not Project.objects(id_inc=data['project_id']).first():
        return jsonify({"message": "Project doesn't exists"}), 400
    
    project = Project.objects(id_inc=data['project_id']).first()

    user.joined_projects.append(project)
    user.save()
    project.member_list.append(user.username)
    project.save()
    return jsonify({"message": "Join project successfully"}), 200

@project_bp.route('/delete_proj', methods=['POST', 'GET'])
@jwt_required()
def delete_proj():
    #memberlist
    #hardwareset
    data = {}
    current_user = get_jwt_identity()
    data['username'] = User.objects(username=current_user).first()
    # data['username'] = 'k'
    data['project_id'] = data.get('project_id')
    # data['project_id'] = 'xxx1'
    
    project = Project.objects(id_inc=data['project_id']).first()
    #objid = project.id
    
    if not project:
        return jsonify({"message": "Project doesn't exists"}), 400
    
    
    # Query the User collection to find documents with the specified value in their memberList
    if not data['username'] in project.member_list:
        return jsonify({"message": "User isn't in the project"}), 400
    

    for user in project.member_list:
        if User.objects(username=user).first():
            User.objects(username = user).first().update(pull__joined_projects=project)
    
    
    for hw in project.joined_hwsets:
        hw_ref = hw.id
        hw_id = ObjectId(hw_ref)
        print(hw_id)
        if HwSet.objects(id = hw_id).first():
            currentHardware = HwSet.objects(id=hw_id).first()
            Hardware_name = currentHardware.get_name()
            print(Hardware_name)
            Hardware_amount = currentHardware.get_totalamount()
            print(Hardware_amount)
            HardwarePool.objects(name=Hardware_name).first().return_hardware(Hardware_amount)
            currentHardware.delete()
    project.delete()
    return jsonify({"message": "Delete project successfully"}), 200
    
@project_bp.route('/leave_proj', methods=['POST', 'GET'])
@jwt_required()
def leave_proj():
    data = {}
    current_user = get_jwt_identity()
    data['username'] = User.objects(username=current_user).first()
    # data['username'] = 'k'
    data['project_id'] = data.get('project_id')
    # data['project_id'] = 'xxx1'


    if not User.objects(username=data['username']).first():
        return jsonify({"message": "User doesn't exists"}), 400
    
    user = User.objects(username=data['username']).first()

    if not Project.objects(id_inc=data['project_id']).first():
        return jsonify({"message": "Project doesn't exists"}), 400
    
    project = Project.objects(id_inc=data['project_id']).first()
    user.update(pull__joined_projects=project)
    project.update(pull__member_list=data['username'])
    return jsonify({"message": "Leave project successfully"}), 200

