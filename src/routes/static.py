from flask import Blueprint, render_template

static_router = Blueprint('static_router', __name__)

@static_router.route('/')
def index() :#{
    return "<h1>Welcome CRM Project</h1>"
#}

@static_router.route("/ssr/home")
def home() :#{
    return "include('partials/navbar.html')<h1>Seccion de noticias de la empresa</h1>"
    # return render_template("<h1>Seccion de noticias de la empresa</h1>")
#}


@static_router.route("/lab")
def lab() :#{
    return render_template("lab.html")
#}

@static_router.route("/error/403")
def error_403() :#{
    return render_template("partials/error403.html")
#}

