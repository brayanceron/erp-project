from flask import Blueprint, render_template, request, redirect
import src.controllers.departamento
import src.controllers.sucursal
import src.controllers.ubicacion
import src.controllers.usuario
import src.controllers.auth

usuario_router = Blueprint('usuario_router', __name__)

# --- AUTH MIDDLEWARE ---
# @usuario_router.before_request
# def before() :#{
#     if (not (is_auth := src.controllers.auth.auth_middleware(request.endpoint))['auth']) : return redirect(is_auth['url']) 
# #}




@usuario_router.route('/')
@usuario_router.route('/get')
def get() :#{
    return render_template("usuario/get.html", session_data = src.controllers.auth.whoiam())
#}

@usuario_router.route('/get/<id>')
def get_id(id) :#{
    usuario, status =src.controllers.usuario.get_id(id)

    if status == 200 :#{
        sucursal, _ = src.controllers.sucursal.get_id(usuario['id_sucursal'])
        departamento, _ = src.controllers.departamento.get_id(usuario['id_departamento'])
    
        pais_nacimiento, _ = src.controllers.ubicacion.get_pais_id(usuario['country_birth'])
        ciudad_nacimiento,_  = src.controllers.ubicacion.get_ciudad_id(usuario['city_birth'])
        return render_template("usuario/get_id.html",
                            usuario = usuario,
                            pais_nacimiento = pais_nacimiento.get('name', 'No registra'),
                            ciudad_nacimiento = ciudad_nacimiento.get('name', 'No registra'),
                            sucursal = sucursal,
                            departamento = departamento,
                            session_data = src.controllers.auth.whoiam()
                        )
    #}
    else :#{
        return render_template("usuario/get_id.html", error = usuario["message"], session_data = src.controllers.auth.whoiam())
    #}
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
    return render_template("usuario/post.html", **urls, session_data = src.controllers.auth.whoiam())
#}

@usuario_router.route('/search')
def search() :#{
    return render_template("usuario/search.html", session_data = src.controllers.auth.whoiam())
#}


# ------------------------------------------

@usuario_router.route('/post', methods = ['POST'])
def POST() :#{
    # print(request.form)

    names = request.form.get('names')
    surnames = request.form.get('surnames')
    birthdate = request.form.get('birthdate')
    dni = request.form.get('dni')
    gender = request.form.get('gender')
    email = request.form.get('email')
    phone = request.form.get('phone')
    role = request.form.get('role')
    password = request.form.get('password')
    country = request.form.get('country')
    city = request.form.get('city')
    
    id_sucursal = request.form.get('id_sucursal')
    id_departamento = request.form.get('id_departamento')

    print(names, surnames, birthdate, dni, gender, email, phone, role, password, country, city, id_sucursal, id_departamento)

    # return "registrando"

    res, status= src.controllers.usuario.post(names, surnames, birthdate, dni, gender, email, phone, role, password, 
                                                country, city, id_sucursal, id_departamento)
    print (status)
    if status == 200 : return redirect(f'/ssr/usuario/get/{res['id']}')
    # return "registrando usuario"
    return "Hubo un error"
#}
