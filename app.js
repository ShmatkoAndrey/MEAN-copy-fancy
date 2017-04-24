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

// var cloudinary = require('./cloudinary');
// // cloudinary.uploader.upload("./test-images/1fecf1b1aeca4a76bcab1dc802733c7a.jpg", function(result) {
// //     console.log(result)
// // },
// //     {folder: 'public'});
//
// cloudinary.api.resources(function(result){
//     console.log(result.resources[0]);
//     cloudinary.uploader.upload(result.resources[0].url, function(result) {
//             console.log(result)
//     },{folder: 'public'})
// },{ type: 'upload', prefix: 'seed-images/banners' });


server = app.listen(process.env.PORT || config.port, function () {
    console.log('Listening port :' + process.env.PORT || config.port);
});
