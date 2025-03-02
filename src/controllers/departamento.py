from uuid import uuid4
import src.controllers.usuario
import src.controllers.sucursal
from src.database.database import get_connection
import src.controllers.sucursal
from src.utils.messages_errors import DB_CONNECTION_ERROR, INVALID_PARAMS_PAG_ERROR, ERROR_400, ERROR_500
from src.utils.pagination import params_pagination_check

keys = ['id', 'id_sucursal', 'name', 'phone', 'email', 'description']
cols = str(keys).replace("'","").replace("[","").replace("]","")
values_cols = "%s, " * (len(keys) -1) + " %s"  

def get(page : int = 0, pagination_size : int = 10) :#{  Endpoint que nunca se usaria
    if (not params_pagination_check(page, pagination_size)) : return INVALID_PARAMS_PAG_ERROR 

    conn = get_connection()
    if (not conn) : return DB_CONNECTION_ERROR
    
    try :#{
        cursor = conn.cursor()
        pg = int(page)*int(pagination_size)

        cursor.execute(f"select {cols} from departamento \
                        order by id_sucursal limit %s offset %s", [int(pagination_size), int(pg)])
        
        row_count = cursor.rowcount
        if (row_count == 0) :#{
            return {"message":"No se encontraron departamentos :("}, 404
        #}
        
        rows = cursor.fetchall()
        departamentos = []
        for row in rows :#{
            # departamentos.append(dict(zip(keys,row)))
            departamentos.append({
                "id" : row[0],
                "id_sucursal" : row[1],
                "name" : row[2],
                "phone" : row[3],
                "email" : row[4],
                "description" : row[5],
            })
            
        #}
        conn.close()
        return departamentos, 200
    #}
    except Exception as err :#{
    # except :#{
        print(err)
        return ERROR_500
    #}
#}

def get_id(id) :#{
    conn = get_connection()
    if (not conn) : return DB_CONNECTION_ERROR
        
    try :#{
        cursor = conn.cursor()
        cursor.execute(f"select {cols} from departamento where id = %s", [id])
        row_counnt = cursor.rowcount
        result = cursor.fetchone()
        
        if row_counnt == 0 :#{
            return {"message":"Departamento no encontrado"}, 404
        #}
        
        departamento = {
            "id" : result[0],
            "id_sucursal" : result[1],
            "name" : result[2],
            "phone" : result[3],
            "email" : result[4],
            "description" : result[5]
        }
        
        conn.close()
        return departamento, 200
    #}
    except :#{
        return ERROR_500
    #}
#}

def post(id_sucursal, name, phone, email, description) :#{
    if (not id_sucursal or not name or not phone or not email or not description) : return ERROR_400
    # id = uuid4()
    
    # params = { k : v for k, v in locals().items() if k in keys} 
    # print(params)
    # return {"ok" : "ok"}, 200
    
    conn = get_connection()
    if (not conn) : return DB_CONNECTION_ERROR
    
    _, status = src.controllers.sucursal.get_id(id_sucursal)
    if status != 200 : return {"message" : "La sucursal a la cual se quiere registrar el departamento no fue encontrada :("}, 404
    
    try :#{
        cursor = conn.cursor()
        id = uuid4()
        cursor.execute(f"insert into departamento({cols}) values({values_cols})", [ id, id_sucursal, name, phone, email, description ])
        conn.commit()
        conn.close()
        return {"message" : "Departamento registrado exitosamente", "id": id }, 200
    #}
    except Exception as err :#{
    # except :#{
        print(err)
        return ERROR_500
    #}
#}

