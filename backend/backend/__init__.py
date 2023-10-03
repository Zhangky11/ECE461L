from flask import Flask
# from config import Config
from flask_cors import CORS
def create_app():
    app = Flask(__name__)
    CORS(app) # 这会允许所有来源的请求，不推荐在生产中使用
    # app.config.from_object(Config)

    from backend.auth.routes import auth
    from backend.api.routes import api

    app.register_blueprint(auth, url_prefix='/auth')
    app.register_blueprint(api, url_prefix='/api')

    return app
