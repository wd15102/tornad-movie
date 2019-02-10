import tornado.web
import tornado.ioloop
import config
from tornado.options import define
import tornado.httpserver
from application import Myapplication
# define('port',type=int,default=8888)

def main():
    app = Myapplication()
    httpserver = tornado.httpserver.HTTPServer(app)
    httpserver.listen(config.options.get("port"))
    httpserver.start()
    tornado.ioloop.IOLoop.current().start()

if __name__ =='__main__':
    main()