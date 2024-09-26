from src.database.database import get_connection
from src.utils.messages_errors import DB_CONNECTION_ERROR, ERROR_400, ERROR_500
import datetime

from uuid import uuid4


def get_id(id) :#{
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR
    
    if not id : return ERROR_400
    
    try :#{
        cursor = conn.cursor()
        cursor.execute('select id, names, surnames, birthdate, dni, gender, email, phone, role, password, country_birth, city_birth \
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
            "country_birth":row[10],
            "city_birth":row[11],
        }
        return usuario, 200
    #}
    except :#{
        print("error")
        return ERROR_500
    #}
#}


# def post(names, surnames, birthdate: str, dni, gender, email, phone, role, password, country_birth, city_birth) :#{
def post(names, surnames, birthdate, dni, gender, email, phone, role, password, country_birth, city_birth) :#{
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR
    
    if (not names or not surnames or not birthdate or not dni or not country_birth or not city_birth or not email
        or not phone or not role or not password or (gender not in ['F','M'])) :#{
                return ERROR_400
    #}
    
    
    try :#{
        id = uuid4()                                
        cursor = conn.cursor()
        cursor.execute("insert into usuario(id, names, surnames, birthdate, dni, gender, country_birth, city_birth, email, phone, role, password)"\
                    " values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",[id, names, surnames, birthdate, dni, gender, country_birth, city_birth, email, phone, role, password])
        conn.commit()
        conn.close()
        return {"message":"usuario registrado exitosamente", "id" : id}, 200
    #}
    # except Exception as err:#{
    except :#{
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
