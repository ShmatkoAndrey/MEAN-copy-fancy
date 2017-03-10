var db = require('./../db');

var schemaIdentity =  new db.Schema({
    user_id: {
        type: String,
        require: true
    },
    uid: {
        type: String
    },
    provider: {
        type: String
    }
});

module.exports = db.models.Identity ? db.model('Identity') : db.model('Identity', schemaIdentity);