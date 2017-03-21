## About
---
This is the code of a facial recognition  platform developed by the [DSG](http://dsg.teiste.gr/) team for [Beyond Hackathon 2017](https://www.beyondhackathon.com/en).

## Code
---
### [/mobile-app](https://github.com/stsourlidakis/beyondhackathon-2017/tree/master/mobile-app) 
A simple mobile app built with phonegap used instead of the security door's camera. The app takes a picture and then uses the [Microsoft Cognitive Services - Face API](https://www.microsoft.com/cognitive-services/en-us/face-api) to check for a known face, in case of a match it informs the backend.


### [/server](https://github.com/stsourlidakis/beyondhackathon-2017/tree/master/server)
A NodeJS(ExpressJS/Socket.io) server that connects the various parts of the system.

### [/app](https://github.com/stsourlidakis/beyondhackathon-2017/tree/master/app)
The clerk's web interface. Built with Bootstrap/jQuery and communicates with the server with socket.io

### [/client-mobile](https://github.com/stsourlidakis/beyondhackathon-2017/tree/master/client-mobile)
A dummy "mobile" app that demonstrates how the user would receive the greeting after a clerk presses the *serve* button on the webapp. The first page is a photo from Eurobank's mobile app that gets replaced after an available message.

## The DSG team
---
* [Barmpakos Dimitris](https://www.linkedin.com/in/dimitriosbarmpakos/)
* [Prantalos John](https://thatguy.gr/)
* [Tsourlidakis Stavros](https://stsourlidakis.com/)
