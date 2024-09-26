from flask import Blueprint
from src.controllers.departamento import get_by_sucursal

departamento_api_router = Blueprint("departamento_api_router", __name__)

@departamento_api_router.route("/get/by/sucursal/<id_sucursal>")
def function(id_sucursal) :#{
    departamentos, status = get_by_sucursal(id_sucursal)
    # print(departamentos)
    return departamentos, status
    # return "ok"
#}