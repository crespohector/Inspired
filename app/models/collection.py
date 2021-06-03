from .db import db
from .collection_quote import collection_quote

class Collection(db.Model):
    __tablename__ = 'collections'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    users = db.relationship("User", back_populates="collections")

    quotes = db.relationship(
        "Quote",
        secondary=collection_quote,
        back_populates="collections"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "user_id": self.user_id
        }
