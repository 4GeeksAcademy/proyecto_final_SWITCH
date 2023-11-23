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

# database configuration
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

@app.route('/api/allEvents', methods=['GET'])
def get_all_events():
    # Retrieve all events from the database
    all_events = Events.query.all()

    # Convert the events to a list of dictionaries
    events_list = []
    for event in all_events:
        event_dict = {
            'id': event.id_event,
            'name': event.name,
            'description': event.description,
            'start_time': event.start_time,
            'end_time': event.end_time,
            'location': event.location,
            'event_capacity': event.event_capacity
        }
        events_list.append(event_dict)

    # Order the events list by start_time
    events_list = sorted(events_list, key=lambda x: x['start_time'])

    # Print the events list for debugging
    print("Events List:", events_list)

    # Return the list of events as a JSON response
    return jsonify(events_list), 200


################################################################################################################################################################

# GET ONLY ONE EVENT

@app.route('/api/searchevent/<int:id_event>', methods=['GET'])
def get_event(id_event):
    # Retrieve the event from the database based on the provided ID
    event = Events.query.get(id_event)

    # Check if the event exists
    if not event:
        return jsonify({'error': 'Event not found'}), 404

    # Create a dictionary representation of the event
    one_event = {
        'id': event.id_event,
        'name': event.name,
        'description': event.description,
        'start_time': event.start_time,
        'end_time': event.end_time,
        'location': event.location,
        'event_capacity': event.event_capacity
    }

  # Print the events list for debugging
    print("Events List:", one_event)

    # Return the event as a JSON response
    return jsonify(one_event), 200

################################################################################################################################################################

# CREATE NEW EVENT (POST)
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
        event_capacity=body['event_capacity'],
        photo_url=body['photo_url']
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

    # Need to convert JS string "true" & "false" values to Python True & False?

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

    # BCrypting Password
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




#################################################################################################################################################################

# GET ID USER & ROLE & PHOTO (POST)

@app.route('/api/idUserAndRoleAndImage', methods=["POST"])
def getUserIdAndRoleAndImage():

    # Extract JSON Data
    body = request.get_json(silent=True)
    # Handle Errors
    if body is None:
        return jsonify({'error': 'You must send information with the body'}), 400
    if 'email' not in body:
        return jsonify({'error': 'You must include an email address in the body'}), 400

    user = Users.query.filter_by(email=body['email']).first()
    if user is None: 
        return jsonify({"msg": "Incorrect email address"}), 404 
    
    user_serialized = user.serialize() 
    
    return jsonify({'idUser': user_serialized['id'], "role": user_serialized['role'], "photo": user_serialized['photo_url']})

#################################################################################################################################################################

# GET USER DATA (GET)

@app.route('/api/UserData/<int:id_user>', methods=["GET"])
def getUserData(id_user): 

    # Find user by user_id
    user = Users.query.get(id_user) 
    # Handle Errors
    if user is None: 
        return jsonify({"Error:", "The user with id {} doesn't exist".format(id_user)}), 400

    user_serialized = user.serialize() 
    
    return jsonify({'userData': user_serialized})

#################################################################################################################################################################

# GET USER LANGUAGES (GET)

@app.route('/api/UserLanguages/<int:id_user>', methods=["GET"])
def getUserLanguages(id_user): 

    # Find user in languages table by user_id
    user_languages = User_languages.query.filter_by(id_user=id_user).all() 
    # Handle Errors
    if user_languages is None: 
        return jsonify({"Error:", "The user with id {} doesn't exist".format(id_user)}), 400

    # For each instance of "language" found in "user_languages" we apply the serialize method to it 
    languages_serialized = [language.serialize() for language in user_languages] 
    
    return jsonify({'userLanguages': languages_serialized})

#################################################################################################################################################################

# EDIT USER PROFILE (PUT)

@app.route('/api/EditUserProfile/<int:id_user>', methods=["PUT"])
def updateMember(id_user): 

    # Find user by user_id
    user = Users.query.get(id_user) 
    # Handle Errors
    if user is None: 
        return jsonify({"Error:", "The user with id {} doesn't exist".format(id_user)}), 400

    # Extraer data de JSON
    body = request.get_json(silent=True)
    # Handle Errors
    if body is None:
        return jsonify({'error': 'You must send information with the body'}), 400
    # Member Profile Update
    if 'first_name' in body:
        user.first_name = body['first_name']
    if 'last_name' in body:
        user.last_name = body['last_name']
    if 'user_name' in body:
        user.user_name = body['user_name']
    if 'email' in body:
        user.email = body['email']
    if 'password' in body:
        user.password = body['password']
    if 'city' in body:
        user.city = body['city']
    if 'role' in body:
        user.role = body['role']
    if 'gender' in body:
        user.gender = body['gender']
    if 'photo_url' in body:
        user.photo_url = body['photo_url']
 
    # Handle Password Update
    if 'password' in body:
        pw_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')
        user.password = pw_hash

    # Commit changes to database
    db.session.commit()

    # Handle User Languages Update
    languages = body.get('languages')
    if languages is not None: 
        # Remove existing languages
        User_languages.query.filter_by(id_user=user.id_user).delete()
        # Add new languages
        for language in languages:
            user_language = User_languages()
            user_language.language = language
            user_language.id_user = user.id_user
            db.session.add(user_language)
        
        db.session.commit()

    # Client-side Message
    return jsonify({'msg': 'User Profile Successfully Updated'})

#################################################################################################################################################################

# GET USER EMAIL FROM TOKEN

###############################################################################################################################################################

# GET USER ID FROM EMAIL

@app.route('/users/<string:email>', methods=['GET'])
def get_user_id(email):
    user = Users.query.filter_by(email=email).first()
    if user:
        return jsonify({'id': user.id_user}), 200
    return jsonify({'message': 'User not found'}), 404

###############################################################################################################################################################


# ADD EVENT to MEMBER'S EVENTS THEY HAVE JOINED LIST

@app.route('/api/memberEvents', methods=["POST"])
def post_member_event():
    # Extract JSON Data
    body = request.get_json(silent=True)
    
    # Handle Errors
    if body is None:
        return jsonify({'error': 'You must send information with the body'}), 400
    if 'event_relationship' not in body:
        return jsonify({'error': 'You must include event ID'}), 400
    if 'user_relationship' not in body:
        return jsonify({'error': 'You must include user ID'}), 400
    
    # Find the event and user in the database
    event = Events.query.get(body['event_relationship'])
    user = Users.query.get(body['user_relationship'])
    
    if not event:
        return jsonify({'error': 'Event not found'}), 404
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Create a new Events_attendee record
    new_event_attendee = Events_attendee(
        event_relationship=event,
        user_relationship=user
    )
    
    # Add the new record to the database
    db.session.add(new_event_attendee)
    db.session.commit()
    
    # Return a success response
    return jsonify({'message': 'Event attendee created successfully'}), 200

#################################################################################################################################################################

# GET ALL EVENTS that MEMBER HAS JOINED

@app.route('/api/userEvents/<int:user_id>', methods=["GET"])
def get_user_events(user_id):
    # Find the user in the database
    user = Users.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Retrieve all the events associated with the user
    user_events = Events_attendee.query.filter_by(user_relationship=user).all()

    # Serialize the events to a list of dictionaries
    serialized_events = [event.serialize() for event in user_events]

    # Return the serialized events as a JSON response
    return jsonify(serialized_events), 200

#################################################################################################################################################################

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
