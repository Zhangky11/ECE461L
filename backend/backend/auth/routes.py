from flask import Blueprint, request, jsonify, session
auth = Blueprint('auth', __name__)

from .model import User
from backend.api.project.model import Project, Sequence
from backend.api.hardware.model import HwSet
from backend.shared.hardware_pool import HardwarePool

@auth.route('/register', methods=['POST', 'GET'])
def register():
# def register(request):
    HardwarePool.objects().delete()
    hwpool1 = HardwarePool(name="HW 1", total_capacity=100, total_availability=100)
    hwpool2 = HardwarePool(name="HW 2", total_capacity=200, total_availability=200)
    hwpool1.save()
    hwpool2.save()

    # data = request.get_json()
    # if not data or 'username' not in data or 'password' not in data or 'email' not in data:
    #     return jsonify({"message": "Invalid input"}), 400
    data = {}
    data['username'] = 'Jame'
    data['password'] = 'pass'
    data['confirm_password'] = 'pass'
    data['joined_projects'] = []

    # For test use, remember to delete these two lines when deploying
    User.objects().delete()
    Sequence.objects().delete()
    Project.objects().delete()
    HwSet.objects().delete()

    if data['password'] != data['confirm_password']:
        return jsonify({"message": "Password doesn't match"}), 400

    if User.objects(username=data['username']).first():
        return jsonify({"message": "Username already exists"}), 400
    
    user = User(username=data['username'], joined_projects=data['joined_projects'])
    # project1 = Project(name="project1",description='de').save()
    # project2 = Project(name="project2",description='de').save()
    # project3 = Project(name="project3",description='de').save()
    # user = User(username=data['username'])
    # user.joined_projects.append(project1)
    # user.joined_projects.append(project2)
    # user.joined_projects.append(project3)
    user.set_password(data['password'])
    user.save()
    

    data = {}
    data['username'] = 'Tim'
    data['password'] = 'pass'
    data['confirm_password'] = 'pass'
    data['joined_projects'] = []

    if data['password'] != data['confirm_password']:
        return jsonify({"message": "Password doesn't match"}), 400

    if User.objects(username=data['username']).first():
        return jsonify({"message": "Username already exists"}), 400
    
    user = User(username=data['username'], joined_projects=data['joined_projects'])
    user.set_password(data['password'])
    user.save()
    return jsonify({"message": "User registered successfully"}), 201

@auth.route('/login', methods=['POST', 'GET'])
def login():
# def login(request):
    print("Login Request!")
    # data = request.get_json()
    # username = data.get('username')
    # password = data.get('password')
    # if not data or 'username' not in data or 'password' not in data:
    #     return jsonify({"message": "Invalid input"}), 400

    data = {}
    data['username'] = 'Jame'
    data['password'] = 'pass'

    user = User.objects(username=data['username']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({"message": "Invalid username or password"}), 401

    #session['user_id'] = str(user.id)
    return jsonify({"username": data['username'],'projects':user.associated_projects()}), 200

@auth.route('/logout')
def logout():
    pass
