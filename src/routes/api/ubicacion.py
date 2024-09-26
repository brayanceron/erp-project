from flask import Blueprint, request
from src.controllers.ubicacion import get_paises, get_paises_con_sucursales, get_ciudades_de_pais, get_ciudades_de_pais_con_sucursales, post_city

ubicacion_router = Blueprint('ubicacion_router', __name__)

@ubicacion_router.route('/pais/get')
def get_paises_route() :#{
    filtrar = request.args.get('filtrar')
    
    if filtrar :  return get_paises_con_sucursales()
    else : return get_paises()
#}

# @ubicacion_router.route('/pais/sucursales/get')
# @ubicacion_router.route('/pais/get/paisesConSucursales')
# def get_paises_con_sucursales_route() :#{
#     # return get_paises()
#     return get_paises_con_sucursales()
# #}

@ubicacion_router.route("/pais/get/<id_pais>/ciudades")
def get_ciudades_de_pais_route(id_pais) :#{
    filtrar = request.args.get('filtrar')
    if filtrar : return get_ciudades_de_pais_con_sucursales(id_pais)
    else : return get_ciudades_de_pais(id_pais)
#}

# @ubicacion_router.route("/pais/get/<id_pais>/ciudadesConSucursales")
# def get_ciudades_de_pais_con_sucursales_route(id_pais) :#{
#     # return get_ciudades_de_pais(id_pais)
#     return get_ciudades_de_pais_con_sucursales(id_pais)
# #}


@ubicacion_router.route('/ciudad/post', methods = ['POST'])
def post_city_route() :#{
    id_pais = request.form.get('id_pais')
    name_ciudad = request.form.get('name_ciudad')
    
    res, status = post_city(id_pais, name_ciudad)    
#}


