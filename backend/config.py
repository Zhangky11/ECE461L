import os

class Config:
    SECRET_KEY = 'your_fallback_secret_key'
    #SECRET_KEY = os.environ.get('SECRET_KEY')

    #MONGODB_SETTINGS = {
        #'db': 'EE461LProject',
        #'host': "mongodb+srv://zhangky03:CMH4lvBpn7CnC5SX@cluster0.rx7pay3.mongodb.net/"
    #}
    
    MONGODB_SETTINGS = {
         'db': 'EE461LProject',
        'host': 'mongodb+srv://jiajuwang:WJj25127358@cluster0.q7f7ign.mongodb.net/'
     }