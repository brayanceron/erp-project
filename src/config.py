import os

PORT = os.environ.get('PORT')
DEBUG = True
DB_HOST = os.environ.get('DB_HOST')
DB_USER = os.environ.get('DB_USER')
DB_PASSWORD = os.environ.get('DB_PASSWORD')
DB_NAME = os.environ.get('DB_NAME')
DB_PORT = os.environ.get('DB_PORT')

class Development_config :#{
    # PORT = os.environ.get('PORT')
    DEBUG = DEBUG
    DB_HOST = DB_HOST
    DB_USER = DB_USER
    DB_PASSWORD = DB_PASSWORD
    DB_NAME = DB_NAME
#}
config = {
    "development": Development_config
}