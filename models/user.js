var crypto = require('crypto');
var db = require('./../db');

var schemaUser = new db.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    hash: {
        type: String,
        require: true
    },
    salt: {
        type: String,
        require: true
    },
    iteration: {
        type: Number,
        require: true
    },
    created : {
        type: Date,
        default: Date.now()
    },
    admin: {
        type: Boolean,
        default: false
    },
    store: {
        type: Boolean,
        default: false
    }
});


schemaUser.virtual('password')
    .set(function (data) {
        this.salt = String(Math.random());
        this.iteration = parseInt(Math.random()*10+1);
        this.hash = this.getHash(data);
    })
    .get(function () {
        return this.hash;
    });

schemaUser.methods.checkPassword = function (data) {
    return this.getHash(data) === this.hash;
};

schemaUser.methods.getHash = function (password) {
    var c = crypto.createHmac('sha1', this.salt);
    for(var i = 0; i < this.iteration; i++) {
        c = c.update(password);
    }
    return c.digest('hex');
};

schemaUser.methods.serialized = function () {
    return {
        _id: this._id,
        username: this.username,
        admin: this.admin,
        store: this.store,
        avatar: this.avatar
    }

};

module.exports = db.models.User ? db.model('User') : db.model('User', schemaUser);
