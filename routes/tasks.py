from flask import Blueprint, request, jsonify
from flask_login import current_user
from extensions import db, limiter
from models import Task

tasks_bp = Blueprint("tasks", __name__)


# Helper function to ensure user is authenticated
def require_auth():
    if not current_user.is_authenticated:
        return jsonify({"error": "Unauthorized"}), 401
    return None


# GET /tasks (with filter + search)
@tasks_bp.route("/tasks", methods=["GET"])
def get_tasks():
    auth_error = require_auth()
    if auth_error:
        return auth_error

    status = request.args.get("status")
    search = request.args.get("search", "").strip().lower()

    query = Task.query.filter_by(user_id=current_user.id)

    if status and status != "All":
        query = query.filter_by(status=status)

    tasks = query.order_by(Task.created_at.desc()).all()

    if search:
        tasks = [
            task for task in tasks
            if search in task.title.lower() or search in (task.description or "").lower()
        ]

    return jsonify([task.to_dict() for task in tasks]), 200


# POST /tasks (create task)
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
    status = data.get("status", "Pending").strip()
    priority = data.get("priority", "Medium").strip()

    if not title:
        return jsonify({"error": "Title is required"}), 400

    task = Task(
        title=title,
        description=description,
        due_date=due_date,
        status=status,
        priority=priority,
        user_id=current_user.id
    )

    db.session.add(task)
    db.session.commit()

    return jsonify({
        "message": "Task created successfully",
        "task": task.to_dict()
    }), 201


# PUT /tasks/<id> (update task)
@tasks_bp.route("/tasks/<int:task_id>", methods=["PUT"])
@limiter.limit("30 per minute")
def update_task(task_id):
    auth_error = require_auth()
    if auth_error:
        return auth_error

    task = Task.query.filter_by(id=task_id, user_id=current_user.id).first()

    if not task:
        return jsonify({"error": "Task not found"}), 404

    data = request.get_json() or {}

    task.title = data.get("title", task.title).strip()
    task.description = data.get("description", task.description or "").strip()
    task.due_date = data.get("due_date", task.due_date or "").strip()
    task.status = data.get("status", task.status).strip()
    task.priority = data.get("priority", task.priority).strip()

    db.session.commit()

    return jsonify({
        "message": "Task updated successfully",
        "task": task.to_dict()
    }), 200


# DELETE /tasks/<id>
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