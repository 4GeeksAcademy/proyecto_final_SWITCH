"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, Users, Groups, Events, Events_attendee, Members_group, User_languages
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

# Bcrypt ---- pipenv install flask-bcrypt
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# Bcrypt ---- pipenv install flask-bcrypt
bcrypt = Bcrypt(app) 

from datetime import timedelta

# JWT MANAGER - FLASK JWT EXTENDED Configuration: 

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1) 

app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET')  
jwt = JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

################################################################################################################################################################

# GET ALL EVENTS

# TODO APPLY FILTERING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

@app.route('/api/allEvents', methods=['GET'])
def get_all_events():
    # Retrieve all events from the database
    all_events = Events.query.all()

    # Convert the events to a list of dictionaries
    events_list = []
    for event in all_events:
        event_dict = {
            'name': event.name,
            'description': event.description,
            'start_time': event.start_time,
            'end_time': event.end_time,
            'location': event.location,
            'event_capacity': event.event_capacity
        }
        events_list.append(event_dict)

    # Print the events list for debugging
    print("Events List:", events_list)

    # Return the list of events as a JSON response
    return jsonify(events_list), 200

################################################################################################################################################################

# CREATE NEW EVENT

# CREATE NEW USER PROFILE (POST)
@app.route('/api/CreateNewEvent', methods=['POST'])
def create_new_event():
    # Extraer data de JSON
    body = request.get_json(silent=True)
    # Handle Errors
    if body is None:
        return jsonify({'error': 'You must send information with the body'}), 400
    if 'name' not in body:
        return jsonify({'error': 'You must include the name of the event'}), 400
    if 'description' not in body:
        return jsonify({'error': 'You must include the description of the event'}), 400
    if 'start_time' not in body:
        return jsonify({'error': 'You must include the start_time of the event'}), 400
    if 'end_time' not in body:
        return jsonify({'error': 'You must include an end_time for the event'}), 400
    if 'location' not in body:
        return jsonify({'error': 'You must include a location for the event'}), 400
    if 'event_capacity' not in body:
        return jsonify({'error': 'You must include the event_capacity of the event'}), 400


    # Check: name must be unique
    if Events.query.filter_by(name=body['name']).first() is not None:
        return jsonify({'error': 'This event name already exists'}), 400

  # Create a new event object
    new_event = Events(
        name=body['name'],
        description=body['description'],
        start_time=body['start_time'],
        end_time=body['end_time'],
        location=body['location'],
        event_capacity=body['event_capacity']
    )

    # Add the new event to the database
    db.session.add(new_event)
    db.session.commit()

    # Return success response
    return jsonify({'message': 'Event created successfully'}), 200

#################################################################################################################################################################

# CREATE NEW USER PROFILE (POST)
@app.route('/api/CreateNewUserProfile', methods=['POST'])
def create_new_user():
    # Extraer data de JSON
    body = request.get_json(silent=True)
    # Handle Errors
    if body is None:
        return jsonify({'error': 'You must send information with the body'}), 400
    if 'first_name' not in body:
        return jsonify({'error': 'You must include the first_name of the user'}), 400
    if 'last_name' not in body:
        return jsonify({'error': 'You must include the last_name of the user'}), 400
    if 'user_name' not in body:
        return jsonify({'error': 'You must include the user_name of the user'}), 400
    if 'email' not in body:
        return jsonify({'error': 'You must include an email for the user'}), 400
    if 'password' not in body:
        return jsonify({'error': 'You must include a password for the user'}), 400
    if 'city' not in body:
        return jsonify({'error': 'You must include the city of the user'}), 400
    if 'role' not in body:
        return jsonify({'error': 'You must specify the role of the user - member (true) or organizer (false)'}), 400

    # Check: user_name must be unique
    if Users.query.filter_by(user_name=body['user_name']).first() is not None:
        return jsonify({'error': 'This user_name already exists'}), 400
    
    # Check: email must be unique
    if Users.query.filter_by(email=body['email']).first() is not None:
        return jsonify({'error': 'This email already exists'}), 400

    # For no-required columns
    languages = body.get('languages')
    gender = body.get('gender')
    photo_url = body.get('photo_url')

    pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    # Inserting New User into Database
    new_user = Users()
    # Required
    new_user.first_name = body['first_name']
    new_user.last_name = body['last_name']
    new_user.user_name = body['user_name']
    new_user.email = body['email']
    new_user.password = pw_hash
    new_user.city = body['city']
    new_user.role = body['role']
    # Optional
    new_user.gender = gender
    new_user.photo_url = photo_url  # --> Todo: conectar API, ¿cómo tomar archivo y convertirlo en URL?
    # Automatic   
    new_user.is_active = True

    # Add to Database
    db.session.add(new_user)
    db.session.commit()

    # User Languages
    if languages is not None:
        for language in languages:
            new_user_language = User_languages()
            new_user_language.language = language
            new_user_language.id_user = new_user.id_user

            db.session.add(new_user_language)
            db.session.commit()

    # Client-side Message
    return jsonify({'msg': 'New User Successfully Created'})

#################################################################################################################################################################

# SIGN-IN USER: 

@app.route("/api/token", methods=["POST"])
def create_token():

    body = request.get_json(silent=True)

    if body is None: 
        return jsonify({"msg": "Body missing"}), 400 
    if "email" not in body:
        return jsonify({"msg": "Email missing"})
    if "password" not in body:
        return jsonify({"msg": "Password missing"})

    user = Users.query.filter_by(email=body['email']).first()
    if user is None: 
        return jsonify({"msg": "user doesn't exist"}), 402 
    
    if not bcrypt.check_password_hash(user.password, body['password']):
        return jsonify({'msg':'password is not correct'}), 402

    access_token = create_access_token(identity=user.email)
    return jsonify(access_token=access_token), 200


# Code de Vanesa 
# https://github.com/4GeeksAcademy/Authentication-system-with-Python-Flask-and-React.js-vanesascode/blob/main/src/app.py


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
