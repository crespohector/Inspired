from .db import  db, environment, SCHEMA, add_prefix_for_prod

collection_quote = db.Table(
    "collections_quotes",
    db.Column("collection_id",
    db.Integer,
    db.ForeignKey(add_prefix_for_prod("collections.id")),
    primary_key=True
    ),
    db.Column("quote_id",
    db.Integer,
    db.ForeignKey(add_prefix_for_prod("quotes.id")),
    primary_key=True
    )
)
