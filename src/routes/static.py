from flask import Blueprint, render_template

static_router = Blueprint('static_router', __name__)

@static_router.route('/')
def index() :#{
    return "<h1>Welcome CRM Project</h1>"
#}

@static_router.route("/lab")
def lab() :#{
    return render_template("lab.html")
#}
