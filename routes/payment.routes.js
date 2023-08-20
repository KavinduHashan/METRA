const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
const paymentRoute = express.Router();

let paymentModel = require('../model/payment');


// stripe
paymentRoute.route('/payment-handle').get(async function (req, res) {
  let status, error;
  const { token, amount } = req.body;

  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: 'LKR',
      
    });
    status = 'success';
  } catch (error) {
    console.log(error);
    status = 'Failure';
  }
  res.json({ error, status });
});


module.exports = paymentRoute;