from flask import render_template, Blueprint, request, redirect
import src.controllers.departamento
import  src.controllers.sucursal

import src.controllers.auth

sucursal_router = Blueprint('sucursal_router', __name__)

# --- AUTH MIDDLEWARE ---
@sucursal_router.before_request
def before() :#{
    if (not (is_auth := src.controllers.auth.auth_ssr_middleware(request.endpoint))['auth']) : return redirect(is_auth['url']) 
#}


# SSR
@sucursal_router.route('/')
@sucursal_router.route('/get/by/continent/<continent>')
@sucursal_router.route('/get')
def get() :#{
    sucursales, status = src.controllers.sucursal.get()
    
    if (status == 200) :#{
        return render_template('sucursal/get.html',sucursales = sucursales, lenght = len(sucursales), session_data = src.controllers.auth.get_sesion_data())
    #}
    else :#{
        return render_template('sucursal/get.html', sucursales=[], error = sucursales["message"], lenght=0, session_data = src.controllers.auth.get_sesion_data())
    #}
#}

@sucursal_router.route('/get/<id>')
def get_id(id) :#{
    sucursal, status  = src.controllers.sucursal.get_id(id)
    if (status == 200) :#{
        departamentos, status_dep = src.controllers.departamento.get_by_sucursal(id) # ver cuando el estatus de esto no es 200
        # print(departamentos)
        return render_template('sucursal/get_id.html', sucursal = sucursal, departamentos = departamentos, lenght = len(departamentos), session_data = src.controllers.auth.get_sesion_data())
    #}
    elif (status == 404) :#{
        return render_template('sucursal/get_id.html', sucursales=[], error = sucursal["message"], lenght = 0, session_data = src.controllers.auth.get_sesion_data())
    #}
    else :#{
        return render_template('sucursal/get_id.html', sucursales=[], error = sucursal["message"], lenght = 0, session_data = src.controllers.auth.get_sesion_data())
    #}
#}

@sucursal_router.route('/post')
def post() :#{
    empty_sucursal = dict(request.args)
    error = request.args.get("error")
    
    # paises, _ = get_paises()
    # paises.insert(0, {"id" : "1", "name": "ARU"})
    # print(paises)
    # return render_template('sucursal/post.html', sucursal = empty_sucursal, error = error, paises = paises)
    # return render_template('sucursal/post.html', sucursal = empty_sucursal, error = error)    
    return render_template('sucursal/post.html', sucursal = empty_sucursal, error = error, ubicacion_config = {"id" : "01"}, session_data = src.controllers.auth.get_sesion_data())
#}

@sucursal_router.route('/put/<id>')
def put(id) :#{
    sucursal, status_suc  = src.controllers.sucursal.get_id(id)
    # print(sucursal)
    
    ubicacion_config = {
        "id" : "01",                
        "location_default" : {
            "country_name" : sucursal['country'],
            "country_id" : sucursal['country_id'],
            "city_name" : sucursal['city'],
            "city_id" : sucursal['city_id']
        }
    }
    
    if (status_suc == 200) :#{
        error_put = request.args.get("error")
        return render_template('sucursal/put.html', sucursal = sucursal, error_put = True if error_put else False, 
                                error = error_put, ubicacion = True, ubicacion_config = ubicacion_config, session_data = src.controllers.auth.get_sesion_data())
    #}
    else :#{
        return render_template('sucursal/put.html', sucursal = {'id' : id}, error_get_suc = True ,error = sucursal["message"], ubicacion_config = {"id" : "01"}, session_data = src.controllers.auth.get_sesion_data())
    #}
#}

@sucursal_router.route('/delete/<id>')
def delete(id) :#{
    res, status = src.controllers.sucursal.delete(id)
    message = res["message"]
    return render_template('sucursal/delete.html', message = message, error = message, status = status, session_data = src.controllers.auth.get_sesion_data())
    # return render_template('sucursal/delete.html', error = message, status = status)
#}

@sucursal_router.route('/search')
def search() :#{
    return render_template('sucursal/search.html', session_data = src.controllers.auth.get_sesion_data())
#}


# =================================================


@sucursal_router.route('/post', methods = ['POST'])
def POST() :#{
    name = request.form.get('name')
    country = request.form.get('country')
    city = request.form.get('city')
    address = request.form.get('address')
    phone = request.form.get('phone')
    description = request.form.get('description')

    res, status = src.controllers.sucursal.post(name, city, country, address, description, phone)
    
    if status == 200 : return redirect(f'/ssr/sucursal/get/{res['id']}')
    else :#{
        data = f"error={res['message']}&name={name}&country={country}&city={city}&address={address}&phone={phone}&description={description}"
        return redirect(f'/ssr/sucursal/post?{data}')
    #}    
#}

@sucursal_router.route('/put/<id>', methods = ['POST'])
def PUT(id) :#{
    # id = request.form.get('id')
    name = request.form.get('name')
    country = request.form.get('country')
    city = request.form.get('city')
    address = request.form.get('address')
    phone = request.form.get('phone')
    description = request.form.get('description')
    
    res, status = src.controllers.sucursal.put(id, name, city, country, address, description, phone)
    if (status == 200) :#{
        return redirect(f'/ssr/sucursal/get/{id}')
    #}
    else :#{
        return redirect(f'/ssr/sucursal/put/{id}?error={res.get('message')}')
    #}   
#}
