from src.database.database import get_connection
from src.utils.messages_errors import DB_CONNECTION_ERROR
from src.utils.messages_errors import ERROR_500

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
    conn = get_connection()
    if (not conn) : return DB_CONNECTION_ERROR
    
    try :#{
        cursor = conn.cursor()
        cursor.execute("insert into ciudad(PaisCodigo, CiudadNombre, CiudadDistrito) values()",[id_pais, name_ciudad, name_ciudad]) 
        rowcount = cursor.rowcount
    
        return rowcount, 200
    #}
    except :#{
        return ERROR_500
    #}
#}

