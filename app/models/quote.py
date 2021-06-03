from .db import db
from .collection_quote import collection_quote

class Quote(db.Model):
    __tablename__ = "quotes"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(150), default="anonymous", nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    users = db.relationship("User", back_populates="quotes")

    favorites = db.relationship("Favorite", back_populates="quotes")

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
            "user_id": self.user_id
        }
