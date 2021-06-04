from flask import Blueprint, session, request
# from app.forms import QuoteForm
from app.models import Quote, db

quote_routes = Blueprint('quotes', __name__)

# @app.route('/login', methods=['GET', 'POST'])
#We want to get all the quotes
@quote_routes.route('/')
def quotes():
    '''
    GET all quotes
    '''
    #we want to query for all quotes
    quotes = Quote.query.all()
    print('---------QUOTES-------:', quotes)
    return {"quotes": [quote.to_dict() for quote in quotes]}
