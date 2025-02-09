from flask import Blueprint, request
import src.controllers.auth

auth_api_router = Blueprint('auth_api_router', __name__)

@auth_api_router.route('/login')
def login() :#{
    email = request.get_json().get("email")
    password = request.get_json().get("password")

    res, status = src.controllers.auth.login(email, password)
    return res, status
#}

@auth_api_router.route('/login', methods = ['POST'])
def login_post() :#{
    email = request.get_json().get("email")
    password = request.get_json().get("password")

    res, status = src.controllers.auth.login(email, password)
    return res, status
#}