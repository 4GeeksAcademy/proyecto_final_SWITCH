import click
from api.models import db, Users, Groups, Events, User_languages
"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are useful to run cronjobs or tasks outside of the API but sill in integration
with your database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    """
    El commando (dentro de pipenv shell) es "flask insert-test-<palabara>" 
    más un número que significa la cantidad de ese tipo de dato que quieres 
    insertar en la BBD from the command line
    """
    # Crear Nuevos Miembros
    @app.cli.command("insert-test-members") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test members")
        for x in range(1, int(count) + 1):
            test_member = Users()
            test_member.user_name = "Switch_Member" + str(x)
            test_member.first_name = "Member" + str(x)
            test_member.last_name = "McMember" + str(x)
            test_member.email = "member_user" + str(x) + "@member.com"
            test_member.password = "password" + str(x)
            test_member.city = "Testevilla"
            test_member.role = True # True = Member, False = Organizer
            test_member.gender = "male"
            test_member.photo_url = "www.memberphoto_url" + str(x) + ".com"
            test_member.is_active = True
        
            db.session.add(test_member)
            db.session.commit()     
            print("TestMember: ", test_member.user_name, "created.")

            # Languages
            languages = ["spanish", "english"]
            for language in languages: 
                test_member_languages = User_languages()
                test_member_languages.id_user = test_member.id_user
                test_member_languages.language = language
                
                db.session.add(test_member_languages)
                print("Languages: ", test_member_languages.language, "added.")
                db.session.commit()

        print("All test members and languages created")
        
    # Crear Nuevos Organizadores
    @app.cli.command("insert-test-organizers") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test organizers")
        for x in range(1, int(count) + 1):
            test_organizer = Users()
            test_organizer.user_name = "Switch_Organizer" + str(x)
            test_organizer.first_name = "Organizer" + str(x)
            test_organizer.last_name = "McOrganizer" + str(x)
            test_organizer.email = "organizer_user" + str(x) + "@organizer.com"
            test_organizer.password = "password" + str(x)
            test_organizer.city = "Testevilla"
            test_organizer.role = False # True = Member, False = Organizer
            test_organizer.gender = "female"
            test_organizer.languages = "spanish"
            test_organizer.photo_url = "www.organizerphoto_url" + str(x) + ".com"
            test_organizer.is_active = True
            
            db.session.add(test_organizer)
            db.session.commit()
            print("TestOrganizer: ", test_organizer.user_name, " created.")
            
        print("All test organizers created")
        
    # Crear Grupos
    @app.cli.command("insert-test-groups") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test groups")
        for x in range(1, int(count) + 1):
            test_group = Groups()
            test_group.name = "Switch Group" + str(x)
            test_group.id_organizer = None
            test_group.city = "Testevilla"
            test_group.languages = "spanish"
            test_group.description = "A test switch group where people can meet, speak and practice different languages, and make new friends!"
            test_group.photo_url = "www.groupphoto_url" + str(x) + ".com"
            test_group.is_active = True
            
            db.session.add(test_group)
            db.session.commit()
            print("Group: ", test_group.name, " created.")
            
        print("All test groups created")
        
    # Crear Eventos
    @app.cli.command("insert-test-events") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test events")
        for x in range(1, int(count) + 1):
            test_event = Events()
            test_event.name = "Switch Event" + str(x)
            test_event.description = "We're going to get switching, speak different languages, and make new friends! Exciting!"
            test_event.start_time = "01-01-2023 18:00:00"
            test_event.end_time = "01-01-2023 20:00:00"
            test_event.location = "Testevilla"
            test_event.photo_url = "www.eventphoto_url" + str(x) + ".com"
            test_event.attendee = None
            test_event.event_capacity = 20
            test_event.id_group = None
            
            db.session.add(test_event)
            db.session.commit()
            print("Event: ", test_event.name, " created.")
            
        print("All test events created")
