from app.models import db, User, Quote

# Adds a demo user, you can add other users here if you want
def seed_favorites():

    #query for the demo user
    user = User.query.get(1)

    #create a for loop where the user likes 10 quotes
    for i in range(1, 11):
        quote = Quote.query.get(i)
        quote.users.append(user)
        db.session.add(quote)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_favorites():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
