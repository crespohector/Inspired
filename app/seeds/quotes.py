from app.models import db, Quote
import requests

data = requests.get("https://zenquotes.io/api/quotes")
quotes = data.json()

def seed_quotes():

    for quote in quotes:
        new_quote = Quote(content=quote['q'], author=quote['a'])
        db.session.add(new_quote)

    for i in range(5,16):
        new_quote = Quote(content=quotes[i]['q'], author=quotes[i]['a'], owner_id=1)
        db.session.add(new_quote)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_quotes():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
