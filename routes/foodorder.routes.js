const express = require('express');
const app = express();
app.use(express.json());
const Route = express.Router();

const nodemailer = require('nodemailer');

let foodModelCredit = require('../model/foodorder-CreditCard');
let foodModelCash = require('../model/foodorder-Cash');

const canteenModel = require('../model/canteen');

// credit
Route.route('/getfoodCredit').get(async function (req, res) {
    try {
      const fb = await foodModelCredit.find();
      res.json(fb);
    } catch (err) {
      console.log(err);
    }
  });

  Route.route('/addfoodCredit').post(async function (req, res) {
    try {
     
      const food = new foodModelCredit({
        name: req.body.name,
        email: req.body.email,
        seatnum: req.body.seatnum,
        foodname: req.body.foodname,
        quantity: req.body.quantity,
        price: req.body.price,
      });
      await food.save();

       // Send email to user
       let transporter = nodemailer.createTransport({
        service: 'Gmail',
      
        auth: {
            user: 'metrarailway@gmail.com', // your email address
            pass: 'bedbocjmzqrajjbl' // your email password
        }
        });

        let message = `<!DOCTYPE html>
        <html>
        <head>
          <title>Food Order Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f2f2f2;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border: 1px solid #ccc;
              box-shadow: 0 0 10px #ccc;
            }
            h1 {
              font-size: 32px;
              margin-top: 0;
              text-align: center;
              color: #333;
            }
            h3 {
              font-size: 24px;
              margin-top: 20px;
              margin-bottom: 10px;
              color: #333;
            }
            p {
              font-size: 18px;
              margin: 10px 0;
              color: #333;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              margin-bottom: 20px;
            }
        
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
        
           
          </style>
        </head>
        <body>
          <div class="container">
            <h1>FOOD ORDER RECEIPT</h1>
            <h3>Hi ` + req.body.name + `, your order is confirmed.</h3>
            <table>
		<tr>
			<th>Information</th>
			<th>Details</th>
		</tr>
		<tr>
			<td>Name</td>
			<td> ` + req.body.name + `</td>
		</tr>
		<tr>
			<td>Seat No</td>
			<td>` + req.body.seatnum + `</td>
		</tr>
		<tr>
			<td>Food Name</td>
			<td>` + req.body.foodname + `</td>
		</tr>
		<tr>
			<td>Quantity</td>
			<td>` + req.body.quantity + `</td>
		</tr>
		<tr>
			<td>Price</td>
			<th>` + req.body.price + `</th>
		</tr>
	</table>
  <p>Your order will recieved within 5 minutes</p>
            <p>Thank you,</p>
            <p>Metra e-Train</p>
          </div>
        </body>
        </html>
        `;
        
  
        let mailOptions = {
          from: 'metrarailway@gmail.com',
          to: req.body.email,
          //to: email,
          //to: 'kavinduhashan2k17@gmail.com',
          subject: 'ORDER COMFIRMED',
          // html: '<h1>FOOD ORDER RECEPT<br></h1><h3>Hi ' + req.body.name + ' , your order is comfirmed.</h3><p>Name: ' + req.body.name + '</p><p>Seat No: '+req.body.seatnum +'<br>Food Name: '+ req.body.foodname +'<br>Quantity: '+ req.body.quantity +'<br>Price: '+ req.body.price +'<br> Your order will recieved within 5 minutes</p><br><p>Thank You</p><p>Metra e-Train</p>'
          html: message
        };
  
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
              console.log(error);
          } else {
              console.log('Email sent: ' + info.response);
          }
        });

       res.status(200).json({ '': 'Successfully' });      
    } catch (err) {
      res.status(400).send("Something Went Wrong");
    }
  });


  Route.route('/deletefoodCredit/:id').get(async function (req, res) {
    try {
      const d = await foodModelCredit.findByIdAndRemove({ _id: req.params.id });
      if (!d) {
        return res.status(404).json({ message: 'not found' });
      }
      res.status(200).json({ message: 'Deleted Successfully'});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });



  // cash
Route.route('/getfoodCash').get(async function (req, res) {
  try {
    const fb = await foodModelCash.find();
    res.json(fb);
  } catch (err) {
    console.log(err);
  }
});

Route.route('/addfoodCash').post(async function (req, res) {
  try {
   
    const food = new foodModelCash({
      name: req.body.name,
      email: req.body.email,
      seatnum: req.body.seatnum,
      foodname: req.body.foodname,
      quantity: req.body.quantity,
      pay: req.body.pay
    });
    await food.save();

     // Send email to user
     let transporter = nodemailer.createTransport({
      service: 'Gmail',
    
      auth: {
          user: 'metrarailway@gmail.com', // your email address
          pass: 'bedbocjmzqrajjbl' // your email password
      }
      });

      let message = `<!DOCTYPE html>
      <html>
      <head>
        <title>Food Order Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px #ccc;
          }
          h1 {
            font-size: 32px;
            margin-top: 0;
            text-align: center;
            color: #333;
          }
          h3 {
            font-size: 24px;
            margin-top: 20px;
            margin-bottom: 10px;
            color: #333;
          }
          p {
            font-size: 18px;
            margin: 10px 0;
            color: #333;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 20px;
          }
      
          th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
      
         
        </style>
      </head>
      <body>
        <div class="container">
          <h1>FOOD ORDER RECEIPT</h1>
          <h3>Hi ` + req.body.name + `, your order is confirmed.</h3>
          <table>
  <tr>
    <th>Information</th>
    <th>Details</th>
  </tr>
  <tr>
    <td>Name</td>
    <td> ` + req.body.name + `</td>
  </tr>
  <tr>
    <td>Seat No</td>
    <td>` + req.body.seatnum + `</td>
  </tr>
  <tr>
    <td>Food Name</td>
    <td>` + req.body.foodname + `</td>
  </tr>
  <tr>
    <td>Quantity</td>
    <td>` + req.body.quantity + `</td>
  </tr>
  <tr>
    <td>Price</td>
    <th>Cash on Deliver</th>
  </tr>
</table>
<p>Your order and bill will recieved within <b>5 minutes</b></p>
<p>Your bill is <b>LKR`+req.body.pay+`</b></p>
          <p>Thank you,</p>
          <p>Metra e-Train</p>
        </div>
      </body>
      </html>
      `;
      

      let mailOptions = {
        from: 'metrarailway@gmail.com',
        to: req.body.email,
        //to: email,
        //to: 'kavinduhashan2k17@gmail.com',
        subject: 'ORDER COMFIRMED',
        // html: '<h1>FOOD ORDER RECEPT<br></h1><h3>Hi ' + req.body.name + ' , your order is comfirmed.</h3><p>Name: ' + req.body.name + '</p><p>Seat No: '+req.body.seatnum +'<br>Food Name: '+ req.body.foodname +'<br>Quantity: '+ req.body.quantity +'<br>Price: '+ req.body.price +'<br> Your order will recieved within 5 minutes</p><br><p>Thank You</p><p>Metra e-Train</p>'
        html: message
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
      });

     res.status(200).json({ '': 'Successfully' });      
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});


Route.route('/deletefoodCash/:id').get(async function (req, res) {
  try {
    const d = await foodModelCash.findByIdAndRemove({ _id: req.params.id });
    if (!d) {
      return res.status(404).json({ message: 'not found' });
    }
    res.status(200).json({ message: 'Deleted Successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

  module.exports = Route;