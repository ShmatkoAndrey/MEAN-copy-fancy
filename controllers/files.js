var path = require('path');
var fs = require('fs');

module.exports = function(app) {

    app.get('/images/:product_id/:photo', function (req, res) {
        res.sendFile(path.resolve(__dirname + './../images/' + req.params.product_id + '/' + req.params.photo));
    });

    app.get('/images/users/:user_id/:photo', function (req, res) {
        var path_file = __dirname + './../images/users/' + req.params.user_id + '/' + req.params.photo;
        if (fs.existsSync(path_file)) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.sendFile(path.resolve(__dirname + './../public/standart_avatar.png'));
        }
    });
};
