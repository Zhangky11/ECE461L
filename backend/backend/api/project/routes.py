from backend.shared.hardware_pool import HardwarePool
from backend.api.project.model import Project
from backend.auth.model import User
from flask_mongoengine import MongoEngine
from flask import Blueprint, jsonify
from backend import db

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

    data['project_name'] = "Jame's Project 1"
    data['project_description'] = "This is Jame's Project 1"
    data['HwSet'] = []

    project1 = Project(name=data['project_name'], description=data['project_description'], joined_hwsets = data['HwSet'])
    project1.member_list.append(user.username)
    project1.id_inc = Project.get_next_sequence()
    project1.save()

    data['project_name'] = "Jame's Project 2"
    data['project_description'] = "This is Jame's Project 2"
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
    data['project_id'] = 1

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