from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id_user = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)  
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    gender = db.Column(db.String(20), unique=False, nullable=False)
    city = db.Column(db.String(50), unique=False, nullable=False)
    languages = db.Column(db.String(100), unique=False, nullable=False)
    photo_url = db.Column(db.String(500), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User: {self.first_name} {self.last_name}, Email: {self.email}>'

    def serialize(self):
        return {
            "id": self.id_user,
            "first_name": self.first_name, 
            "last_name": self.last_name,
            "email": self.email,
            "gender": self.gender,
            "city": self.city,
            "languages": self.languages,
            "photo_url": self.photo_url,
            "is_active": self.active            
        }

class Group(db.Model):
    __tablename__ = 'groups'
    id_group = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    id_organizer = db.Column(db.Integer, db.ForeignKey('user.id_user'))
    organizer = db.relationship(User)
    city = db.Column(db.String(50), unique=False, nullable=False)
    languages = db.Column(db.String(100), unique=False, nullable=False)
    description = db.Column(db.String(300), nullable=False)  
    photo_url = db.Column(db.String(500), unique=False, nullable=False)
    # member_count = db.Column(db.Integer) cómo incorporamos esto aquí?
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<Group: {self.name}, Organizer: {self.organizer}>'

    def serialize(self):
        return {
            "id": self.id_user,
            "group": self.name, 
            "organizer": self.id_organizer,
            "city": self.city,
            "languages": self.languages,
            "description": self.description,
            "photo_url": self.photo_url,
            "is_active": self.active            
        }