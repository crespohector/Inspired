from app.models import db, Dislike

# Adds a demo user, you can add other users here if you want
def seed_dislikes():

    for i in range(16,21):
        dislike = Dislike(quote_id=i, user_id=1)
        db.session.add(dislike)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_dislikes():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
