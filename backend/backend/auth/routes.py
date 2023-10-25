from flask import Blueprint, request, jsonify, session
auth = Blueprint('auth', __name__)

from .model import User
from backend.api.project.model import Project, Sequence

@auth.route('/register', methods=['POST', 'GET'])
def register():
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

    if data['password'] != data['confirm_password']:
        return jsonify({"message": "Password doesn't match"}), 400

    if User.objects(username=data['username']).first():
        return jsonify({"message": "Username already exists"}), 400
    
    user = User(username=data['username'], joined_projects=data['joined_projects'])
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
    print("Login Request!")
    # data = request.get_json()
    # username = data.get('username')
    # password = data.get('password')
    
    # print(username)
    # print(password)
    # # Connect to DB
    # data = request.get_json()
    # if not data or 'username' not in data or 'password' not in data:
    #     return jsonify({"message": "Invalid input"}), 400

    data = {}
    data['username'] = 'Jame'
    data['password'] = 'pass'

    user = User.objects(username=data['username']).first()

    if not user or not user.check_password(data['password']):
        return jsonify({"message": "Invalid username or password"}), 401

    # session['user_id'] = str(user.id)  # use session to save userid
    print(user.username)
    print(user.password_hash)
    return jsonify({"message": "Logged in successfully"}), 200

@auth.route('/logout')
def logout():
    pass
