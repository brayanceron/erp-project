from flask import Blueprint, request
import src.controllers.actividad

actividad_api_router = Blueprint('actividad_api_router', __name__)

@actividad_api_router.route('/')
def get() :#{
    return src.controllers.actividad.get()
#}

@actividad_api_router.route('/<id>')
def get_id(id) :#{
    return src.controllers.actividad.get_id(id)
#}


@actividad_api_router.route('/get_by_usuario_by_mes')
def get_by_usuario_by_mes() :#{
    keys_params = ['id_user', 'month'] 
    params : dict = { k : request.args.get(k) for k in keys_params } #todos
    if not params['month'] : del params['month']
    
    return src.controllers.actividad.get_by_usuario_by_mes(**params)
#}

@actividad_api_router.route('/get_by_usuario_by_dia')
def get_by_usuario_by_dia() :#{
    keys_params = ['id_user', 'date'] 
    params : dict = { k : request.args.get(k) for k in keys_params } #todos
    if not params['date'] : del params['date']
    
    # return src.controllers.actividad.get_by_usuario_by_dia('8fbb558a-0d76-40fa-84ee-316d5082f34c', '2024/10/25')
    return src.controllers.actividad.get_by_usuario_by_dia(**params)
#}

@actividad_api_router.route('/usuario/<id_user>/latest')
def get_latest_by_usuario(id_user) :#{
    return src.controllers.actividad.get_latest_by_usuario(id_user)
#}

