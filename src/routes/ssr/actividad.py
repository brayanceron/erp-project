from flask import Blueprint, request, render_template, redirect
import src.controllers.actividad

actividad_router = Blueprint('actividad_router', __name__)

@actividad_router.route('/get')
def get() :#{
    return render_template('/actividad/get.html')
#}

@actividad_router.route('/get/<id>')
def get_id(id) :#{
    return render_template("actividad/get_id.html", id = id)
#}


@actividad_router.route('/post')
def post() :#{
    error = request.args.get('error')
    id_user = "8fbb558a-0d76-40fa-84ee-316d5082f34c"
    return render_template('actividad/post.html', error = error, id_user = id_user)
#}


@actividad_router.route('/get/by/usuario/by/mes')
def get_by_usuario_by_mes() :#{
    id_user = "8fbb558a-0d76-40fa-84ee-316d5082f34c"
    # actividades, status = src.controllers.actividad.get_by_usuario_by_mes(id_user, month=10)
    return render_template("actividad/get_by_usuario_by_mes.html", id_user = id_user)
#}

@actividad_router.route('/get/by/usuario/by/date/')
def get_by_usuario_by_fecha() :#{
    id_user = "8fbb558a-0d76-40fa-84ee-316d5082f34c"
    date = request.args.get('date')
    
    return render_template('/actividad/get_by_usuario_by_fecha.html', id_user = id_user, date = date)
#}


# ===============================================
@actividad_router.route('/post', methods = ['POST'])
def post_actividad() :#{
    title = request.form.get('title')
    date = request.form.get('date')
    id_user = request.form.get('id_user')
    description = request.form.get('description')

    res, status = src.controllers.actividad.post(id_user, title, description)
    if(status == 200) : return redirect(f"/ssr/actividad/get/{res['id']}")
    # return res, status
    return "Ha habido un error", status
#}
