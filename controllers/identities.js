var Identity = require('../models/identity');

module.exports = function(app){

    app.get('/api/identity', function (req, res) {
        var uid,
            provider;
        Identity.findOne({ uid: uid, provider: provider }, function (err, identity) {
            if(identity) {
                // login
            }
            else {
                // registration
            }
        })
    });
};
