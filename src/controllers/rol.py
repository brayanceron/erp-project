from uuid import uuid4
from src.database.database import get_connection
from src.utils.messages_errors import DB_CONNECTION_ERROR, ERROR_500, ERROR_400

def get() :#{
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR

    try :#{
        cursor = conn.cursor()
        cursor.execute("select id, name, description from rol order by name")
        row_count = cursor.rowcount
        if(row_count == 0) : return {'message' : 'No hay roles registrados'}, 404
        rows = cursor.fetchall()
        roles : list = []
        
        for row in rows :#{
            roles.append({'id' : row[0], 'name' : row[1], 'description' : row[2]})
        #}
        conn.close()
        return roles, 200
    #}
    except Exception as err :#{
        print(err)
        return ERROR_500
    #}
#}

def get_id(id : str) :#{
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR

    try :#{
        cursor = conn.cursor()
        cursor.execute("select id, name, description from rol where id = %s", [id])
        row_count = cursor.rowcount
        if(row_count == 0) : return {'message' : 'Rol no encontrado'}, 404
        row = cursor.fetchone()
        
        rol = {'id' : row[0], 'name' : row[1], 'description' : row[2]}
        conn.close()
        return rol, 200
    #}
    except :#{
        return ERROR_500
    #}
#}

def get_name(name : str) :#{
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR

    try :#{
        cursor = conn.cursor()
        cursor.execute("select id, name, description from rol where name like(%s)", [f'%{name}%'])
        row_count = cursor.rowcount
        if(row_count == 0) : return {'message' : 'Rol no encontrado'}, 404
        row = cursor.fetchone()

        rol = {'id' : row[0], 'name' : row[1], 'description' : row[2]}
        conn.close()
        return rol, 200
    #}
    except :#{
        return ERROR_500
    #}
#}


def post(name : str, description : str) :#{
    if (not name or not description) : return ERROR_400

    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR

    try :#{
        id = uuid4()
        cursor = conn.cursor()
        cursor.execute('insert into rol values(%s, %s, %s)',[id, name, description])
        conn.commit()
        conn.close()
        return {'message' : "Rol registrado exitosamente", "id" : id }, 200
    #}
    except :#{
        return ERROR_500
    #}
#}

def put(id : str, name : str, description : str) :#{
    if (not id or not name or not description) : return ERROR_400

    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR

    try :#{
        cursor = conn.cursor()
        cursor.execute("update rol set name = %s, description = %s where id = %s", [name, description, id])
        row_count = cursor.rowcount
        if (row_count == 0) : return {'message' : "El rol a actualizar no fue encontrado"}, 404

        conn.commit()
        conn.close()

        return {'message' : "rol actualizado correctamente"}, 200
    #}
    except :#{
        return ERROR_500
    #}
#}

def delete(id) :#{
    if not id : return ERROR_400

    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR

    try :#{
        cursor = conn.cursor()
        cursor.execute("delete from rol where id = %s", [id])
        row_count = cursor.rowcount

        if (row_count == 0) : return {'message' : "El rol a eliminar no fue encontrado"}, 404

        conn.commit()
        conn.close()

        return {'message' : "Rol eliminado exitosamente"}, 200
    #}
    except :#{
        return ERROR_500
    #}
#}


def get_count() :#{
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR

    try :#{
        cursor = conn.cursor()
        cursor.execute("select rol.id, rol.name, rol.description, count(rol.id) from usuario join rol on usuario.role=rol.id group by rol.name")
        row_count = cursor.rowcount
        if(row_count == 0) : return {'message' : 'No hay roles registrados'}, 404
        rows = cursor.fetchall()
        roles : list = []
        
        for row in rows :#{
            roles.append({'id' : row[0], 'name' : row[1], 'description' : row[2], 'count' : row[3]})
        #}
        conn.close()
        return roles, 200
    #}
    except Exception as err :#{
        print(err)
        return ERROR_500
    #}
#}

"""
select rol.id, rol.name, sucursal.name, departamento.name, count(rol.id) 
from usuario join rol on usuario.role=rol.id join sucursal on usuario.id_sucursal = sucursal.id join departamento on usuario.id_departamento = departamento.id 
group by rol.name, sucursal.name, departamento.name;
"""