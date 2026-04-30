from datetime import datetime
from flask_login import UserMixin
from extensions import db, login_manager

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)

    tasks = db.relationship("Task", backref="owner", lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    due_date = db.Column(db.String(50), nullable=True)
<<<<<<< HEAD
    status = db.Column(db.String(20), default="Pending")
    priority = db.Column(db.String(20), default="Medium")
=======
    status = db.Column(db.String(20), default="pending")
>>>>>>> ac87004a469b93976befbc5054771a30ce2ee785
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "due_date": self.due_date,
            "status": self.status,
<<<<<<< HEAD
            "priority": self.priority,
=======
>>>>>>> ac87004a469b93976befbc5054771a30ce2ee785
            "created_at": self.created_at.isoformat(),
            "user_id": self.user_id
        }