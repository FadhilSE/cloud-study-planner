# Cloud Study Planner

Cloud Study Planner is a full-stack web application designed to help students organize and manage their academic tasks in one place. The system allows users to register, log in securely, and manage personal study tasks through a clean dashboard interface.

![Python](https://img.shields.io/badge/Python-3.11-blue)![Flask](https://img.shields.io/badge/Flask-Web%20Framework-black)![Docker](https://img.shields.io/badge/Docker-Containerized-blue)![AWS EC2](https://img.shields.io/badge/AWS-EC2-orange)![CI](https://img.shields.io/badge/CI-GitHub%20Actions-green)![Status](https://img.shields.io/badge/Status-Deployed-success)


## 🌐 Live Application

http://3.134.89.182:5000

## ✨Features

- User registration and secure login
- Personal dashboard for task management
- Full task CRUD: create, view, update, and delete
- Task status tracking: Pending, In Progress, Completed
- Priority levels: Low, Medium, High
- Search and filter tasks
- Due-date warning labels: Overdue, Due Today, Upcoming
- Session-based authentication
- Password hashing for security
- Rate limiting for API protection
- Responsive frontend interface
- GitHub version control collaboration
- Docker containerization
- AWS EC2 deployment (live public URL)

## 🛠️Technologies Used

### Backend
- Python
- Flask
- Flask-SQLAlchemy
- Flask-Login
- Flask-Bcrypt
- Flask-Limiter

### Frontend
- HTML
- CSS
- JavaScript

### Database
- SQLite (development)
- AWS-ready architecture (production)

### DevOps / Tools
- Git
- GitHub
- PyCharm
- Docker
- AWS EC2
- GitHub Actions (CI/CD)

## 📁Project Structure

cloud-study-planner/
│── app.py # Application entry point
│── config.py # Configuration settings
│── models.py # Database models (User, Task)
│── extensions.py # Flask extensions initialization
│── requirements.txt # Python dependencies
│── Dockerfile # Docker configuration
│── .github/workflows/ # CI/CD pipeline (GitHub Actions)
│
├── routes/
│ ├── auth.py # Authentication routes
│ └── tasks.py # Task management API
│
├── templates/ # HTML templates
├── static/ # CSS, JavaScript files

## 🚀Deployment

The application is deployed on AWS EC2 using Docker.

Steps:
1. Build Docker image
2. Run container on port 5000
3. Configure the EC2 security group to allow traffic on port 5000
4. Access via public IPv4 address

Public URL:
http://3.134.89.182:5000

## 📌Current Progress

- Backend API completed
- Authentication system completed
- Dashboard UI completed
- Full task CRUD functionality working
- Task editing, filtering, search, priority, and due-date warning features added
- GitHub Actions CI/CD workflow completed
- Docker containerization completed
- AWS EC2 deployment completed (public URL available)
- API documentation completed
- GitHub repository active

## 📘API Documentation

Full API documentation is available in:

API_DOCUMENTATION.md


## 🔮Future Improvements

- Advanced task analytics and productivity charts
- Dark mode UI
- Email notifications and reminders
- Multi-user collaboration (shared tasks)
- Migration to AWS RDS for production database
- HTTPS deployment with a custom domain

## 👥Team Collaboration

This project was developed collaboratively using GitHub version control with divided responsibilities across backend development, frontend UI, testing, and deployment preparation.

## Author

Developed by Fadhil Al Salihi and Thomas Stone
