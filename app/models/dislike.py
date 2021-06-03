from .db import db

class Dislike(db.Model):
    __tablename__ = "dislikes"

    id = db.Column(db.Integer, primary_key=True)
    quote_id = db.Column(db.Integer, db.ForeignKey("quotes.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    users = db.relationship("User", back_populates="dislikes")
    quotes = db.relationship("Quote", back_populates="dislikes")

    def to_dict(self):
        return {
            "id": self.id,
            "quote_id": self.quote_id,
            "user_id": self.user_id
        }
