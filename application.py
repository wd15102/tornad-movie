from views import index
import config
import tornado.web
class Myapplication(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r'/',index.index),
        ]
        super().__init__(handlers,**config.settings)