from flask import session
from src.utils.messages_errors import ERROR_400

ERROR_403_PUT = ({'message' : 'No autorizado para modificar esta sucursal'}, 403)
ERROR_403_DELETE = ({'message' : 'No autorizado para eliminar esta sucursal'}, 403)

def auth_put(sucursal_id) :#{
    """solo si el usuario pertenece a la sucursal"""
    user_sucursal_id = session.get('id_sucursal')
    user_id = session.get('id')
    if(not sucursal_id or not user_sucursal_id) : return ERROR_400

    if(sucursal_id != user_sucursal_id) : return ERROR_403_PUT
#}

def auth_delete(sucursal_id : str) :#{
    """solo si el usuario pertenece a la sucursal"""
    user_sucursal_id = session.get('id_sucursal')
    user_id = session.get('id')

    if(not sucursal_id or not user_sucursal_id) : return ERROR_400
    if(sucursal_id != user_sucursal_id) : return ERROR_403_DELETE
#}
