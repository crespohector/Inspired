from .db import db


favorite = db.Table(
    "favorites",
    db.Column("user_id",
    db.Integer,
    db.ForeignKey("users.id"),
    primary_key=True
    ),
    db.Column("quote_id",
    db.Integer,
    db.ForeignKey("quotes.id"),
    primary_key=True
    )
)
