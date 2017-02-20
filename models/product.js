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
    created : {
        type: Date,
        default: Date.now()
    }
});


schemaProduct.methods.getFullInfo = function (callback) {
    var p = {
        _id:            this._id,
        title:          this.title,
        description:    this.description,
        price:          this.price,
        user_likes:     this.user_likes,
        tags:           this.tags,
        created:        this.created
    };

    var User = require('./user');
    User.findById(this.user_id, function (err, user) {
        p.user = {
            _id: user._id,
            username: user.username
        };
        callback(p);
    });
};


module.exports = db.models.Product ? db.model('Product') : db.model('Product', schemaProduct);