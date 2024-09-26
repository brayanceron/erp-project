from flask import Blueprint

static_router = Blueprint('static_router', __name__)

@static_router.route('/')
def index() :#{
    return "<h1>Welcome CRM Project</h1>"
#}
