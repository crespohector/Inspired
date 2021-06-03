from app.models import db, Collection
from faker import Faker

faker = Faker()
# Adds a demo user, you can add other users here if you want
def seed_collections():

    # for i in range(5):
    #     collection = Collection(title=faker.word(), user_id=1)
    #     db.session.add(collection)

    collection1 = Collection(title="Loving myself <3", user_id=1)
    collection2 = Collection(title="Reaching my goals!", user_id=1)
    collection3 = Collection(title="Motivation", user_id=1)
    collection4 = Collection(title="Success", user_id=1)
    collection5 = Collection(title="spirituality", user_id=1)

    db.session.add(collection1)
    db.session.add(collection2)
    db.session.add(collection3)
    db.session.add(collection4)
    db.session.add(collection5)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_collections():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
