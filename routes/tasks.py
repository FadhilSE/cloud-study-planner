from flask import Blueprint, request, jsonify
from flask_login import current_user
from extensions import db, limiter
from models import Task

tasks_bp = Blueprint("tasks", __name__)

<<<<<<< HEAD
# Helper function to ensure user is authenticated before accessing tasks
=======
>>>>>>> ac87004a469b93976befbc5054771a30ce2ee785
def require_auth():
    if not current_user.is_authenticated:
        return jsonify({"error": "Unauthorized"}), 401
    return None

<<<<<<< HEAD
# GET /tasks
# Test Case: Retrieve all tasks for the logged-in user
# Supports filtering by status and searching by title/description
=======

>>>>>>> ac87004a469b93976befbc5054771a30ce2ee785
@tasks_bp.route("/tasks", methods=["GET"])
def get_tasks():
    auth_error = require_auth()
    if auth_error:
        return auth_error

<<<<<<< HEAD
    status = request.args.get("status")
    search = request.args.get("search", "").strip().lower()

    # Base query: get tasks belonging to current user
    query = Task.query.filter_by(user_id=current_user.id)

    # Test Case: Filter tasks by status (Pending, In Progress, Completed)
    if status and status != "All":
        query = query.filter_by(status=status)

    # Retrieve tasks ordered by newest first
    tasks = query.order_by(Task.created_at.desc()).all()

    # Test Case: Search tasks by title or description
    if search:
        tasks = [
            task for task in tasks
            if search in task.title.lower() or search in (task.description or "").lower()
        ]

    return jsonify([task.to_dict() for task in tasks]), 200

# POST /tasks
# Test Case: Create a new task with title, description, due date, status, and priority
=======
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


>>>>>>> ac87004a469b93976befbc5054771a30ce2ee785
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
<<<<<<< HEAD
    status = data.get("status", "Pending").strip()
    priority = data.get("priority", "Medium").strip()

    # Test Case: Validate title is required
    if not title:
        return jsonify({"error": "Title is required"}), 400

    # Create and save new task
=======
    status = data.get("status", "pending").strip()

    if not title:
        return jsonify({"error": "Title is required"}), 400

>>>>>>> ac87004a469b93976befbc5054771a30ce2ee785
    task = Task(
        title=title,
        description=description,
        due_date=due_date,
        status=status,
<<<<<<< HEAD
        priority=priority,
=======
>>>>>>> ac87004a469b93976befbc5054771a30ce2ee785
        user_id=current_user.id
    )

    db.session.add(task)
    db.session.commit()

    return jsonify({
        "message": "Task created successfully",
        "task": task.to_dict()
    }), 201

<<<<<<< HEAD
# PUT /tasks/<id>
# Test Case: Update an existing task (edit title, description, due date, status, priority)
@tasks_bp.route("/tasks/<int:task_id>", methods=["PUT"])
@limiter.limit("30 per minute")
def update_task(task_id):
    auth_error = require_auth()
    if auth_error:
        return auth_error

    # Find task belonging to current user
    task = Task.query.filter_by(id=task_id, user_id=current_user.id).first()

    # Test Case: Task not found
    if not task:
        return jsonify({"error": "Task not found"}), 404

    data = request.get_json() or {}

    # Update task fields (only if provided)
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
# Test Case: Delete a task belonging to the logged-in user
=======

>>>>>>> ac87004a469b93976befbc5054771a30ce2ee785
@tasks_bp.route("/tasks/<int:task_id>", methods=["DELETE"])
@limiter.limit("20 per minute")
def delete_task(task_id):
    auth_error = require_auth()
    if auth_error:
        return auth_error

<<<<<<< HEAD
    # Find task for current user
    task = Task.query.filter_by(id=task_id, user_id=current_user.id).first(

    # Test Case: Task not found
    if not task:
        return jsonify({"error": "Task not found"}), 404

    # Delete task
=======
    task = Task.query.filter_by(id=task_id, user_id=current_user.id).first()
    if not task:
        return jsonify({"error": "Task not found"}), 404

>>>>>>> ac87004a469b93976befbc5054771a30ce2ee785
    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted successfully"}), 200