require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();
const PORT = process.env.PORT;

const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const ConnectMongoDB = require('./config/database');
ConnectMongoDB();

// Enable CORS
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// session handlling
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/METRA',
  collection: 'sessions',
});

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: true, 
    },
  })
);

const sessionTimeout = (req, res, next) => {
  if (req.session && req.session.cookie.expires < Date.now()) {
    req.session.destroy();
    return res.redirect('/');
  }
  next();
};

app.use(sessionTimeout);

// 30 minutes from now
app.get('/protected', (req, res) => {
  req.session.cookie.expires = new Date(Date.now() + 1000 * 60 * 30); 

});


// cookies
app.use(cookieParser());

app.get('/set-cookie', (req, res) => {
  res.cookie('cookieName', 'cookieValue', { httpOnly: true });
  res.send('Cookie set successfully!');
});


// Configure routes
const empRoutes = require('./routes/employee.routes');
app.use('/employees', empRoutes);

const payRoutes = require('./routes/payment.routes');
app.use('/payments', payRoutes);

const mapRoutes = require('./routes/map.routes');
app.use('/map', mapRoutes);

app.use('/feedbacks', require('./routes/feedback.routes'));

app.use('/complaints', require('./routes/complaint.routes'));

app.use('/bookings', require('./routes/booking.routes'));

app.use('/schedules', require('./routes/schedule.routes'));

app.use('/canteens', require('./routes/canteen.routes'));

app.use('/foodorders', require('./routes/foodorder.routes'));

app.use('/notifications', require('./routes/notification.routes'));


// const pay_New_Routes = require('./routes/payment_New.routes');
// app.use('/payment-new', pay_New_Routes);

// Start the server
app.listen(PORT, (err) => {
  if (err) console.log(err);
   console.log(`Server is listening on port ${PORT}`);
});

// // stripe
// app.post('/payment', async (req, res) => {
//   let status, error;
//   const { token, amount } = req.body;
//   try {
//     await Stripe.charges.create({
//       source: token.id,
//       amount,
//       currency: 'usd',
//     });
//     status = 'success';
//   } catch (error) {
//     console.log(error);
//     status = 'Failure';
//   }
//   res.json({ error, status });
// });

app.get('/api/location', (req, res) => {
  // Fetch the user's location here
  // You can use any method to retrieve the user's location
  // such as IP geolocation or browser's geolocation API

  // For this example, we'll return a mock location
  const location = {
    latitude: 37.7749,
    longitude: -122.4194,
  };

  res.json(location);
});

module.exports=app;
 
