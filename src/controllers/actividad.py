from src.database.database import get_connection
from src.utils.messages_errors import DB_CONNECTION_ERROR, ERROR_400, ERROR_500, INVALID_PARAMS_PAG_ERROR
from src.utils.pagination import params_pagination_check
import src.controllers.usuario

from uuid import uuid4
import datetime

# date_time = datetime

def get(page : int = 0, pagination_sie : int = 10) :#{
    if (not params_pagination_check(page, pagination_sie)) : return INVALID_PARAMS_PAG_ERROR
    
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR

    try :#{
        cursor = conn.cursor()
        cursor.execute('select id, id_user, date, title, description from actividad')
        rowcount = cursor.rowcount
        if rowcount == 0 :#{
            return {"message":"No hay actividades registradas :("}, 404
        #}
        rows = cursor.fetchall()
        actividades = []
        for row in rows :#{
            actividades.append({
                "id" : row[0],
                "id_user" : row[1],
                "date" : row[2].strftime('%Y/%m/%d'),
                "time" : row[2].strftime('%H:%M:%S'),
                "title" : row[3],
                "description" : row[4]
            })
        #}
        conn.close()
        return actividades, 200
    #}
    except :#{
        return ERROR_500
    #}
#}

def get_id(id) :#{ Esto es solamente para ver la informacion de una unica tarea
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR
    
    try :#{
        cursor = conn.cursor()
        cursor.execute('select id, id_user, date, title, description from actividad where id = %s', [id])
        rowcount = cursor.rowcount
        row = cursor.fetchone()
        if (rowcount == 0) :#{
            return {"message":"Actividad no encontrada"}, 404
        #}
        actividad = {
            'id':row[0],
            'id_user':row[1],
            "date" : row[2].strftime('%Y/%m/%d'),
            "time" : row[2].strftime('%H:%M:%S'),
            'title':row[3],
            'description' : row[4]
        }
        return actividad, 200
    #}
    except :#{
        return ERROR_500
    #}
#}


def post(id_user, title, description) :#{
    if (not id_user or not title or not description) : return ERROR_400
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR
    
    try :#{
        id = uuid4()
        date = datetime.datetime.now()
        cursor = conn.cursor()
        cursor.execute("insert into actividad(id, id_user, date, title, description) values (%s, %s, %s, %s, %s)", [id, id_user, date, title, description])
        conn.commit()
        conn.close()
        return {"message" : "actividad registrada exitosamente", "id" : id}, 200
    #}
    except Exception as err :#{
    # except :#{
        print(err)
        return ERROR_500
    #}    
#}


# ===========================================

def get_by_usuario_by_mes(id_user : str, month : str = str(datetime.datetime.now().month), year : str = str(datetime.datetime.now().year)) :#{ Esto es para ver todas las tareas de un empleado en un mes(vista calendario)
    if (not id_user or not month) : return ERROR_400
    if not str(month).isnumeric() : return INVALID_PARAMS_PAG_ERROR
    if not str(year).isnumeric() : return INVALID_PARAMS_PAG_ERROR
    if not (1 <= int(month) <= 12) : return INVALID_PARAMS_PAG_ERROR
    # if()
    # generate_empty_activities(id_user)
    
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR

    # year = str(datetime.datetime.now().year)
    # year = "2024"
    fecha = f"{year}/{month}/"
    # print(year)
    try :#{
        cursor = conn.cursor()
        cursor.execute("select id, id_user, date, title, description from actividad where id_user = %s and (actividad.date >= %s and actividad.date <= %s) order by actividad.date",[id_user, f"{fecha}01", f"{fecha}31"])
        rows = cursor.fetchall()
        rowcount = cursor.rowcount
        if rowcount == 0 :#{
            return {"message":"Actividades no encontradas para el usuario en ese mes"}, 404
        #}
        
        actividades = []
        
        for row in rows :#{
            actividades.append({
                "id": row[0],
                "id_user": row[1],
                "date":row[2].strftime('%Y/%m/%d'),
                "time": row[2].strftime('%H:%M:%S'),
                "title":row[3],
                "description":row[4]
            })
        #}
        # print(actividades)
        conn.close()
        return actividades, 200
    #}
    except :#{
        return ERROR_500
    #}
