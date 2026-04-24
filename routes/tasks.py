from flask import Blueprint, request, jsonify
from flask_login import current_user
from extensions import db, limiter
from models import Task

tasks_bp = Blueprint("tasks", __name__)

def require_auth():
    if not current_user.is_authenticated:
        return jsonify({"error": "Unauthorized"}), 401
    return None


@tasks_bp.route("/tasks", methods=["GET"])
def get_tasks():
    auth_error = require_auth()
    if auth_error:
        return auth_error

    tasks = Task.query.filter_by(user_id=current_user.id).order_by(Task.created_at.desc()).all()
    return jsonify([task.to_dict() for task in tasks]), 200


@tasks_bp.route("/tasks/<int:task_id>", methods=["GET"])
def get_task(task_id):
    auth_error = require_auth()
    if auth_error:
        return auth_error

    task = Task.query.filter_by(id=task_id, user_id=current_user.id).first()
    if not task:
        return jsonify({"error": "Task not found"}), 404

    return jsonify(task.to_dict()), 200


@tasks_bp.route("/tasks", methods=["POST"])
@limiter.limit("20 per minute")
def create_task():
    auth_error = require_auth()
    if auth_error:
        return auth_error

    data = request.get_json() or {}

    title = data.get("title", "").strip()
    description = data.get("description", "").strip()
    due_date = data.get("due_date", "").strip()
    status = data.get("status", "pending").strip()

    if not title:
        return jsonify({"error": "Title is required"}), 400

    task = Task(
        title=title,
        description=description,
        due_date=due_date,
        status=status,
        user_id=current_user.id
    )

    db.session.add(task)
    db.session.commit()

    return jsonify({
        "message": "Task created successfully",
        "task": task.to_dict()
    }), 201


@tasks_bp.route("/tasks/<int:task_id>", methods=["DELETE"])
@limiter.limit("20 per minute")
def delete_task(task_id):
    auth_error = require_auth()
    if auth_error:
        return auth_error

    task = Task.query.filter_by(id=task_id, user_id=current_user.id).first()
    if not task:
        return jsonify({"error": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted successfully"}), 200