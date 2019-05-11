
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