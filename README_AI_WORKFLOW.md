# AI-Assisted Development Workflow

## Overview

This project incorporated selective use of AI-assisted development tools during parts of the software engineering workflow. AI tools were used as supporting development assistants for brainstorming, debugging, code refinement, deployment troubleshooting, and workflow optimization.

The project was still designed, implemented, tested, and validated through manual engineering decisions and iterative development processes.

---

## Areas Where AI Assistance Was Used

* Backend architecture planning
* Debugging Flask application issues
* AWS deployment troubleshooting
* GitHub Actions CI/CD workflow refinement
* Docker deployment optimization
* REST API implementation support
* Documentation improvements
* Cloud infrastructure troubleshooting

---

## Engineering Validation Process

AI-generated suggestions and code samples were manually:

* reviewed,
* tested,
* modified,
* and validated before integration into production workflows.

The development process emphasized understanding system behavior, debugging deployment issues, and maintaining engineering control over implementation decisions.

---

## Technologies Used

* Python
* Flask
* SQLAlchemy
* Docker
* AWS EC2
* Amazon ECR
* GitHub Actions
* AWS Systems Manager (SSM)
* REST APIs
* Linux/Ubuntu

---

## CI/CD and Cloud Automation

The project includes a fully automated CI/CD deployment pipeline using:

* GitHub Actions
* AWS OIDC authentication
* Docker containerization
* Amazon ECR
* EC2 automated deployments using AWS Systems Manager (SSM)

Each push to the master branch is automatically:

1. Builds a Docker image
2. Pushes the image to Amazon ECR
3. Deploys the updated container to AWS EC2

---

## Notes

AI assistance was used selectively as a productivity enhancement tool and not as a replacement for software engineering design, testing, debugging, or deployment validation.
