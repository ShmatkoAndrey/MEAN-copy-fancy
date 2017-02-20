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
    user_likes: {
        type: Array,
        default: []
    },
    tags: {
        type: Array,
        default: []
    },
    created : {
        type: Date,
        default: Date.now()
    }
});


schemaProduct.methods.getFullInfo = function () {

};


module.exports = db.models.Product ? db.model('Product') : db.model('Product', schemaProduct);