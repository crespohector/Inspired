from .db import db, environment, SCHEMA, add_prefix_for_prod


favorite = db.Table(
    "favorites",
    db.Column("user_id",
    db.Integer,
    db.ForeignKey(add_prefix_for_prod("users.id")),
    primary_key=True
    ),
    db.Column("quote_id",
    db.Integer,
    db.ForeignKey(add_prefix_for_prod("quotes.id")),
    primary_key=True
    )
)
