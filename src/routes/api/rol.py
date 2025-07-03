from flask import Blueprint, request;
import src.controllers.rol

rol_api_router = Blueprint('rol_router', __name__)

@rol_api_router.route('/')
def get() :#{
    return src.controllers.rol.get()
#}

@rol_api_router.route('/<id>')
def get_id(id) :#{
    return src.controllers.rol.get_id(id)
#}

@rol_api_router.route('/get/by/name/<name>')
def get_name(name) :#{
    return src.controllers.rol.get_name(name)
#}


@rol_api_router.route('/', methods = ['POST'])
def post() :#{
    data : dict = request.get_json()
    name = data.get('name')
    description = data.get('description')

    return src.controllers.rol.post(name, description)
#}

@rol_api_router.route('/<id>', methods = ['PUT'])
def put(id) :#{
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    
    return src.controllers.rol.put(id, name, description)
#}

@rol_api_router.route('<id>', methods = ['DELETE'])
def delete(id) :#{
    return src.controllers.rol.delete(id)
#}

