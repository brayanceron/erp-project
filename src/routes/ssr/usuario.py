from flask import Blueprint, render_template, request
import src.controllers.usuario

usuario_router = Blueprint('usuario_router', __name__)

@usuario_router.route('/')
@usuario_router.route('/get')
def get() :#{
    return render_template("usuario/get.html")
#}

@usuario_router.route('/get/<id>')
def get_id(id) :#{
    # return src.controllers.usuario.get_id(id)
    usuario, status =src.controllers.usuario.get_id(id)
    return render_template("usuario/get_id.html", usuario = usuario)
    # return "getting user", 200
#}


@usuario_router.route('/post')
def post() :#{
    urls = {
        "url_pais": "/api/ubicacion/pais/get?filtrar=True",
        # "url_pais": "/api/ubicacion/pais/get",
        "url_ciudad": """/api/ubicacion/pais/get/${select_pais.value}/ciudades?filtrar=True""",
        # "url_ciudad": """/api/ubicacion/pais/get/${select_pais.value}/ciudades""",
        # "url_pais_n": "/api/ubicacion/pais/get?filtrar=True",
        # "url_ciudad_n": """/api/ubicacion/pais/get/${select_pais.value}/ciudades?filtrar=True"""
    }
    return render_template("usuario/post.html", **urls)
#}

@usuario_router.route('/search')
def search() :#{
    return render_template("usuario/search.html")
#}


# ------------------------------------------

@usuario_router.route('/post', methods = ['POST'])
def post_usuario() :#{
    print(request.form)

    names = request.form.get('names')
    surnames = request.form.get('surnames')
    birthdate = request.form.get('birthdate')
    dni = request.form.get('dni')
    gender = request.form.get('gender')
    country = request.form.get('country')
    city = request.form.get('city')
    email = request.form.get('email')
    phone = request.form.get('phone')
    role = request.form.get('role')
    password = request.form.get('password')

    # return src.controllers.usuario.post(names, surnames, birthdate, dni, gender, email, phone, role, password, country_birth=country, city_birth=city)
    return "registrando usuario"
#}
