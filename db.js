var config = require('./config')();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/' + config.db_name);
console.log('Connect to db:', config.db_name);

module.exports = mongoose;