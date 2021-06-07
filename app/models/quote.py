from .db import db
from .collection_quote import collection_quote
from .favorite import favorite

class Quote(db.Model):
    __tablename__ = "quotes"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(150), default="anonymous", nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    owners = db.relationship("User", back_populates="quotes")

    users = db.relationship("User",
    secondary=favorite,
    back_populates="quotes"
    )

    dislikes = db.relationship("Dislike", back_populates="quotes")

    collections = db.relationship(
        "Collection",
        secondary=collection_quote,
        back_populates="quotes"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "author": self.author,
            "owner_id": self.owner_id
        }
