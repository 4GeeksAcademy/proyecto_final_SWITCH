  
import os
from flask_admin import Admin
from .models import db, Users
from .models import db, Groups
from .models import db, Events
from .models import db, Events_attendee
from .models import db, Members_group



from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Users, db.session))
    admin.add_view(ModelView(Groups, db.session))
    admin.add_view(ModelView(Events, db.session))
    admin.add_view(ModelView(Events_attendee, db.session))
    admin.add_view(ModelView(Members_group, db.session))


    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))