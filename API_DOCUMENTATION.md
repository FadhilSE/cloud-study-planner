# Cloud Study Planner API Documentation

This document describes the main API endpoints used by the Cloud Study Planner application. The API supports user authentication and task management features including creating, viewing, updating, deleting, filtering, and searching tasks.

Base URL for local development:

```text
http://127.0.0.1:5000
```

---

## Authentication Endpoints

### 1. Register User

**Method:** POST  
**Endpoint:** `/api/register`

**Request Body:**

```json
{
  "username": "student1",
  "email": "student1@example.com",
  "password": "123456"
}
```

**Success Response:**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "student1",
    "email": "student1@example.com"
  }
}
```

---

### 2. Login User

**Method:** POST  
**Endpoint:** `/api/login`

**Request Body:**

```json
{
  "email": "student1@example.com",
  "password": "123456"
}
```

**Success Response:**

```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "student1",
    "email": "student1@example.com"
  }
}
```

---

### 3. Logout User

**Method:** POST  
**Endpoint:** `/api/logout`

**Success Response:**

```json
{
  "message": "Logout successful"
}
```

---

### 4. Current User

**Method:** GET  
**Endpoint:** `/api/me`

**Success Response:**

```json
{
  "id": 1,
  "username": "student1",
  "email": "student1@example.com"
}
```

---

## Task Endpoints

### 5. Get All Tasks

**Method:** GET  
**Endpoint:** `/api/tasks`

**Description:** Retrieves all tasks for the currently logged-in user.

**Success Response:**

```json
[
  {
    "id": 1,
    "title": "Finish Cloud Report",
    "description": "Complete final project documentation",
    "due_date": "2026-05-10",
    "status": "Pending",
    "priority": "High",
    "created_at": "2026-05-04T12:00:00",
    "user_id": 1
  }
]
```

---

### 6. Filter Tasks by Status

**Method:** GET  
**Endpoint:** `/api/tasks?status=Pending`

Other supported filters:

```text
/api/tasks?status=In Progress
/api/tasks?status=Completed
/api/tasks?status=All
```

**Description:** Returns tasks filtered by their current status.

---

### 7. Search Tasks

**Method:** GET  
**Endpoint:** `/api/tasks?search=report`

**Description:** Searches tasks by title or description.

---

### 8. Create Task

**Method:** POST  
**Endpoint:** `/api/tasks`

**Request Body:**

```json
{
  "title": "Finish Cloud Report",
  "description": "Complete API documentation and deployment files",
  "due_date": "2026-05-10",
  "status": "Pending",
  "priority": "High"
}
```

**Success Response:**

```json
{
  "message": "Task created successfully",
  "task": {
    "id": 1,
    "title": "Finish Cloud Report",
    "description": "Complete API documentation and deployment files",
    "due_date": "2026-05-10",
    "status": "Pending",
    "priority": "High",
    "created_at": "2026-05-04T12:00:00",
    "user_id": 1
  }
}
```

---

### 9. Update Task

**Method:** PUT  
**Endpoint:** `/api/tasks/1`

**Request Body:**

```json
{
  "title": "Updated Cloud Report",
  "description": "Finalize documentation and screenshots",
  "due_date": "2026-05-12",
  "status": "In Progress",
  "priority": "Medium"
}
```

**Success Response:**

```json
{
  "message": "Task updated successfully",
  "task": {
    "id": 1,
    "title": "Updated Cloud Report",
    "description": "Finalize documentation and screenshots",
    "due_date": "2026-05-12",
    "status": "In Progress",
    "priority": "Medium",
    "created_at": "2026-05-04T12:00:00",
    "user_id": 1
  }
}
```

---

### 10. Delete Task

**Method:** DELETE  
**Endpoint:** `/api/tasks/1`

**Success Response:**

```json
{
  "message": "Task deleted successfully"
}
```

---

## Common Error Responses

### Unauthorized

```json
{
  "error": "Unauthorized"
}
```

### Missing Task Title

```json
{
  "error": "Title is required"
}
```

### Task Not Found

```json
{
  "error": "Task not found"
}
```

### Duplicate User

```json
{
  "error": "Username or email already exists"
}
```

---

## Postman Testing Plan

The API was tested using Postman with the following workflow:

1. Register a new user  
2. Log in with the registered email and password  
3. Create a task  
4. Retrieve all tasks  
5. Filter tasks by status  
6. Search tasks by keyword  
7. Update a task  
8. Delete a task  
9. Log out  

Postman must preserve cookies after login because the application uses session-based authentication.