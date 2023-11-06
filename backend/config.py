import os

class Config:
    SECRET_KEY = 'your_fallback_secret_key'

    # Use your own MongoDB host
    MONGODB_SETTINGS = {
         'db': 'EE461LProject',
         'host': 'mongodb+srv://ktong314:ktongpassword@cluster0.ivhdomk.mongodb.net/'
     }
        

    JWT_SECRET_KEY = 'your-secret-key'
    # MONGODB_SETTINGS = {
    #     'db': 'EE461LProject',
    #     'host': 'mongodb+srv://jiajuwang:WJj25127358@cluster0.q7f7ign.mongodb.net/'
    # }
