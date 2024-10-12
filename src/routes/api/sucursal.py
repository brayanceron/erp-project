from flask import Blueprint, request, jsonify
import src.controllers.sucursal


sucursal_api_router = Blueprint('sucursal_api_router', __name__)

@sucursal_api_router.route('/')
def get() :#{
    return src.controllers.sucursal.get()
#}

@sucursal_api_router.route('/<id>')
def get_id(id) :#{
    return src.controllers.sucursal.get_id(id)
#}

@sucursal_api_router.route('/', methods = ['POST'])
def post() :#{
    keys = ['name','city','country','address','description','phone']
    body = { k : v for k, v in request.get_json().items() if k in keys}
    return src.controllers.sucursal.post(**body)
#}

@sucursal_api_router.route('/<id>', methods = ['PUT'])
def put(id) :#{
    keys = ['name','city','country','address','description','phone']
    body = { k : v for k, v in request.get_json().items() if k in keys}
    return src.controllers.sucursal.put(id, **body)
#}

@sucursal_api_router.route('/<id>', methods = ['DELETE'])
def delete(id) :#{
    return src.controllers.sucursal.delete(id)
#}

# @sucursal_api_router.route('/get/<id>/')