#}

def get_by_usuario_by_fecha(id_user : str, date : str = str(datetime.datetime.now().strftime("%Y-%m-%d"))) :#{ Esto es para ver todas las tareas hechas por un empleado en un solo dia
    if (not id_user or not date) : return ERROR_400
    # print(date)
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR

    date = f"%{date.replace('/','-')}%"
    try :#{
        cursor = conn.cursor()
        cursor.execute("select id, id_user, date, title, description from actividad where date like %s and id_user = %s order by date",[ date, id_user])
        rows = cursor.fetchall()
        rowcount = cursor.rowcount
        if rowcount == 0 :#{
            return {"message":"Actividades no encontradas para el usuario en esa fecha"}, 404
        #}
        actividades = []
        
        for row in rows :#{
            actividades.append({
                "id": row[0],
                "id_user": row[1],
                "date":row[2].strftime('%Y/%m/%d'),
                "time": row[2].strftime('%H:%M:%S'),
                "title":row[3],
                "description":row[4]
            })
        #}
        # print(actividades)
        conn.close()
        return actividades, 200
    #}
    except Exception as err:#{
    # except :#{
        print(err)
        return ERROR_500
    #}
#}

def get_latest_by_usuario(id_user : str) :#{
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR
    
    try :#{
        cursor = conn.cursor()
        cursor.execute('select date from actividad where id_user = %s order by actividad.date desc limit 1',[id_user])
        if (cursor.rowcount == 0) :#{
            return {"message":"No hay actividades registradas para ese usuario :("}, 404
        #}
        last_date = cursor.fetchone()[0]

        cursor.execute('select id, id_user, date, title, description from actividad where id_user = %s and actividad.date >= %s order by date desc',
                        [id_user, f"{last_date.year}-{last_date.month}-{last_date.day}"])
        # rowcount = cursor.rowcount
        rows = cursor.fetchall()
        if (cursor.rowcount == 0) :#{
            return {"message":"No hay actividades registradas para ese usuario :("}, 404
        #}
        
        actividades = []
        
        for row in rows :#{
            actividades.append({
                'id':row[0], 
                'id_user':row[1], 
                'date':row[2], 
                'title':row[3], 
                'description':row[4]
            })
        #}
        
        
        return actividades, 200
    #}
    except Exception as err :#{
    # except :#{
        print(err)
        return ERROR_500
    #}
#}


def generate_empty_activities(id_user : str) :#{
    # print("----------------", id_user)
    # delete from actividad where title = 'null' and description = 'null'
    last_activity = None
    activities, status_act = get_latest_by_usuario(id_user)
    # print(status_act)

    if status_act == 200 : last_activity = activities[0]['date'].date()
    elif status_act == 404 : #{
        user_date, status_user = src.controllers.usuario.get_id(id_user)
        if status_user != 200 : return ERROR_500
        last_activity = user_date['entry_date'].date() - datetime.timedelta(days=1)         # last_activity = user_date['entry_date'].date()
    #}
    else : return activities, status_act
    
    
    days_dif = (datetime.datetime.now().date() - last_activity).days
    if( days_dif > 0) :#{
        try :#{
            count_date = 1
            new_date = last_activity
            while (count_date < days_dif) :#{
                new_date = new_date + datetime.timedelta(days=1)
                post_set_date(id_user,'null','null',new_date)
                count_date += 1
            #}
        #}
        except :#{
            return ERROR_500
        #}
        
    #}
    elif(days_dif < 0) : return ERROR_500
#}

def post_set_date(id_user, title, description, date = datetime.datetime.now()) :#{
    if (not id_user or not title or not description) : return ERROR_400
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR
    
    try :#{
        id = uuid4()
        cursor = conn.cursor()
        cursor.execute("insert into actividad(id, id_user, date, title, description) values (%s, %s, %s, %s, %s)", [id, id_user, date, title, description])
        conn.commit()
        conn.close()
        return {"message" : "actividad registrada exitosamente", "id" : id}, 200
    #}
    except Exception as err :#{
    # except :#{
        print(err)
        return ERROR_500
    #}    
#}