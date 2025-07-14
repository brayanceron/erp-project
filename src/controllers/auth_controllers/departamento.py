from functools import wraps
import json
from flask import session
from src.utils.messages_errors import ERROR_403, ERROR_400
import src.controllers.departamento

ERROR_403_GET       = ({'message' : "No autorizado para ver todos departamentos"}, 403)
ERROR_403_GET_ID    = ({'message' : "No autorizado para ver este departamento"}, 403)
ERROR_403_POST      = ({'message' : "No autorizado para registrar departamentos en esta sucursal"}, 403)
ERROR_403_PUT       = ({'message' : "No autorizado para modificar este departamento"}, 403)
ERROR_403_DELETE    = ({'message' : "No autorizado para eliminar este departamento"}, 403)
ERROR_403_GET_BY_SUCURSAL = ({'message' : "No autorizado para ver los departamentos de esta sucursal"}, 403)


def auth_get() :#{
    """No autorizado para ver todos departamentos, no tiene sentido esta funcionalidad"""
    user_id = session.get('id')
    if (not user_id) : return ERROR_403
    if(True) : return ERROR_403_GET
#}

def auth_get_id(sucursal_id_of_departamento) :#{
    """solo si el usuario y el departamento pertenecen a la misma sucursal"""
    user_id = session.get('id')
    user_sucursal_id = session.get('id_sucursal')
    if (not user_id) : return ERROR_403
    
    if( user_sucursal_id != sucursal_id_of_departamento ) : return ERROR_403_GET_ID
#}

def auth_post(to_sucursal_id) :#{
    """solo si el usuario pertenece al departamento"""
    """solo si el usuario pertenece a la sucursal??????"""
    user_id = session.get('id')
    user_sucursal_id = session.get('id_sucursal')
    if (not user_id) : return ERROR_403
    
    if(not to_sucursal_id) : ERROR_400
    if( user_sucursal_id != to_sucursal_id ) : return ERROR_403_POST
#}

def auth_put(department_id) :#{
    """solo si el usuario pertenece al departamento"""
    user_id = session.get('id')
    user_department_id = session.get('id_departamento')
    
    if(not department_id or not user_department_id or not user_id) : return ERROR_400
    print(user_department_id)
    print(department_id)
    if(user_department_id != department_id) : return ERROR_403_PUT
#}

def auth_delete(department_id) :#{
    """solo si el usuario pertenece al departamento"""
    user_id = session.get('id')
    user_department_id = session.get('id_departamento')
    
    if(not department_id or not user_department_id or not user_id) : return ERROR_400
    if(user_department_id != department_id) : return ERROR_403_DELETE
#}

def auth_get_by_sucursal(id_sucursal) :#{
    user_id = session.get('id')
    user_sucursal_id = session.get('id_sucursal')
    # user_depto_id = session.get('id_departamento')
    if (not user_id) : return ERROR_403
    if( user_sucursal_id != id_sucursal ) : return ERROR_403_GET_BY_SUCURSAL
#}


# def auth_get_id_by_id(id : str) :#{
#     """solo si el usuario pertenece al departamento"""
#     user_id = session.get('id')
#     if (not user_id) : return ERROR_403
    
#     usuarios_of_dept_id, status = src.controllers.usuario.get_by_departamento(id)
#     if (status != 200) : return ERROR_403 # if (status != 200) : abort(res)
#     ids_usuarios = [ u['id'] for u in usuarios_of_dept_id ]
    
#     if( not (user_id in ids_usuarios)) : return ERROR_403 # if( not (user_id in ids_usuarios)) : abort(res)

#     return False
# #}