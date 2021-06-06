from flask import Blueprint, request, jsonify
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


@quote_routes.route('/user/<userId>/', methods=["POST"])
def create_quote(userId):
    '''
    POST create a quote based on user id
    '''
    data = request.json

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
        # return quote.to_dict()
        return jsonify(data)

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@quote_routes.route('/<id>/', methods=['PUT'])
def edit_quote(id):
    '''
    POST edit a quote base on its primary id
    '''
    #IMPORTANT: make sure to render errors on the front end when editing quotes, it cannot be empty
    form = QuoteForm()
    quote = Quote.query.get(id)

    if len(form.data['content']) > 0:
        quote.content = form.data['content']

    if len(form.data['author']) > 0:
        quote.author = form.data['author']

    db.session.commit()
    return quote.to_dict()


@quote_routes.route('/<id>/', methods=["DELETE"])
def delete_quote(id):
    '''
    DELETE remove a quote based on primary id
    '''
    quote = Quote.query.get(id)
    db.session.delete(quote)
    db.session.commit()
    return quote.to_dict()
