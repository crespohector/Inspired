from flask import Blueprint, session, request
# from app.forms import CollectionForm
from app.models import Collection, db

collection_routes = Blueprint('collection', __name__)

@collection_routes.route('/user/<userId>/')
def collections(userId):
    '''
    GET all collections from a user
    '''
    collections = Collection.query.filter(Collection.user_id == userId).all()
    return {'collections': [collection.to_dict() for collection in collections]}

