from src.app import app
from dotenv import load_dotenv
from src.config import config, PORT, DEBUG
from src.database.database import get_connection
from flask_cors import CORS

load_dotenv()

CORS(app)
# exit()
if __name__ == "__main__"  :#{
    
    # if not get_connection() :#{
    #     print("No se pudo conectar con la base de datos")
    #     exit()
    # #}
    
    app.run(debug=DEBUG, port=PORT)
    # app.config.from_object(config["development"])
#}