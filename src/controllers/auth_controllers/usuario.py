from flask import session
from src.utils.messages_errors import ERROR_400

ERROR_403_PUT = ({'message' : "No autorizado para modificar este usuario"}, 403)

def auth_put(user_id) :#{
    id_logged_user = session.get('id')
    if(not id_logged_user or not user_id) : return ERROR_400
    if(id_logged_user != user_id) : return ERROR_403_PUT
#}
