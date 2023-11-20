from flask_sqlalchemy import SQLAlchemy
import enum

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'users'
    id_user = db.Column(db.Integer, primary_key = True)
    user_name = db.Column(db.String(20), unique = True, nullable = False)
    first_name = db.Column(db.String(120), nullable = False)
    last_name = db.Column(db.String(120), nullable = False)  
    email = db.Column(db.String(120), unique = True, nullable = False)
    password = db.Column(db.String(80), nullable = False)
    gender = db.Column(db.String(20))
    city = db.Column(db.String(50), nullable = False)
    photo_url = db.Column(db.String(500))
    is_active = db.Column(db.Boolean(), nullable = False)
    role = db.Column (db.Boolean(), nullable =False)

    # Consideración: usar una tabla de Enum para role? 
    # ¿Hacer algo parecido a lo que hemos hecho para idiomas?


    def __repr__(self):
        return f'<Users: {self.id_user}>'

    def serialize(self):
        return {
            "id": self.id_user,
            "user_name": self.user_name,
            "first_name": self.first_name, 
            "last_name": self.last_name,
            "email": self.email,
            "gender": self.gender,
            "city": self.city,
            "photo_url": self.photo_url,
            "is_active": self.is_active,
            "role" : self.role      
        }

class Groups(db.Model):
    __tablename__ = 'groups'
    id_group = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), unique = True, nullable = False)
    id_organizer = db.Column(db.Integer, db.ForeignKey('users.id_user'))
    organizer_relationship = db.relationship("Users")
    city = db.Column(db.String(50), nullable = False)
    languages = db.Column(db.String(100), nullable = False)
    description = db.Column(db.String(300), nullable = False)  
    photo_url = db.Column(db.String(500), nullable = False)
    is_active = db.Column(db.Boolean(), nullable = False)

    def __repr__(self):
        return f'<Groups: {self.id_group}>'

    def serialize(self):
        return {
            "id": self.id_group,
            "group": self.name, 
            "organizer": self.id_organizer,
            "city": self.city,
            "languages": self.languages,
            "description": self.description,
            "photo_url": self.photo_url,
            "is_active": self.active            
        }
    
    # Consideración: necesitamos otra tabla de "Group_languages"? 

class Events(db.Model):
    __tablename__ = 'events'
    id_event = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), unique = True, nullable = False)
    description = db.Column(db.String(300), nullable = False)
    start_time = db.Column(db.DateTime, nullable = False)
    end_time = db.Column(db.DateTime, nullable = False)
    location = db.Column(db.String, nullable = False)
    photo_url = db.Column(db.String(500))
    attendee = db.Column(db.Boolean())
    event_capacity = db.Column(db.Integer, nullable = False)
    id_group = db.Column(db.Integer, db.ForeignKey('groups.id_group'))
    group_relationship = db.relationship(Groups)

    def __repr__(self):
        return f'<Events: {self.id_event}>'
    
    def serialize(self):
        return {
            "id": self.id_event,
            "name": self.name, 
            "description": self.description,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "location": self.location,
            "photo_url": self.photo_url,
            "attendee": self.attendee,
            "capacity": self.event_capacity,
            "group": self.id_group           
        }


class Events_attendee(db.Model):
    __tablename__ = 'events_attendee'
    id_event_attendee = db.Column(db.Integer, primary_key = True)
    id_event = db.Column(db.Integer, db.ForeignKey('events.id_event'))
    event_relationship = db.relationship(Events)
    id_user = db.Column(db.Integer, db.ForeignKey('users.id_user'))
    user_relationship = db.relationship(Users)

    def __repr__(self):
        return f'<Events_attendee: {self.id_event_attendee}>'
    
    def serialize(self):
        return {
            "id": self.id_event,
            "event": self.id_event,
            "user": self.id_user       
        }

class Members_group(db.Model):
    __tablename__ = 'members_group'
    id_member_group = db.Column(db.Integer, primary_key = True)
    id_user = db.Column(db.Integer, db.ForeignKey('users.id_user'))
    user_relationship = db.relationship(Users)
    id_group = db.Column(db.Integer, db.ForeignKey('groups.id_group'))
    group_relationship = db.relationship(Groups)
   

    def __repr__(self):
        return f'<Members_group: {self.id_member_group}>'
    
    def serialize(self):
        return {
            "id": self.id_event,
            "user": self.id_user,
            "group": self.id_group       
        }

class Enum_languages(enum.Enum):
    english = 'english' 
    spanish = 'spanish'
    french = 'french'
    italian = 'italian'
    german = 'german'
    portuguese = 'portugues'
    russian = 'russian'
    arabic = 'arabic'
    japanese = 'japanese'
    chinese = 'chinese'

class User_languages(db.Model):
    __tablename__ = 'user_languages'
    id_user_language = db.Column(db.Integer, primary_key = True)
    id_user = db.Column(db.Integer, db.ForeignKey('users.id_user'))
    user_relationship = db.relationship(Users)
    language = db.Column(db.Enum(Enum_languages))
   
    def __repr__(self):
        return f'<User_languages_record: {self.id_user_language}>'
    
    def serialize(self):
        return {
            "id": self.id_user_language,
            "user": self.id_user,
            "language": self.language.value       
        }
