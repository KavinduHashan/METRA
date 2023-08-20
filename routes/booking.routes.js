const express = require('express');
const app = express();
app.use(express.json());
const bookingRoute = express.Router();

const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

let bookingModel = require('../model/booking');

bookingRoute.route('/getBookings').get(async function (req, res) {
  try {
    const fb = await bookingModel.find();
    res.json(fb);
  } catch (err) {
    console.log(err);
  }
});


// bookingRoute.route('/k').get(async function (req, res) {
//   try {
//     const count = await bookingModel.countDocuments({ start: "kaluthra", end: "colombo" });
//     const availableSeats = 50 - count;
//     res.status(200).send({ count: count, availableSeats: availableSeats });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error counting');
//   }
// });

// count seat with algorithm
bookingRoute.route('/countLocationsAlgorithm').get(async function (req, res) {
  try {
    // MongoDB aggregation pipeline
    const results = await bookingModel.aggregate([ 
      {
        $group: {
          _id: { start: "$start", end: "$end", date:"$date", time:"$time" },
          count: { $sum: 1 }
        }
      }
    ]);

    const availableSeatsByLocation = {};
    results.forEach((result) => {
      const { start, end, date, time } = result._id;
      const count = result.count;
      const availableSeats = 50 - count;
      availableSeatsByLocation[`${start} - ${end}  ON ${date}, ${time}`] = availableSeats;
    });

    res.status(200).send({ availableSeatsByLocation: availableSeatsByLocation});
  } catch (err) {
    console.error(err);
    res.status(500).send('Error counting locations');
  }
});


// count seat algorithm
bookingRoute.route('/countLocations').get(async function (req, res) {
  try {
    // MongoDB aggregation pipeline
    const results = await bookingModel.aggregate([ 
      {
        $group: {
          _id: { start: "$start", end: "$end", date:"$date", time:"$time" },
          count: { $sum: 1 }
        }
      }
    ]);

    const availableSeatsByLocation = {};
    results.forEach((result) => {
      const { start, end, date, time } = result._id;
      const count = result.count;
      const availableSeats = 50 - count;
      availableSeatsByLocation[`${start} - ${end}  ON ${date}, ${time}`] = availableSeats;
    });

    res.status(200).send({ availableSeatsByLocation: availableSeatsByLocation});
  } catch (err) {
    console.error(err);
    res.status(500).send('Error counting locations');
  }
});



// count no of seats
bookingRoute.route('/countSeats').get(async function (req, res) {
    try {
      const count = await bookingModel.countDocuments({});
      const availableSeats = 50 - count;
      res.status(200).send({ count: count, availableSeats: availableSeats });
      // res.status(200).send({ count: count });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error counting');
    }
  });

// booking
bookingRoute.route('/addbooking').post(async function (req, res) {
  try {

    // const latestBooking = await bookingModel.findOne().sort('-seatnumber');
        
    // // Increment the seat number value by 1 to generate the next seat number
    // const nextSeatNumber = latestBooking ? latestBooking.seatnumber + 1 : 1;

    // check 50 seats
      const count = await bookingModel.countDocuments({});
      if (count >= 50) {
        res.status(400).send('Maximum number of seats reached');
        return;
      }

    const now = Date.now();

    // const employee = new employeeModel(req.body);
    const book = new bookingModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      start: req.body.start,
      end: req.body.end,
      date: req.body.date,
      Pay: req.body.Pay,
      trainname: req.body.trainname,
      time: req.body.time,
      timestamp: now
    });
    await book.save();
    
    // set up interval to delete old bookings
    setInterval(async function () {
        const cutoff = now - (24 * 60 * 60 * 1000); // 24 hours in milliseconds
        await bookingModel.deleteMany({ timestamp: { $lt: cutoff } });
    }, 60 * 60 * 1000); // run every hour

      // Send email to user
      let transporter = nodemailer.createTransport({
      service: 'Gmail',
    
      auth: {
          user: 'metrarailway@gmail.com', // your email address
          pass: 'bedbocjmzqrajjbl' // your email password
      }
      });


      let recept = `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Payment Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: black;
          }
      
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px #ccc;
            color: black;
          }
      
          h1, h2 {
            margin: 0;
            text-align: center;
            color: black;
          }
      
          h1 {
            font-size: 36px;
            margin-top: 30px;
            color: black;
          }
      
          h2 {
            font-size: 24px;
            margin-top: 20px;
            color: black;
          }
      
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
            color: black;
          }
      
          th, td {
            padding: 10px;
            border: 1px solid #ccc;
            color: black;
          }
      
          th {
            text-align: left;
            background-color: #f0f0f0;
          }
      
          .total {
            font-weight: bold;
            color: black;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Payment Receipt</h1>
          <hr>
          <h2>Ticket Booking Information</h2>
          <table>
            <tr>
              <th>Name</th>
              <td>` + req.body.name + `</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>` + req.body.email + `</td>
            </tr>
            <tr>
              <th>Train Name</th>
              <td>` + req.body.trainname + `</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>` + req.body.time + `</td>
            </tr>
            <tr>
              <th>Arriving Location</th>
              <td>` + req.body.start + `</td>
            </tr>
            <tr>
              <th>Departure Location</th>
              <td>` + req.body.end + `</td>
            </tr>
            <tr>
            <th>Date</th>
            <td>` + req.body.date + `</td>
          </tr>
          </table>

          <h2>Payment Details</h2>
          <table>
            <tr>
              <th>Payment Date</th>
              <td>` + req.body.date + `</td>
              </tr></td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>LKR`+ req.body.Pay +`</td>
            </tr>
            <tr>
              <th>Payment Method</th>
              <td>Credit Card</td>
            </tr>
          </table>
          <hr>
          <p class="total">Total: LKR`+ req.body.Pay +`</p>
        <p class="total">Thank You</p><p class="total">METRA</p>
        </div>
      </body>
      </html>
      `;
      

      let mailOptions = {
        from: 'metrarailway@gmail.com',
        to: req.body.email,
        //to: email,
        //to: 'kavinduhashan2k17@gmail.com',
        subject: 'PAYMENT RECEPT ',
        // html: '<h1>PAYMENT RECEPT<br</h1><h3>Hi ' + req.body.name + ' , your payment is successfully</h3><p>Name: ' + req.body.name + '</p><p>Email: ' + req.body.email + '</p><p>Arriving Location: ' + req.body.start + '</p><p>Departure Location: ' + req.body.end + '</p><p>Date: ' + req.body.date + '</p><p>Price: LKR500</p><br><h3>Thank You</h3><h3>Metra e-Train</h3>'
        html: recept
      };


      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
      });
      res.status(200).json({ 'booking': 'Booking Successfully' });      
      } catch (err) {
        res.status(400).send("Something Went Wrong");
        console.log(err);
      }  
});


// To Delete The Employee---------------------------------------------------------------------------------------------------------
bookingRoute.route('/deleteBooking/:id').get(async function (req, res) {
  try {
    const del = await bookingModel.findByIdAndRemove({ _id: req.params.id });
    if (!del) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee Deleted Successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = bookingRoute;




