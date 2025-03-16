from src.database.database import get_connection
from src.utils.messages_errors import DB_CONNECTION_ERROR, ERROR_400, ERROR_500
import src.controllers.ubicacion
import src.controllers.sucursal
import src.controllers.departamento
import datetime

from uuid import uuid4

def get() :#{
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR
    
    try :#{
        cursor = conn.cursor()
        cursor.execute("select names, surnames, birthdate, dni, gender, email, phone, role, password, entry_date, country_birth, city_birth, id_sucursal, id_departamento \
            from usuario")
        
        rowcount = cursor.rowcount
        if rowcount == 0 :#{
            return {"message" : "No se encontraron usuarios registrados :("}, 404
        #}

        usuarios = []
        rows = cursor.fetchall()
        for row in rows :#{
            usuarios.append({
                'names' : row[0],
                'surnames' : row[1],
                'birthdate' : row[2],
                'dni' : row[3],
                'gender' : row[4],
                'email' : row[5],
                'phone' : row[6],
                'role' : row[7],
                'password' : row[8],
                'entry_date' : row[9],
                'country_birth' : row[10],
                'city_birth' : row[11],
                'id_sucursal' : row[12],
                'id_departamento' : row[13],
            })
        #}
        conn.close()
        return usuarios, 200
    #}
    except Exception as err:#{
    # except :#{
        print(err)
        return ERROR_500
    #}
#}

def get_id(id) :#{
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR
    
    if not id : return ERROR_400
    
    try :#{
        cursor = conn.cursor()
        cursor.execute('select id, names, surnames, birthdate, dni, gender, email, phone, role, password, entry_date, country_birth, city_birth, id_sucursal, id_departamento \
                        from usuario where id = %s',[id])
        row = cursor.fetchone()
        # print(row)
        row_count = cursor.rowcount
        if row_count == 0 :#{
            return {"message":"Usuario no encontrado :("}, 404
        #}
        
        usuario = {
            "id":row[0],
            "names":row[1],
            "surnames":row[2],
            "birthdate":row[3],
            "dni":row[4],
            "gender":row[5],
            "email":row[6],
            "phone":row[7],
            "role":row[8],
            "password":row[9],
            "entry_date":row[10],
            "country_birth":row[11],
            "city_birth":row[12],
            "id_sucursal":row[13],
            "id_departamento":row[14]
        }
        return usuario, 200
    #}
    except :#{
        # print("error")
        return ERROR_500
    #}
#}

def post(names, surnames, birthdate, dni, gender, email, phone, role, password, country_birth, city_birth, id_sucursal, id_departamento) :#{
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR
    
    if (not names or not surnames or not birthdate or not dni or not country_birth or not city_birth or not email
        or not phone or not role or not password or (gender not in ['F','M']) or not id_sucursal or not id_departamento) :#{
                return ERROR_400
    #}
    
    try :#{
        id = uuid4()                                
        cursor = conn.cursor()
        cursor.execute("insert into usuario(id, names, surnames, birthdate, dni, gender, country_birth, city_birth, email, phone, role, password, id_sucursal, id_departamento)"
                    " values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",[id, names, surnames, birthdate, dni, gender, country_birth, city_birth, email, phone, role, password, id_sucursal, id_departamento])
        conn.commit()
        conn.close()
        return {"message":"usuario registrado exitosamente", "id" : id}, 200
    #}
    except Exception as err :#{
    # except :#{
        # print("err")
        print(err)
        return ERROR_500
    #}       
#}

def get_by_departamento(id_departamento) :#{
    conn = get_connection()
    if not conn: return DB_CONNECTION_ERROR
    
    try :#{
        cursor = conn.cursor()
        cursor.execute('select id, names, surnames, birthdate, dni, gender, email, phone, role, password, country_birth, city_birth \
                        from usuario where id_departamento = %s',[id_departamento])
        
        rows = cursor.fetchall()

        rowcount = cursor.rowcount
        if rowcount == 0 :#{
            return {'message' : 'No se encontraron usuarios registrados para este departamento'}, 404
        #}
        
        usuarios = []

        for row in rows :#{
            usuarios.append({
                "id":row[0],
                "names":row[1],
                "surnames":row[2],
                "birthdate":row[3],
                "dni":row[4],
                "gender":row[5],
                "email":row[6],
                "phone":row[7],
                "role":row[8],
                "password":row[9],
                "country_birth":row[10],
                "city_birth":row[11],
            })
        #}
        return usuarios, 200
    #}
    # except :#{
    except Exception as err :#{
        # print(err)
        return ERROR_500
    #}
