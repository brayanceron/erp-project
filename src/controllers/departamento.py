from uuid import uuid4
from src.database.database import get_connection
from src.utils.messages_errors import DB_CONNECTION_ERROR, ERROR_400, ERROR_500
from src.controllers.sucursal import get_id as get_id_sucursal

def get(page = 0, pagination_size = 10) :#{  Endpoint que nunca se usaria
    if(not page or not pagination_size) : page = 0; pagination_size = 10;
    conn = get_connection()
    if (not conn) : return DB_CONNECTION_ERROR
    
    cursor = conn.cursor()
    pg = int(page)*int(pagination_size)
    cursor.execute("select * from departamento order by id_sucursal limit %s offset %s",[int(pagination_size), int(pg)])
    row_count = cursor.rowcount
    if (row_count == 0) :#{
        return {"message":"No hay sucursales registradas :("}, 404
    #}
    
    rows = cursor.fetchall()
    departamentos = []
    for row in rows :#{
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

def get_id(id) :#{
    conn = get_connection()
    if (not conn) : return DB_CONNECTION_ERROR
        
    try :#{
        cursor = conn.cursor()
        cursor.execute("select * from departamento where id = %s", [id])
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
    
    conn = get_connection()
    if (not conn) : return DB_CONNECTION_ERROR
    
    _, status = get_id_sucursal(id_sucursal)
    if status != 200 : return {"message" : "La sucursal a la cual se quiere registrar el departamento no fue encontrada :("}, 404
    
    try :#{
        id = uuid4()
        cursor = conn.cursor()
        cursor.execute('insert into departamento values(%s, %s, %s, %s, %s, %s)',[id, id_sucursal, name, phone, email, description])
        conn.commit()
        conn.close()
        return {"message" : "Departamento registrado exitosamente", "id": id }, 200
    #}
    except :#{
        return ERROR_500
    #}
#}

def put(id, id_sucursal, name, phone, email, description) :#{
    if (not id or not id_sucursal or not name or not phone or not email or not description) : return ERROR_400
    
    conn = get_connection()
    if (not conn) : return DB_CONNECTION_ERROR
    
    _, status = get_id_sucursal(id_sucursal)
    if (status != 200) : return {"message":"La sucursal a la cual se quiere cambiar el departamento no fue encontrada :("}, 404
    
    try :#{
        cursor = conn.cursor()
        cursor.execute("update departamento set id_sucursal = %s, name = %s, phone = %s, email = %s, description = %s where id = %s",[id_sucursal, name, phone, email, description, id])
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




def get_by_sucursal(id_sucursal) :#{
    if not id_sucursal : return ERROR_500
    
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR
    
    
    try :#{
        cursor = conn.cursor()
        cursor.execute("select * from departamento where id_sucursal = %s",[id_sucursal])
        rows = cursor.fetchall()
        departamentos = []
        for row in rows :#{
            
            departamentos.append({
                "id": row[0],
                "name": row[2]
            })
        #}
        # validar cuando la sucursal no tiene departamentos, error 404
        return departamentos, 200
        
    #}
    except :#{
        return ERROR_500
    #}
#}