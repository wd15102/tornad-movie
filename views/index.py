import tornado.web
class index(tornado.web.RequestHandler):
    def get(self, *args, **kwargs):
        # self.write('hello')
        self.render(template_name='index_1.html')
    def post(self, *args, **kwargs):
        self.write('post')