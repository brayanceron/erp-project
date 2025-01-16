from flask import Blueprint, request, redirect
import src.controllers.sucursal
import src.controllers.auth


sucursal_api_router = Blueprint('sucursal_api_router', __name__)
keys = ['name','city','country','address','description','phone']

# --- AUTH MIDDLEWARE ---
@sucursal_api_router.before_request
def before() :#{
    # if (not (is_auth := src.controllers.auth.auth_middleware(request.endpoint))['auth']) : return redirect(is_auth['url']) 
    # if (not (is_auth := src.controllers.auth.auth_middleware(request.endpoint))[0]['auth']) : return {'error' : "error en ..."} 
    if (not (is_auth := src.controllers.auth.auth_api_middleware(request.endpoint))[0]['auth']) : return is_auth[0], is_auth[1]
#}

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
    body : dict = { k : request.get_json().get(k) for k in keys } # body = { k : v for k, v in request.get_json().items() if k in keys}
    return src.controllers.sucursal.post(**body)
#}

@sucursal_api_router.route('/<id>', methods = ['PUT'])
def put(id) :#{
    body : dict = { k : request.get_json().get(k) for k in keys }
    return src.controllers.sucursal.put(id, **body)
#}

@sucursal_api_router.route('/<id>', methods = ['DELETE'])
def delete(id) :#{
    return src.controllers.sucursal.delete(id)
#}

# @sucursal_api_router.route('/get/<id>/')
@sucursal_api_router.route('/get/by/ubicacion/<country>')
@sucursal_api_router.route('/get/by/ubicacion/<country>/<city>')
def get_by_ubicacion(country, city = "") :#{
    return src.controllers.sucursal.get_by_ubicacion(country, city)
#}