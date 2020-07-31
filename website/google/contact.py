import webapp2
from google.appengine.api import mail

class ContactFormHandler(webapp2.RequestHandler):

  def get(self):
        self.redirect("http://www.ermakova.ca/")

  def post(self):

        userName = self.request.get("name")
        userEmail = self.request.get("email")
        userMessage = self.request.get("message")

        message = mail.EmailMessage()
        message.sender = "Ermakova.ca Contact <ermakova.nadejda@gmail.com>"
        message.to = "Nadezhda Ermakova <ermakova.nadejda@gmail.com>"

        message.subject = "Ermakova.ca Contact Request"
        message.body = """

Contact Form:

Name:	%s
Email:	%s

%s

        """ % (userName, userEmail, userMessage)

        message.send()

        self.response.headers['Access-Control-Allow-Origin'] = 'http://www.ermakova.ca'
#        self.redirect("index.html")


app = webapp2.WSGIApplication([('/contact.do', ContactFormHandler)])