import webapp2

class MainPage(webapp2.RequestHandler):
  def get(self):
    self.redirect("http://www.ermakova.ca/")

app = webapp2.WSGIApplication([('/', MainPage)])

