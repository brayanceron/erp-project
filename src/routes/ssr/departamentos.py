from flask import Blueprint, request, render_template, redirect
import src.controllers.sucursal
import src.controllers.departamento
import src.controllers.usuario

import src.controllers.auth

departamento_router = Blueprint('departamento_router', __name__)

urls = {
    "url_pais": "/api/ubicacion/pais/get?filtrar=True",
    "url_ciudad": """/api/ubicacion/pais/get/${select_pais.value}/ciudades?filtrar=True"""
}

# --- AUTH MIDDLEWARE ---
@departamento_router.before_request
def before() :#{
    if (not (is_auth := src.controllers.auth.auth_ssr_middleware(request.endpoint))['auth']) : return redirect(is_auth['url']) 
#}


@departamento_router.route('/get')
def get() :#{ Endpoints que nunca se usaria
    keys_params = ['page', 'pagination_size'] 
    params = { k : v for k, v in request.args.items() if k in keys_params}    
    departamentos, status = src.controllers.departamento.get(**params)
    
    return render_template('departamento/get.html', departamentos = departamentos, session_data = src.controllers.auth.whoiam())
#}

@departamento_router.route('/get/<id>')
def get_id(id) :#{
    departamento, status = src.controllers.departamento.get_id(id)
    sucursal, status_suc = src.controllers.sucursal.get_id(departamento.get('id_sucursal'))

    if (status == 200 and status_suc == 200) :#{
        usuarios, status_usu = src.controllers.usuario.get_by_departamento(departamento.get('id'))
        if status_usu != 200 : usuarios = []
        return render_template("departamento/get_id.html", departamento = departamento, sucursal = sucursal, usuarios = usuarios, lenght = len(usuarios), session_data = src.controllers.auth.whoiam())
    #}
    else :#{
        error = departamento.get('message') or sucursal.get('message')
        return render_template("departamento/get_id.html", departamento = departamento, error = error, session_data = src.controllers.auth.whoiam())
    #}
#}

@departamento_router.route('/post/sucursal/<id_sucursal>')
@departamento_router.route('/post')
def post(id_sucursal = None) :#{
    empty_departamento = dict(request.args)
    error = request.args.get("error")
    
    # if not id_sucursal : return render_template("departamento/post.html",departamento = empty_departamento, error = error)
    sucursal, status = src.controllers.sucursal.get_id(id_sucursal)
    
    if status == 200 : return render_template("departamento/post.html", departamento = empty_departamento, sucursales = [sucursal], error = error, **urls, session_data = src.controllers.auth.whoiam())
    else : return render_template("departamento/post.html",departamento = empty_departamento, error = error, **urls, session_data = src.controllers.auth.whoiam())
#}

@departamento_router.route('/put/<id>')
def put(id) :#{
    departamento, status_dep = src.controllers.departamento.get_id(id)
    
    if (status_dep == 200) :#{
        error_put = request.args.get('error')
        sucursal_selected, status_suc = src.controllers.sucursal.get_id(departamento['id_sucursal'])
        return render_template("departamento/put.html", departamento = departamento, sucursales = [sucursal_selected], error = error_put, **urls, session_data = src.controllers.auth.whoiam())
    #}
    else :#{
        return render_template("departamento/put.html", departamento = {'id' : id}, error_get = True, error = departamento["message"], **urls, session_data = src.controllers.auth.whoiam())
    #}
#}


@departamento_router.route('/delete/<id>')
def delete(id) :#{
    # res, status = src.controllers.departamento.delete(id = id)
    res, status = src.controllers.departamento.delete(id)
    message = res['message']
    
    return render_template("departamento/delete.html", error = message, message = message, status = status, session_data = src.controllers.auth.whoiam())
#}



# -----------------------------------


@departamento_router.route('/post', methods = ['POST'])
def POST() :#{
    name = request.form.get('name')
    phone = request.form.get('phone')
    email = request.form.get('email')
    description = request.form.get('description')
    id_sucursal = request.form.get('id_sucursal')
    
    res, status = src.controllers.departamento.post(id_sucursal, name, phone, email, description)
    
    if status == 200 : return redirect(f"/ssr/departamento/get/{res["id"]}")
    else :#{
        data = f"error={res['message']}&name={name}&phone={phone}&email={email}&description={description}"
        return redirect(f"/ssr/departamento/post?{data}")
    #}
    
#}
@departamento_router.route('/put/<id>', methods = ['POST'])
def PUT(id) :#{
    name = request.form.get('name')
    phone = request.form.get('phone')
    email = request.form.get('email')
    description = request.form.get('description')
    id_sucursal = request.form.get('id_sucursal')
    
    res, status = src.controllers.departamento.put(id, id_sucursal, name, phone, email, description)
    
    if status == 200 : return redirect(f"/ssr/departamento/get/{id}")
    else : return redirect(f"/ssr/departamento/put/{id}?error={res.get('message')}")
#}
