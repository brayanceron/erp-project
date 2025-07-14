from flask import session, abort, Response
import src.controllers.usuario
import hashlib
import json

def login(email : str, password : str) :#{
    if (not email or not password) : return {"message" : "Debe propocionar todos los datos"}, 400
    password_hash = hashlib.sha256(password.encode()).hexdigest()
    
    # VALIDATE USER AND PASSWORD    
    user, status = src.controllers.usuario.get_by_email(email)
    if status != 200 : return {"message" : "Usuario o contraseña invalidos"}, 400 #404 # User not found
    if (user.get('password') != str(password_hash)) : return {"message" : "Usuario o contraseña invalidos"}, 400 #403 #Password invalid
    
    # CREATING SESSION
    session['id'] = user.get('id')
    session['email'] = user.get('email')
    session['names'] = user.get('names')
    session['surnames'] = user.get('surnames')
    session['role'] = user.get('role')
    session['id_sucursal'] = user.get('id_sucursal')
    session['id_departamento'] = user.get('id_departamento')

    session['logged'] = True
    
    # session.
    return {"message" : "Inicio de sesion exitoso", "session" : session}, 200
#}

def logout() :#{
    session.clear()
    return {"message" : "Cierre de sesion exitoso", "session" : session}, 200
#}


def is_logged() :#{
    AUTH_ERROR = ({"message" : "Debe iniciar sesion"}, 403)

    if (not session) : return AUTH_ERROR;
    if (session.get('logged')) : return {"message": "Acceso permitido"}, 200
    return AUTH_ERROR;
#}

def is_allow(url : str, auth_urls : list) :#{
    if(url in auth_urls) : return {"message": "Acceso permitido"}, 200
    return {"message" : "Acceso denegado a esta url"}, 403
#}

def whoiam() :#{
    if not session : return {"message" : "No session", "result" : [] }, 404
    return  dict(session)
    # if (session.get('logged')) : return  dict(session), 200
    # return {"message" : "Debe iniciar sesion"}, 403
#}

BASIC_URLS = [
    # ".get",
    "get",
    "get_id",
    "post",
    "put",
    "delete",
]

AUTH_SSR_BASIC_URLS = [
    *BASIC_URLS,
    "POST",
    "PUT",
]

urls_dict = {
    # ----SSR
    "sucursal_router" : [
        *AUTH_SSR_BASIC_URLS,
        f"search",
    ],
    "departamento_router" : AUTH_SSR_BASIC_URLS,
    "actividad_router" : [
        # f"put",
        # f"delete",
        *AUTH_SSR_BASIC_URLS,
        f"get_by_usuario_by_mes",
        f"get_by_usuario_by_fecha",
        # f"PUT",
    ],
    "usuario_router" : [
        # f"put",
        *AUTH_SSR_BASIC_URLS,
        f"search",
        # f"PUT",
    ],
    
    # ----API

    "sucursal_api_router" : [
        *BASIC_URLS,
        "get_by_ubicacion",
        "sucursalstatistics"
    ]
}


def auth_ssr_middleware(endpoint) :#{
    res, status = is_logged()
    if (status != 200) : return  {'url' : f'/ssr/auth/login?error={res.get('message')}', 'auth' : False} # Error 401 requiere autenticacion
    
    router, path = endpoint.split('.') # 403 No autirazado
    if (path not in urls_dict[router]) : return  { 'url' : '/error/403', 'auth' : False}
    return {'auth' : True}
#}

def auth_api_middleware() :#{
    error, status = is_logged()
    res = Response(json.dumps(error), status, content_type='application/json')
    if (status != 200) : return  abort(res);
#}

# suc_ssr_prefix = "sucursal_router" #f"{sucursal_router=}".split('=')[0] # 
# dep_ssr_prefix = "departamento_router" #f"{departamento_router=}".split('=')[0] # 
# act_ssr_prefix = "actividad_router" #f"{actividad_router=}".split('=')[0] # 
# usr_ssr_prefix = "usuario_router" #f"{usuario_router=}".split('=')[0] 



# email = session.get('email')
# password = session.get('password')
