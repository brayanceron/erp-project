from flask import Blueprint, request
import src.controllers.ubicacion
from src.utils.messages_errors import ERROR_400, ERROR_415

ubicacion_router = Blueprint('ubicacion_router', __name__)

@ubicacion_router.route('/pais/get')
def get_paises() :#{
    filtrar = request.args.get('filtrar')
    
    if filtrar :  return src.controllers.ubicacion.get_paises_con_sucursales()
    else       :  return src.controllers.ubicacion.get_paises()
#}

# @ubicacion_router.route('/pais/sucursales/get')
# @ubicacion_router.route('/pais/get/paisesConSucursales')
# def get_paises_con_sucursales_route() :#{
#     # return get_paises()
#     return get_paises_con_sucursales()
# #}

@ubicacion_router.route("/pais/get/<id_pais>/ciudades")
def get_ciudades_de_pais(id_pais) :#{
    filtrar = request.args.get('filtrar')
    
    if filtrar : return src.controllers.ubicacion.get_ciudades_de_pais_con_sucursales(id_pais)
    else       : return src.controllers.ubicacion.get_ciudades_de_pais(id_pais)
#}

# @ubicacion_router.route("/pais/get/<id_pais>/ciudadesConSucursales")
# def get_ciudades_de_pais_con_sucursales_route(id_pais) :#{
#     # return get_ciudades_de_pais(id_pais)
#     return get_ciudades_de_pais_con_sucursales(id_pais)
# #}


@ubicacion_router.route('/ciudad/post', methods = ['POST'])
def post_city() :#{
    if not request.is_json: return ERROR_415
    body = None
    try :#{
        body = request.get_json() 
    #}
    except Exception as err :#{
        error : list = str(err).split(':') 
        return {"message" : error[1]}, 400
    #}
    if not body : return ERROR_400
    
    id_pais = body.get('id_pais') # or ""
    name_ciudad = body.get('name_ciudad') # or ""
    
    return src.controllers.ubicacion.post_city(id_pais, name_ciudad)
#}


