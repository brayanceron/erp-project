from flask import Flask
from src.routes.ssr.sucursal import sucursal_router
from src.routes.ssr.departamentos import departamento_router
from src.routes.ssr.usuario import usuario_router
from src.routes.ssr.actividad import actividad_router

from src.routes.api.ubicacion import ubicacion_router
from src.routes.api.usuario import usuario_api_router
from src.routes.api.departamento import departamento_api_router
from src.routes.api.sucursal import sucursal_api_router
from src.routes.api.actividad import actividad_api_router

from src.routes.static import static_router


app = Flask(__name__)

# Routes SSR
app.register_blueprint(static_router, url_prefix = '/')
app.register_blueprint(sucursal_router, url_prefix = '/ssr/sucursal')
app.register_blueprint(departamento_router, url_prefix = '/ssr/departamento')
app.register_blueprint(usuario_router, url_prefix = '/ssr/usuario')
app.register_blueprint(actividad_router, url_prefix = '/ssr/actividad')

# app.register_blueprint(departamento_router, url_prefix = '/ssr/sucursal/<id_sucursal>/departamento')
app.register_blueprint(sucursal_api_router, url_prefix = '/api/sucursal')
app.register_blueprint(departamento_api_router, url_prefix = '/api/departamento')
app.register_blueprint(usuario_api_router, url_prefix = '/api/usuario')
app.register_blueprint(ubicacion_router, url_prefix = "/api/ubicacion")
app.register_blueprint(actividad_api_router, url_prefix = '/api/actividad')