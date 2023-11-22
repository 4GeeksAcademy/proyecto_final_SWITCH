"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users
from api.utils import generate_sitemap, APIException
from api.models import Groups

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



### GET all users' info #####

@api.route('/users', methods=['GET'])
def get_users():
    users = Users.query.all()

    if not users:
        return jsonify(message="No users found"), 404

    all_users = list(map(lambda x: x.serialize(), users))
    return jsonify(message="Users", users=all_users), 200


#### GET one user's info #####

@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = Users.query.get(user_id)

    if not user:
        return jsonify({'message': 'User not found'}), 404

    serialized_user = user.serialize()
    return jsonify({'user': serialized_user}), 200


#### GET Groups info #####
@api.route('/searchGroup/<int:group_id>', methods=['GET'])
def get_group(group_id):
    # Busca el grupo por su ID en la base de datos
    group = Groups.query.get(group_id)

    if group:
        # Si se encuentra el grupo,  serializarlo o devolver los datos necesarios
        group_data = {
            'id': group.id_group,
            'name': group.name,
            'organizer_id': group.id_organizer,
            'city': group.city,
            'languages': group.languages,
            'description': group.description,
            'photo_url': group.photo_url,
            'is_active': group.is_active,
        }
        
        return jsonify({'group_data': group_data, }), 200
    else:
        # Si el grupo no se encuentra, devolver un mensaje de error
        return jsonify({'message': 'Group not found'}), 404
