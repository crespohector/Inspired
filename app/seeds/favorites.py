from app.models import db, Favorite

# Adds a demo user, you can add other users here if you want
def seed_favorites():

    for i in range(1,15):
        favorite = Favorite(quote_id=i, user_id=1)
        db.session.add(favorite)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_favorites():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
