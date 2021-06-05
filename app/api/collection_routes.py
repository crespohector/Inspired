from flask import Blueprint, request
from app.forms import CollectionForm
from app.models import Collection, db, Quote
# from flask_login import login_required, current_user We can add another @decorative
#function @login_required invoked login_required.

collection_routes = Blueprint('collection', __name__)

@collection_routes.route('/user/<userId>/')
def collections(userId):
    '''
    GET all collections from a user
    '''
    collections = Collection.query.filter(Collection.user_id == userId).all()
    return {'collections': [collection.to_dict() for collection in collections]}


@collection_routes.route('/user/<userId>/', methods=['POST'])
def create_collection(userId):
    '''
    POST create a new collection based on user id
    '''
    form = CollectionForm()
    collection = Collection(
        title=form.data['title'],
        user_id=userId
    )
    db.session.add(collection)
    db.session.commit()
    return collection.to_dict()

    # NameError: name 'validation_errors_to_error_messages' is not defined
        # for some reason this does not work? if form.validate_on_submit():
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@collection_routes.route('/<id>', methods=["PUT"])
def edit_collection(id):
    '''
    PUT edit a collection
    '''
    form = CollectionForm()
    collection = Collection.query.get(id)
    collection.title = form.data['title']
    db.session.commit()
    return collection.to_dict()


@collection_routes.route('/<id>/', methods=["DELETE"])
def delete_collection(id):
    '''
    DELETE remove a collection
    '''
    collection = Collection.query.get(id)
    db.session.delete(collection)
    db.session.commit()
    return collection.to_dict()

#todo- GET, POST, DELETE a quote from a collection
#we want to remove a quote from a specific collection
@collection_routes.route('/<id>/quotes/')
def collection_quotes(id):
    '''
    GET all quotes from a specific collection
    '''
    collection = Collection.query.get(id)
    collection_quotes = collection.quotes
    return {"collection_quote": [collection_quote.to_dict() for collection_quote in collection_quotes]}

@collection_routes.route('/<id>/quotes/', methods=['POST'])
def add_quote_to_collection(id):
    '''
    POST add a quote to a specific collection
    '''
    #If I would be creating an instance of the collection model therefore, i wouldn't be able
    #to add the quote to a specific collection.
    data = request.json

    collection = Collection.query.get(id)
    quote = Quote.query.get(data['quoteId'])

    collection.quotes.append(quote)
    db.session.add(collection)
    db.session.commit()

    return quote.to_dict()

@collection_routes.route('/<id>/quotes/', methods=['DELETE'])
def remove_quote_from_collection(id):

    data = request.json

    collection = Collection.query.get(id)
    quote = Quote.query.get(data['quoteId'])

    collection.quotes.remove(quote)
    db.session.add(collection)
    db.session.commit()
    
    return quote.to_dict()
