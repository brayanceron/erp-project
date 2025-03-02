from flask import Blueprint, request
import src.controllers.departamento 
from src.controllers.departamento import keys

departamento_api_router = Blueprint("departamento_api_router", __name__)

@departamento_api_router.route('/')
def get() :#{
    keys_params = ['page', 'pagination_size'] 
    params = { k : v for k, v in request.args.items() if k in keys_params}    
    return src.controllers.departamento.get(**params)
#}

@departamento_api_router.route('/<id>')
def get_id(id) :#{
    extended = request.args.get('extended')
    if extended : return src.controllers.departamento.get_id_extended(id)
    return src.controllers.departamento.get_id(id)
#}

@departamento_api_router.route('/', methods = ['POST'])
def post() :#{
    body : dict = { k : request.get_json().get(k) for k in keys[1:] } # body = { k : v for k, v in request.get_json().items() if k in keys}
    return src.controllers.departamento.post(**body)
#}

@departamento_api_router.route('/<id>', methods = ['PUT'])
def put(id) :#{
    body : dict = { k : request.get_json().get(k) for k in keys[1:] }
    return src.controllers.departamento.put(id, **body)
#}

@departamento_api_router.route('/<id>', methods = ['DELETE'])
def delete(id) :#{
    return src.controllers.departamento.delete(id)
#}


@departamento_api_router.route("/get/by/sucursal/<id_sucursal>")
def get_by_sucursal(id_sucursal) :#{
    return src.controllers.departamento.get_by_sucursal(id_sucursal)
#}