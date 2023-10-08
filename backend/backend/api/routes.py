from flask import Blueprint, jsonify

api = Blueprint('api', __name__)

@api.route('/greeting', methods=['GET'])
def greeting():
    return jsonify({"message": "Hello, World!"})
