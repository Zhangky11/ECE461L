from flask import Blueprint, request, jsonify, session
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from backend import jwt
auth = Blueprint('auth', __name__)


from .model import User
from backend.api.project.model import Project
from backend.api.hardware.model import HwSet
from backend.shared.hardware_pool import HardwarePool

@auth.route('/register', methods=['POST', 'GET'])
def register():
    data = request.get_json()

    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"message": "Invalid input"}), 400
    
    print(data)
    username = data.get('username')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')

    data = {}
    data['username'] = username
    data['password'] = password
    data['confirm_password'] = confirm_password
    data['joined_projects'] = []
    if data['password'] != data['confirm_password']:
        return jsonify({"message": "Password doesn't match"}), 400

    if User.objects(username=data['username']).first():
        return jsonify({"message": "Username already exists"}), 400
    user = User(username=data['username'], joined_projects=data['joined_projects'])
    user.set_password(data['password'])
    user.save()
    return jsonify({"message": "User registered successfully"}), 200

@auth.route('/login', methods=['POST', 'GET'])
def login():
    print("Login Request!")
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"message": "Invalid input"}), 400

    data = {}
    data['username'] = username
    data['password'] = password


    user = User.objects(username=data['username']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({"message": "Invalid username or password"}), 401
    access_token = create_access_token(identity=user.username)
    # session['user_id'] = str(user.id)
    return jsonify({"access_token": access_token,'projects':user.associated_projects()}), 200

@auth.route('/return_user/', methods=['POST'])
@jwt_required()
def return_user():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.objects(username=current_user).first()
    return jsonify({"username": user.username,'projects':user.associated_projects()}), 200

@auth.route('/logout')
def logout():
    pass
