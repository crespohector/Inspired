from flask import Blueprint, session, request
from app.forms import QuoteForm
from app.models import Quote, db

quote_routes = Blueprint('quotes', __name__)

@quote_routes.route('/')
def quotes():
    '''
    GET all quotes
    '''
    quotes = Quote.query.all()
    return {"quotes": [quote.to_dict() for quote in quotes]}


@quote_routes.route('/user/<userId>/')
def quotes_by_user(userId):
    '''
    GET all quotes based on userId
    '''
    quotes = Quote.query.filter(Quote.user_id == userId).all()
    return {"quotes": [quote.to_dict() for quote in quotes]}


#todo: POST, PUT, DELETE quote
@quote_routes.route('/user/<userId>/', methods=["POST"])
def create_quote(userId):
    '''
    POST create a quote based on user id
    '''
    form = QuoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        quote = Quote(
            content=form.data['content'],
            author=form.data['author'],
            user_id=userId
        )
        db.session.add(quote)
        db.session.commit()
        return quote.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@quote_routes.route('/<id>/', methods=["DELETE"])
def delete_quote(id):
    '''
    DELETE remove a quote based on primary id
    '''
    #query for the quote by its id
    quote = Quote.query.get(id)
    db.session.delete(quote)
    db.session.commit()
    return quote.to_dict()
