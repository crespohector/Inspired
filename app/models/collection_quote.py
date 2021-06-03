from .db import db

collection_quote = db.Table(
    "collections_quotes",
    db.Column("collection_id",
    db.Integer,
    db.ForeignKey("collections.id"),
    primary_key=True
    ),
    db.Column("quote_id",
    db.Integer,
    db.ForeignKey("quotes.id"),
    primary_key=True
    )
)
