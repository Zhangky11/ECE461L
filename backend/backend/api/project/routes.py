from backend.shared.hardware_pool import HardwarePool
from backend.api.project.model import Project
from backend.auth.model import User
from backend.api.hardware.model import HwSet
from flask_mongoengine import MongoEngine
from flask import Blueprint, jsonify
from backend import db
from mongoengine.queryset import Q
from bson import ObjectId

project_bp = Blueprint('project_bp', __name__)

@project_bp.route('/display_proj', methods=['POST', 'GET'])

def display_proj():
# def display_proj(request):
    print("Display Project Request!")
    # data = request.get_json()
    data = {}
    data['username'] = 'Jame'
    data['project_id'] = 1
    if not Project.objects(id_inc=data['project_id']).first():
        return jsonify({"message": "Project doesn't exists"}), 400
    project = Project.objects(id_inc=data['project_id']).first()

    return_dict = {"project_id": project.id_inc, 
                   'project_discription': project.description,
                   "project_member_list": project.member_list, 
                   "Hardware_list": project.associated_hardwares()}
    return jsonify(return_dict), 200

@project_bp.route('/create_proj', methods=['POST', 'GET'])
def create_proj():
# def create_proj(request):
    print("Create Project Request!")
    # data = request.get_json()
    data = {}
    data['username'] = 'Jame'
    

    if not User.objects(username=data['username']).first():
        return jsonify({"message": "User doesn't exists"}), 400

    user = User.objects(username=data['username']).first()

    data['project_name'] = "Jame's Project 3"
    data['project_description'] = "This is Jame's Project 3"
    data['HwSet'] = []

    project1 = Project(name=data['project_name'], description=data['project_description'], joined_hwsets = data['HwSet'])
    project1.member_list.append(user.username)
    project1.id_inc = Project.get_next_sequence()
    project1.save()

    data['project_name'] = "Jame's Project 4"
    data['project_description'] = "This is Jame's Project 4"
    data['HwSet'] = []

    project2 = Project(name=data['project_name'], description=data['project_description'], joined_hwsets = data['HwSet'])
    project2.member_list.append(user.username)
    project2.id_inc = Project.get_next_sequence()
    project2.save()

    
    user.joined_projects.append(project1)
    user.joined_projects.append(project2)
    user.save()


    print(f"Username: {user.username}")
    print(f"Password Hash: {user.password_hash}")
    print("Joined Projects:")
    for project in user.joined_projects:
        print(f"  Project Name: {project.name}")
        print(f"  Description: {project.description}")
        print(f"  ID: {project.id}")

    return jsonify({"message": "Create project successfully"}), 200

@project_bp.route('/join_proj', methods=['POST', 'GET'])
def join_proj():
# def join_proj(request):
    print("Join Project Request!")
    # data = request.get_json()
    data = {}
    data['username'] = 'Tim'
    data['project_id'] = 3

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
def delete_proj():
    #memberlist
    #hardwareset
    data = {}
    data['project_id'] = 3
    data['username'] = 'Jame'
    
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
    