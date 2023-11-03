from flask import Blueprint, request, jsonify, session
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from backend import jwt
auth = Blueprint('auth', __name__)


from .model import User
from backend.api.project.model import Project, Sequence
from backend.api.hardware.model import HwSet
from backend.shared.hardware_pool import HardwarePool

@auth.route('/register', methods=['POST', 'GET'])
def register():
    HardwarePool.objects().delete()
    hwpool1 = HardwarePool(name="HW 1", total_capacity=100, total_availability=100)
    hwpool2 = HardwarePool(name="HW 2", total_capacity=100, total_availability=100)
    hwpool1.save()
    hwpool2.save()


    User.objects().delete()
    Sequence.objects().delete()
    Project.objects().delete()
    HwSet.objects().delete()
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
# def login(request):
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
    return jsonify({"access_token": access_token,"username": data['username'],'projects':user.associated_projects()}), 200

@auth.route('/logout')
def logout():
    pass
