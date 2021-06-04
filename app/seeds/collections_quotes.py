from app.models import db, User, Collection, Quote

# Adds a demo user, you can add other users here if you want
def seed_collections_quotes():

    #query for the first 4 collections and append each into a list
    collections_list = []
    for i in range(1,5):
        collection = Collection.query.get(i)
        collections_list.append(collection)

    #query for the first 30 quotes and append each into a list
    quotes_list = []
    for i in range(1,30):
        quote = Quote.query.get(i)
        quotes_list.append(quote)

    #For each collection we want to append a unique quote
    count = 0
    for collection in collections_list:
        for i in range(6):
            collection.quotes.append(quotes_list[count])
            db.session.add(collection)
            count += 1

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_collections_quotes():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
