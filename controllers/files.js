var path = require('path');

module.exports = function(app) {

    app.get('/images/:product_id/:photo', function (req, res) {
        res.sendFile(path.resolve(__dirname + './../images/' + req.params.product_id + '/' + req.params.photo));
    });

    app.get('/images/users/:user_id/:photo', function (req, res) {
        res.sendFile(path.resolve(__dirname + './../images/users/' + req.params.user_id + '/' + req.params.photo));
    });
};