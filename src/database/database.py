import pymysql.cursors
from src.config import DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT


def get_connection() :#{
    try :#{
        return pymysql.connect(
                            host=DB_HOST,
                            password=DB_PASSWORD,
                            port=int(DB_PORT),
                            user=DB_USER,
                            database=DB_NAME
                            )
    #}
    except :#{
        return None
    #}
#}
