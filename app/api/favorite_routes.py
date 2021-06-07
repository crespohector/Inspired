from flask import Blueprint, request, jsonify
# from app.forms import QuoteForm
from app.models import User, db, Quote

favorite_routes = Blueprint('favorites', __name__)

@favorite_routes.route('/user/<userId>/')
def favorites(userId):
    '''
    GET all the favorite quotes from a user
    '''
    user = User.query.get(userId)
    user_quotes = user.quote_favorites

    return {'user_quote': [user_quote.to_dict() for user_quote in user_quotes]}

@favorite_routes.route('/user/<userId>/', methods=['POST'])
def like_quote(userId):
    '''
    POST a user can favorite a quote
    '''
    data = request.json

    user = User.query.get(userId)
    quote = Quote.query.get(data['quoteId'])

    quote.users.append(user)
    db.session.add(quote)
    db.session.commit()

    return quote.to_dict()

#we want the user to be able to unlike a quote
@favorite_routes.route('/user/<userId>/', methods=['DELETE'])
def unlike_quote(userId):
    '''
    DELETE unlike a quote
    '''
    data = request.json

    user = User.query.get(userId)
    quote = Quote.query.get(data['quoteId'])

    quote.users.remove(user)
    db.session.add(quote)
    db.session.commit()

    return quote.to_dict()
