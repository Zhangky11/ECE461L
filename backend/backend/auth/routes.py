from flask import Blueprint, request, jsonify, session
auth = Blueprint('auth', __name__)

from .model import User

@auth.route('/register', methods=['POST', 'GET'])
def register():
    # data = request.get_json()
    # if not data or 'username' not in data or 'password' not in data or 'email' not in data:
    #     return jsonify({"message": "Invalid input"}), 400
    data = {}
    data['username'] = 'Kyrie'
    data['password'] = 'password'
    data['email'] = '123@gmail.com'

    if User.objects(username=data['username']).first():
        return jsonify({"message": "Username already exists"}), 400

    user = User(username=data['username'], email=data['email'])
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
    # # Connect to DB
    # if username == "admin" and password == "password":
    #     return jsonify({"status": "success", "message": "Login successful"}), 200
    # else:
    #     return jsonify({"status": "error", "message": "Invalid credentials"}), 401
    
    # data = request.get_json()
    # if not data or 'username' not in data or 'password' not in data:
    #     return jsonify({"message": "Invalid input"}), 400

    data = {}
    data['username'] = 'Kyrie'
    data['password'] = 'passwor'

    user = User.objects(username=data['username']).first()

    if not user or not user.check_password(data['password']):
        return jsonify({"message": "Invalid username or password"}), 401

    session['user_id'] = str(user.id)  # 使用 Flask 的 session 保存用户 ID

    return jsonify({"message": "Logged in successfully"}), 200

@auth.route('/logout')
def logout():
    pass
