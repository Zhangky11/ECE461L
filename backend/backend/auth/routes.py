from flask import Blueprint, request, jsonify
auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST', 'GET'])
def login():
    print("Login Request!")
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    print(username)
    print(password)
    # Connect to DB
    if username == "admin" and password == "password":
        return jsonify({"status": "success", "message": "Login successful"}), 200
    else:
        return jsonify({"status": "error", "message": "Invalid credentials"}), 401

@auth.route('/logout')
def logout():
    pass
