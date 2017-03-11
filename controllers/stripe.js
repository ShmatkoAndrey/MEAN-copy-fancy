var stripe = require('stripe')('sk_test_NZWyHet4rXjZBKEkMW1aqPt2'); // TODO: secrets.js

module.exports = function(app){
    app.get('/payment', function (req, res) {

        stripe.customers.create({
            email: 'foo-customer@example.com'
        }).then(function(customer){
            return stripe.customers.createSource(customer.id, {
                source: {
                    object: 'card',
                    exp_month: 10,
                    exp_year: 2018,
                    number: '4242 4242 4242 4242',
                    cvc: 100
                }
            });
        }).then(function(source) {
            return stripe.charges.create({
                amount: 1600,
                currency: 'usd',
                customer: source.customer
            });
        }).then(function(charge) {
            res.json({charge: charge})
            // New charge created on a new customer
        }).catch(function(err) {
            res.json({error: err})
            // Deal with an error
        });

    })
}