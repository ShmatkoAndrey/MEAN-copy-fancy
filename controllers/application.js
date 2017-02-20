module.exports = function(app){

    app.get('/', function (req, res) {
        res.json({test: 'work!'});
        // res.render('index');
    });

};