#}


def search(names = None, dni = None, email = None) :#{
    # filtros = {"name":"ana", "surnames":"perez"}
    
    if (not names and not dni and not email) : return ERROR_400

    filtros = {
        "names" : names,
        "dni" : dni,
        "email" : email
    }
    
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR
        
    
    try :#{
        cursor = conn.cursor()

        # cursor.execute("select * from usuario where %s", filtros)
        if names : cursor.execute("select distinct id, names, surnames, birthdate, dni, gender, email, phone, role, password, country_birth, city_birth from usuario where names like(%s) or surnames like(%s)", ['%'+names+'%', '%'+names+'%'])
        elif dni : cursor.execute("select distinct id, names, surnames, birthdate, dni, gender, email, phone, role, password, country_birth, city_birth from usuario where dni like(%s)", ['%'+dni+'%'])
        elif email : cursor.execute("select distinct id, names, surnames, birthdate, dni, gender, email, phone, role, password, country_birth, city_birth from usuario where email like(%s)", ['%'+email+'%'])
        
        
        row_count = cursor.rowcount
        if row_count == 0 :#{
            return {"message":"Usuario no encontrado :("}, 404
        #}
        
        rows = cursor.fetchall()
        usuarios = []
        for row in rows :#{
            # print(row)
            usuarios.append({
            "id":row[0],
            "names":row[1],
            "surnames":row[2],
            "birthdate":row[3],
            "dni":row[4],
            "gender":row[5],
            "email":row[6],
            "phone":row[7],
            "role":row[8],
            "password":row[9],
            "country_birth":row[10],
            "city_birth":row[11],
        })
        #}
        return usuarios, 200
        # return "ok", 200    
    #}
    # except :#{
    except Exception as err:#{
        print(err)
        return "error"
    #}
#}


def get_by_email(email) :#{
    conn = get_connection()
    if (not conn) : return DB_CONNECTION_ERROR
    
    try :#{
        cursor = conn.cursor()
        cursor.execute('select names, surnames, birthdate, dni, gender, email, phone, role, password, country_birth, city_birth, id_sucursal, id_departamento, id from usuario where email = %s limit 1', [email])
        row = cursor.fetchone()
        usuario = {
            "names" : row[0],
            "surnames" : row[1],
            "birthdate" : row[2],
            "dni" : row[3],
            "gender" : row[4],
            "email" : row[5],
            "phone" : row[6],
            "role" : row[7],
            "password" : row[8],
            "country_birth" : row[9],
            "city_birth" : row[10],
            "id_sucursal" : row[11],
            "id_departamento" : row[12],
            "id" : row[13]
        }
        return usuario, 200
    #}
    except :#{
        return ERROR_500
    #}
#}


def get_id_extended(id : str) :#{
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR

    try :#{
        # cursor = conn.cursor()

        usuario, status = get_id(id)
        if status != 200 : return  usuario, status

        country_birth, _ = src.controllers.ubicacion.get_pais_id(usuario['country_birth'])
        city_birth, _ = src.controllers.ubicacion.get_ciudad_id(usuario['city_birth'])

        sucursal_user, _ = src.controllers.sucursal.get_id(usuario['id_sucursal'])
        departamento_user, _ = src.controllers.departamento.get_id(usuario['id_departamento'])

        usuario = { 
            **usuario,
            "id_country_birth" : country_birth['id'],
            "name_country_birth" : country_birth['name'],

            "id_city_birth" : city_birth['id'],
            "name_city_birth" : city_birth['name'],

            "name_sucursal" : sucursal_user['name'],
            "id_country_sucursal" : sucursal_user['country_id'],
            "name_country_sucursal" : sucursal_user['country'],
            "id_city_sucursal" : sucursal_user['city_id'],
            "name_city_sucursal" : sucursal_user['city'],
            "address_sucursal" : sucursal_user['address'],
            "phone_sucursal" : sucursal_user['phone'],

            "name_departamento" : departamento_user['name'],
            "phone_departamento" : departamento_user['phone'],
            "email_departamento" : departamento_user['email'],
            "phone_departamento" : departamento_user['phone'],
            
        }
        return usuario, 200
    #}
    except Exception as err :#{
        print(err)
        return ERROR_500
    #}
#}