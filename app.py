from flask import Flask, jsonify, render_template
from config import Config
from extensions import db, bcrypt, login_manager, limiter
from routes.auth import auth_bp
from routes.tasks import tasks_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    limiter.init_app(app)

    login_manager.login_view = "auth.login"

    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(tasks_bp, url_prefix="/api")

    @app.route("/api-home")
    def api_home():
        return jsonify({"message": "Cloud Study Planner API is running"}), 200

    @app.route("/")
    def index_page():
        return render_template("index.html")

    @app.route("/login-page")
    def login_page():
        return render_template("login.html")

    @app.route("/register-page")
    def register_page():
        return render_template("register.html")

    @app.route("/dashboard")
    def dashboard_page():
        return render_template("dashboard.html")

    with app.app_context():
        db.create_all()

    return app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)