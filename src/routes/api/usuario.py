from flask import Blueprint, request
import src.controllers.usuario

usuario_api_router = Blueprint("usuario_api_router", __name__)


@usuario_api_router.route('/search')
def search() :#{
    names = request.args.get('names')
    dni = request.args.get('dni')
    email = request.args.get('email')

    print(names, dni, email)

    return src.controllers.usuario.search(names, dni, email)
    # return {"message" : "api usuarios ok"}, 200
#}


