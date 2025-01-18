from src.database.database import get_connection
from src.utils.messages_errors import DB_CONNECTION_ERROR
from src.utils.messages_errors import ERROR_500, ERROR_400

def get_paises() : #{
    conn = get_connection()
    if (not conn) : return DB_CONNECTION_ERROR

    try :#{
        cursor = conn.cursor()
        # cursor.execute("select * from pais")
        cursor.execute("select PaisCodigo, PaisNombre from pais")
        rows = cursor.fetchall()
        
        row_count = cursor.rowcount
        if row_count == 0 : return {"message" : "No se encontraron paises registrados"}, 404
        
        paises = []
        for row in rows :#{
            paises.append({"id" : row[0], "name" : row[1] })
        #}
        return paises, 200
    #}
    except :#{
        return ERROR_500
    #}
#}

def get_paises_con_sucursales() : #{
    conn = get_connection()
    if (not conn) : return DB_CONNECTION_ERROR

    try :#{
        cursor = conn.cursor()
        cursor.execute("select distinct pais.PaisCodigo, pais.PaisNombre from pais join sucursal on (pais.PaisCodigo = sucursal.country)")
        rows = cursor.fetchall()
        
        row_count = cursor.rowcount
        if row_count == 0 : return {"message" : "No se encontraron paises que tengan sucursales registradas"}, 404
        
        paises = []
        for row in rows :#{
            # paises.append({"id" : row[0], "name" : row[1] })
            paises.append({"id" : row[0], "name" : row[1] })
        #}
        return paises, 200
    #}
    # except :#{
    except Exception as err :#{
        # print("ERROR 500")
        # print("ERROR 500")
        print(err)
        return ERROR_500
    #}
#}

def get_ciudades_de_pais(id_pais) :#{
    conn = get_connection()
    if (not conn) : return DB_CONNECTION_ERROR
    
    try :#{
        cursor = conn.cursor()
        # cursor.execute("select * from ciudad where PaisCodigo = %s order by CiudadNombre", [id_pais])
        cursor.execute("select CiudadID, CiudadNombre from ciudad where PaisCodigo = %s order by CiudadNombre", [id_pais])
        rows = cursor.fetchall()
        
        row_count = cursor.rowcount
        if row_count == 0 : return {"message" : "No se encontraron ciudades para el pais especificado"}, 404
        
        ciudades = []
        for row in rows :#{
            ciudades.append({"id" : row[0], "name" : row[1] })
        #}
        return ciudades, 200
    #}
    except :#{
        return ERROR_500
    #}
#}

def get_ciudades_de_pais_con_sucursales(id_pais) :#{
    conn = get_connection()
    if (not conn) : return DB_CONNECTION_ERROR
    
    try :#{
        cursor = conn.cursor()
        # cursor.execute("select * from ciudad where PaisCodigo = %s order by CiudadNombre", [id_pais])
        cursor.execute("select distinct ciudad.CiudadID, ciudad.CiudadNombre  from ciudad join sucursal \
                        on (ciudad.CiudadID = sucursal.city) where country = %s order by CiudadNombre",[id_pais])
                        # on (ciudad.CiudadNombre = sucursal.city) where country = %s order by CiudadNombre",[id_pais])
        rows = cursor.fetchall()
        
        row_count = cursor.rowcount
        if (row_count == 0) : return {"message" : "No se encontraron ciudades que tengan sucursales registradas"}, 404
        
        ciudades = []
        for row in rows :#{
            ciudades.append({"id" : row[0], "name" : row[1] })
        #}
        print (id_pais, ciudades)
        return ciudades, 200
    #}
    # except :#{
    except Exception as err :#{
        print(err)
        return ERROR_500
    #}
#}

def post_city(id_pais, name_ciudad) :#{
    if(not id_pais or not name_ciudad) : return ERROR_400
    
    conn = get_connection()
    if (not conn) : return DB_CONNECTION_ERROR

    try :#{
        cursor = conn.cursor()
        
        cursor.execute('select count(*) from ciudad')
        id = int(cursor.fetchone()[0]) + 1

        cursor.execute("insert into ciudad(CiudadID, CiudadNombre, PaisCodigo) values(%s, %s, %s)",[id, name_ciudad, id_pais]) 
        # rowcount = cursor.rowcount

        conn.commit()
        conn.close()
        
        return {"message" : "Ciudad registrada exitosamente"}, 200
    #}
    except Exception as err :#{
    # except :#{
        # print(err)
        return ERROR_500
    #}
#}

def get_continentes() :#{
    conn = get_connection()
    if (not conn) : return DB_CONNECTION_ERROR
    try :#{
        cursor = conn.cursor()
        cursor.execute('select distinct PaisContinente from pais')
        rows = cursor.fetchall()
        continens = []
        for row in rows :#{
            continens.append(row[0])
        #}
        # return { "continents" : list(rows)}, 200
        return { "continents" : continens}, 200
    #}
    except :#{
        return ERROR_500
    #}
    
#}

def get_continentes_con_sucursales() :#{
    conn = get_connection()
    if (not conn) : return DB_CONNECTION_ERROR
    try :#{
        cursor = conn.cursor()
        # cursor.execute('select distinct PaisContinente from pais')
        cursor.execute('select distinct PaisContinente from sucursal join pais on country=PaisCodigo')
        rows = cursor.fetchall()
        
        row_count = cursor.rowcount
        if (row_count == 0) : return {"message" : "No se encontraron continentes que tengan sucursales registradas"}, 404

        continens = []
        for row in rows :#{
            continens.append(row[0])
        #}
        return { "continents" : continens}, 200
    #}
    except Exception as err :#{
        print(err)
        return ERROR_500
    #}
    
#}

def get_paises_by_continent(nombre_continente) :#{
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR
    
    try :#{
        cursor = conn.cursor()
        cursor.execute('select PaisCodigo, PaisNombre from pais where PaisContinente = %s', [nombre_continente])
        rows = cursor.fetchall()
        paises = []
        for row in rows :#{
            paises.append({"id" : row[0], "name" : row[1]})
        #}
        # return list(rows),200
        return paises, 200
    #}
    except :#{
        return ERROR_500
    #}
    
#}

def get_paises_by_continent_con_sucursales(nombre_continente) :#{
    conn = get_connection()
    if not conn : return DB_CONNECTION_ERROR
    
    try :#{
        cursor = conn.cursor()
        cursor.execute('select distinct PaisCodigo, PaisNombre from sucursal join pais on country = PaisCodigo where PaisContinente = %s', [nombre_continente])
        rows = cursor.fetchall()
        
        row_count = cursor.rowcount
        if (row_count == 0) : return {"message" : "No se encontraron paises para ese continente que tengan sucursales registradas"}, 400
        
        paises = []
        for row in rows :#{
            paises.append({"id" : row[0], "name" : row[1]})
        #}

        # return list(rows),200
        return paises, 200
    #}
    except :#{
        return ERROR_500
    #}
    
#}

