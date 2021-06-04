from flask import Blueprint, session, request
from app.forms import CollectionForm
from app.models import Collection, db

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
    #one was of grabbing data from the front end (json object) is by using flask wtf
    collection = Collection.query.get(id)
    collection.title = form.data['title'] #this is from the form and its grabbing data from the front end json object
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
