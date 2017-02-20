var db = require('./../db');

var schemaTag =  new db.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    }
});


module.exports = db.models.Tag ? db.model('Tag') : db.model('Tag', schemaTag);