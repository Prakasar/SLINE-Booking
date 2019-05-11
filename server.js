
const express = require('express'),
path = require('path'),
bodyParser = require('body-parser');

const auth_api = require('./router/authentication/api');
const booking_api = require('./router/Controller/api');

const app = express();
var cors = require('cors');
app.use(express.static(path.join(__dirname, 'public')));
app.use('', express.static(__dirname + '/Images'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ extended: true,limit:'50mb' }));

app.use(function(req, res, next) {
res.setHeader("Access-Control-Allow-Origin", "*"); 
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//res.setHeader('charset', 'utf-8')
next();
});



var http = require('http');  
http.createServer(function(req, res) {  
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write('<!doctype html>\n<html lang="en">\n' + 
    '\n<meta name="google-site-verification" content="s6BtPAoM1-qDQ-eTHb_XVVhfvS_NvfOJ1uoSnlLYuUs" />\n<title>Test web page on node.js</title>\n' + 
    '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' + 
    '\n\n<h1>Euro 2012 teams</h1>\n' + 
    '<div id="content"><p>The teams in Group D for Euro 2012 are:</p><ul><li>England</li><li>France</li><li>Sweden</li><li>Ukraine</li></ul></div>' + 
    '\n\n');
  res.end();
}).listen('polar-badlands-67489.herokuapp.com');
console.log('Server running at http://127.0.0.1:8888');
//app.use(express.static(path.join(__dirname, 'dist')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


app.use('/api/auth',auth_api);
app.use('/api/doctor_booking/',booking_api);

const port = process.env.PORT || 8080;


const server = app.listen(port, function(){
console.log('Listening on port ' + port);
});