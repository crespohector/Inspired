from .db import db, environment, SCHEMA, add_prefix_for_prod

# Invoke the helper function to add the prefix to the joins table
favorite = db.Table(
    add_prefix_for_prod("favorites"),
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
