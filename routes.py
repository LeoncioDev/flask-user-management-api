from flask import Blueprint, jsonify, request
from models import User
from datetime import datetime


def create_routes(db):
    bp = Blueprint('routes', __name__)

    @bp.route('/users', methods=['GET'])
    def get_users():
        users = User.query.all()
        return jsonify([{
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "function": u.function,
            "department": u.department,
            "start_date": u.start_date.strftime('%Y-%m-%d') if u.start_date else None,
            "phone": u.phone
        } for u in users])

    @bp.route('/users', methods=['POST'])
    def create_user():
        data = request.json
        try:
            start_date = datetime.strptime(
                data.get('start_date'), '%Y-%m-%d').date() if data.get('start_date') else None
            new_user = User(
                name=data['name'],
                email=data['email'],
                function=data.get('function'),
                department=data.get('department'),
                start_date=start_date,
                phone=data.get('phone')
            )
            db.session.add(new_user)
            db.session.commit()
            return jsonify({"message": "Usuário criado com sucesso"}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"message": str(e)}), 400

    @bp.route('/users/<int:user_id>', methods=['PUT'])
    def update_user(user_id):
        data = request.json
        user = User.query.get(user_id)
        if not user:
            return jsonify({"message": "Usuário não encontrado"}), 404
        try:
            user.name = data.get('name', user.name)
            user.email = data.get('email', user.email)
            user.function = data.get('function', user.function)
            user.department = data.get('department', user.department)
            if data.get('start_date'):
                user.start_date = datetime.strptime(
                    data['start_date'], '%Y-%m-%d').date()
            user.phone = data.get('phone', user.phone)
            db.session.commit()
            return jsonify({"message": "Usuário atualizado com sucesso"})
        except Exception as e:
            db.session.rollback()
            return jsonify({"message": str(e)}), 400

    @bp.route('/users/<int:user_id>', methods=['DELETE'])
    def delete_user(user_id):
        user = User.query.get(user_id)
        if not user:
            return jsonify({"message": "Usuário não encontrado"}), 404
        try:
            db.session.delete(user)
            db.session.commit()
            return jsonify({"message": "Usuário excluído com sucesso"})
        except Exception as e:
            db.session.rollback()
            return jsonify({"message": str(e)}), 400

    return bp
