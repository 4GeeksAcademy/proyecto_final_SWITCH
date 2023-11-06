from flask_sqlalchemy import SQLAlchemy

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
    languages = db.Column(db.String(100), nullable = False)
    photo_url = db.Column(db.String(500))
    is_active = db.Column(db.Boolean(), nullable = False)
    roll = db.Column (db.Boolean(), nullable =False)

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
            "languages": self.languages,
            "photo_url": self.photo_url,
            "is_active": self.active,
            "roll" : self.roll         
        }

class Groups(db.Model):
    __tablename__ = 'groups'
    id_group = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), unique = True, nullable = False)
    id_organizer = db.Column(db.Integer, db.ForeignKey('id_user'))
    organizer_relationship = db.relationship(Users)
    city = db.Column(db.String(50), nullable = False)
    languages = db.Column(db.String(100), nullable = False)
    description = db.Column(db.String(300), nullable = False)  
    photo_url = db.Column(db.String(500), nullable = False)
    is_active = db.Column(db.Boolean(), nullable = False)

    def __repr__(self):
        return f'<Groups: {self.id_group}>'

    def serialize(self):
        return {
            "id": self.id_user,#Duda
            "group": self.name, 
            "organizer": self.id_organizer,
            "city": self.city,
            "languages": self.languages,
            "description": self.description,
            "photo_url": self.photo_url,
            "is_active": self.active            
        }
    

class Events(db.Model):
    __tablename__ = 'events'
    id_event = db.Column(db.Integer, primary_key = True)
    description = db.Column(db.String(300), nullable = False)
    start_time = db.Column(db.Datetime, nullable = False)
    end_time = db.Column(db.Datetime, nullable = False)
    location = db.Column(db.String, nullable = False)
    photo_url = db.Column(db.String(500))
    attendee = db.Column(db.Boolean(), nullable = False)
    event_capacity = db.Column(db.Integer, nullable = False)
    id_group = db.Column(db.Integer, db.ForeignKey('id_group'))
    group_relationship = db.relationship(Groups)

    def __repr__(self):
        return f'<Groups: {self.id_event}>'
    
    def serialize(self):
        return {
            "id": self.id_event,
            "group": self.name, 
            "description": self.description,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "location": self.location,
            "photo_url": self.photo_url,
            "attendee": self.attendee,
            "capacity": self.event_capacity,
            "group": self.id_group           
        }



