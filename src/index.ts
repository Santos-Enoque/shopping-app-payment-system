/* eslint-disable */
import * as functions from "firebase-functions";
const stripe = require('stripe')(functions.config().stripe.testkey);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
// 424242424242 03 24 123
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.createPaymentIntent = functions.https.onRequest(async (req, res) => { 
    stripe.paymentIntents.create(
        {
          amount: req.query.amount,
          currency: req.query.currency,
          payment_method: req.query.pm_id,
          confirmation_method: 'automatic',
          confirm: true,
          description: req.query.description,
        },
        function(err, paymentIntent) {
          // asynchronously called
          if (err !== null){
            console.log('Error payment Intent: ', err);
            res.send('error');} else {
            console.log('Created paymentintent: ', paymentIntent);
            res.json({
              paymentIntent: paymentIntent
        });
          }});
});


