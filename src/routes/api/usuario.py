from flask import Blueprint, request
import src.controllers.usuario
from src.utils.messages_errors import ERROR_400

usuario_api_router = Blueprint("usuario_api_router", __name__)
keys = ['names', 'surnames', 'birthdate', 'dni', 'gender', 'email', 'phone', 'role', 'password', 'country_birth', 'city_birth', 'id_sucursal', 'id_departamento']

@usuario_api_router.route('/')
def get() :#{
    return src.controllers.usuario.get()
#}

@usuario_api_router.route('/<id>') # @usuario_api_router.route('/get/<id>')
def get_id(id) :#{
    extended = request.args.get('extended')
    if extended : return src.controllers.usuario.get_id_extended(id)
    return src.controllers.usuario.get_id(id)
#}

@usuario_api_router.route('/', methods=['POST'])
def post() :#{
    body : dict = { k : request.get_json().get(k) for k in keys }
    return src.controllers.usuario.post(**body)
#}


@usuario_api_router.route('/search')
def search() :#{
    names = request.args.get('names')
    dni = request.args.get('dni')
    email = request.args.get('email')

    return src.controllers.usuario.search(names, dni, email)
#}

@usuario_api_router.route('/get/by/departamento/<id_departamento>')
def get_by_departamento_route(id_departamento) :#{
    return src.controllers.usuario.get_by_departamento(id_departamento)
#}


