from flask import session
from src.utils.messages_errors import ERROR_400, ERROR_403

ERROR_403_GET_ID = ({'message' : "No autorizado para ver esta(s) actividad(es)"}, 403)
ERROR_403_POST = ({'message' : "No autorizado para registrar esta actividad"}, 403)

def auth_get() :#{
    user_id = session.get('id')
    if (not user_id) : return ERROR_403
    return ERROR_403_GET_ID
#}

def auth_get_id(user_id_of_activity : str) :#{
    """Solo si el id del usuario duenio de la actividad es el mismo que el del usuario logeado"""
    logged_user_id = session.get('id')
    if(not user_id_of_activity or not logged_user_id) : return ERROR_400
    if(logged_user_id != user_id_of_activity) : return ERROR_403_GET_ID
#}

def auth_post(user_id_owner_of_new_activity : str) :#{
    logged_user_id = session.get('id')
    if(logged_user_id != user_id_owner_of_new_activity) : return
#}
