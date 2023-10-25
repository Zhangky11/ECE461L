from flask import Blueprint, request, jsonify, session
auth = Blueprint('auth', __name__)

from .model import User
from backend.api.project.model import Project

@auth.route('/register', methods=['POST', 'GET'])
def register():
    # data = request.get_json()
    # if not data or 'username' not in data or 'password' not in data or 'email' not in data:
    #     return jsonify({"message": "Invalid input"}), 400
    data = {}
    data['username'] = 'jeff'
    data['password'] = 'pass'
    
    #data['email'] = '46@gmail.com'

    if User.objects(username=data['username']).first():
        return jsonify({"message": "Username already exists"}), 400

    #user = User(username=data['username'], email=data['email'])
    
    project1 = Project(name="project1",description='de').save()
    project2 = Project(name="project2",description='de').save()
    project3 = Project(name="project3",description='de').save()
    user = User(username=data['username'])
    user.joined_projects.append(project1)
    user.joined_projects.append(project2)
    user.joined_projects.append(project3)
    user.set_password(data['password'])
    
    user.save()
    

    return jsonify({"message": "User registered successfully"}), 201

@auth.route('/login', methods=['POST', 'GET'])
def login():
    print("Login Request!")
    # data = request.json
    # username = data.get('username')
    # password = data.get('password')
    
    # print(username)
    # print(password)
    # Connect to DB
    # if username == "admin" and password == "password":
    #     return jsonify({"status": "success", "message": "Login successful"}), 200
    # else:
    #     return jsonify({"status": "error", "message": "Invalid credentials"}), 401
    
    # data = request.get_json()
    # if not data or 'username' not in data or 'password' not in data:
    #     return jsonify({"message": "Invalid input"}), 400

    data = {}
    data['username'] = 'jeff'
    data['password'] = 'pass'

    #test


    user = User.objects(username=data['username']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({"message": "Invalid username or password"}), 401
    print(user)
    

    #session['user_id'] = str(user.id)  # 使用 Flask 的 session 保存用户 ID
    
    return jsonify({"username": data['username'],'projects':user.associated_projects()}), 200

@auth.route('/logout')
def logout():
    pass
