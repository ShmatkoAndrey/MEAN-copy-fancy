var config = require('./config')();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
console.log('Connect to db:', config.db_name);
mongoose.connect('mongodb://localhost/' + config.db_name, function (err) {
    if(err) throw err;
    else console.log('db connected');
});

module.exports = mongoose;