var db = require('./../db');

var schemaProduct =  new db.Schema({
    user_id: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    user_likes: { // [_id1, _id2, ..]
        type: Array,
        default: []
    },
    tags: { // [name1, name2, ..]
        type: Array,
        default: []
    },
    descriptionPhoto: {
        type: Array,
        default: []
    },
    mainPhoto: {
      type: String
    },
    created : {
        type: Date,
        default: Date.now()
    }
});


schemaProduct.methods.getFullInfo = function (callback) {
    var User = require('./user');
    var users = [], ii = 0;
    var p = {
        _id: this._id,
        title: this.title,
        description: this.description,
        price: this.price,
        user_likes: [],
        tags: this.tags,
        created: this.created,
        descriptionPhoto: this.descriptionPhoto,
        mainPhoto: this.mainPhoto
    };

    if(this.user_likes.length == 0){
        callback(p);
    } else {
        this.user_likes.forEach(function (e, i) {
            User.findById(e, function (err, user) {
                users[i] = user;
                ii++;
                if (ii == this.user_likes.length) {
                        p.user_likes = users;
                    callback(p);
                }
            }.bind(this));
        }.bind(this));
    }
};

module.exports = db.models.Product ? db.model('Product') : db.model('Product', schemaProduct);