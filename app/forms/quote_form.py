from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class QuoteForm(FlaskForm):
    content = StringField("Quote", validators=[DataRequired()])
    author = StringField("Author", validators=[DataRequired()])
