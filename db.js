var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:1@ds117931.mlab.com:17931/fancydb', function (err) {
    if(err) throw err;
    else console.log('db connected');
});

module.exports = mongoose;
