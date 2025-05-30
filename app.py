from flask import Flask, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import os

from extensions import db
from models import User
from routes import create_routes

load_dotenv()  # Carrega variáveis do .env

app = Flask(__name__)
CORS(app)

DATABASE_URL = os.getenv('DATABASE_URL')
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL não encontrada no .env")

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
app.register_blueprint(create_routes(db))


@app.route('/')
def home():
    users = User.query.all()
    return render_template("users.html", users=users)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Cria tabelas no Supabase, se não existirem
    app.run(debug=True)