def put(id, id_sucursal, name, phone, email, description) :#{
    if (not id or not id_sucursal or not name or not phone or not email or not description) : return ERROR_400
    
    conn = get_connection()
    if (not conn) : return DB_CONNECTION_ERROR
    
    _, status = src.controllers.sucursal.get_id(id_sucursal)
    if (status != 200) : return {"message":"La sucursal a la cual se quiere actualizar el departamento no fue encontrada :("}, 404
    
    try :#{
        cursor = conn.cursor()
        cursor.execute("update departamento set id_sucursal = %s, name = %s, phone = %s, email = %s, description = %s where id = %s",[id_sucursal, name, phone, email, description, id])
        rowcount = cursor.rowcount
        if (rowcount == 0) : #{
            return { "message" : "Departamento a actualizar no encontrado" }, 404
        #}
        
        conn.commit()
        conn.close()
        
        return {"message" : "departamento actualizado exitosamente"}, 200
    #}
    except :#{
        return ERROR_500
    #}
#}

def delete(id) :#{
    conn = get_connection()
    if (not conn) : return DB_CONNECTION_ERROR

    try :#{
        cursor = conn.cursor()
        cursor.execute("delete from departamento where id = %s", [id])
        row_count = cursor.rowcount
        if (row_count == 0) :#{
            return {"message" : "Departamento no encontrado :("}, 404
        #}
        conn.commit()
        conn.close()
        
        return {"message" : "Departamento eliminado exitosamente"}, 200
    #}
    except :#{
        return ERROR_500
    #}
#}

# =================================================

def get_by_sucursal(id_sucursal) :#{
    conn = get_connection()
    if (not conn) : return DB_CONNECTION_ERROR;
    
    try :#{
        cursor = conn.cursor()
        # cursor.execute('select * from departamento where id_sucursal = %s', [id_sucursal])
        cursor.execute('select id, id_sucursal, name, phone, email, description from departamento where id_sucursal = %s', [id_sucursal])
        row_count = cursor.rowcount
        rows = cursor.fetchall()

        if (row_count == 0) :#{
            return {"message" : "No se encontraron departamentos para esta sucursal"}, 404
        #}

        departamentos = []
        for row in rows :#{
            departamentos.append({
                "id" : row[0],
                "id_sucursal" : row[1],
                "name" : row[2],
                "phone" : row[3],
                "email" : row[4],
                "description" : row[5]
            })
        #}
        return departamentos, 200
    #}
    # except Exception as err :#{
    except :#{
        # print(err)
        return ERROR_500;
    #}
#}

# def get_by_sucursal(id_sucursal) :#{
#     # if not id_sucursal : return ERROR_500
    
#     conn = get_connection()
#     if not conn : return DB_CONNECTION_ERROR
    
    
#     try :#{
#         cursor = conn.cursor()
#         # cursor.execute("select * from departamento where id_sucursal = %s",[id_sucursal])
#         cursor.execute("select id, name from departamento where id_sucursal = %s",[id_sucursal])
#         rowcount = cursor.rowcount
#         if rowcount == 0 : return {"message" : "No se encontraron departamentos para la sucursal especificada :("}, 404
#         rows = cursor.fetchall()
#         departamentos = []
#         for row in rows :#{            
#             departamentos.append({
#                 "id": row[0],
#                 "name": row[1]
#             })
#         #}
#         # validar cuando la sucursal no tiene departamentos, error 404
#         return departamentos, 200
        
#     #}
#     except :#{
#     # except Exception as err:#{
#         # print (err)
#         return ERROR_500
#     #}
# #}

def get_id_extended(id : str) :#{
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR

    try :#{
        deparamento, status_departamento = get_id(id)
        if status_departamento != 200 : return deparamento, status_departamento 

        sucursal, status_sucursal = src.controllers.sucursal.get_id(deparamento['id_sucursal'])
        if status_sucursal != 200 : sucursal = {}
        # if status_sucursal != 200 : return deparamento, 404

        deparamento['sucursal'] = sucursal

        usuarios, status_usuario = src.controllers.usuario.get_by_departamento(deparamento['id'])
        if status_usuario != 200 : usuarios = []

        deparamento['usuarios'] = usuarios

        return deparamento, 200
        
    #}
    except :#{
        return ERROR_500
    #}
    
#}

