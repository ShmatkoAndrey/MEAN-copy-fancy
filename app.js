var express = require('express'), server,  app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var fs = require('fs');
var config = require('./config')();
var db = require('./db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/client'));

app.use(cookieParser());
app.use(session({
    secret: 'qsczseasdxswewq',
    resave: false,
    saveUninitialized: true
}));

fs.readdirSync('./controllers').forEach(function (file) {
    if(file.substr(-3) == '.js') {
        require('./controllers/' + file)(app);
    }
});

app.get('/*', function(req, res) {
        res
        .set( { 'content-type': 'text/html; charset=utf-8' } )
        .sendFile(__dirname + '/client/index.html');
});

var pt = process.env.PORT || config.port;
server = app.listen(pt, function () {
    console.log('Listening port :' + pt);
});
