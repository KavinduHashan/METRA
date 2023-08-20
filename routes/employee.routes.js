 const express = require('express');
 const nodemailer = require('nodemailer');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');

 const app = express();
 app.use(express.json());
 const employeeRoute = express.Router();
 
 let employeeModel = require('../model/user');

 // -------------------------------------------------------To Get List Of Employees------------------------------------------------
 employeeRoute.route('/getemp').get(async function (req, res) {
    try {
      const employees = await employeeModel.find();
      res.json(employees);
    } catch (err) {
      console.log(err);
    }
  });

  // ----------------------------------------------------------------count---------------------------------------------------------
  employeeRoute.route('/count').get(async function (req, res) {
    try {
      const count = await employeeModel.countDocuments({});
      res.status(200).send({ count: count });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error counting employees');
    }
  });
  


  // ---------------------------------------------------get name and email------------------------------------------------------------
  employeeRoute.route('/getNameEmail').post(async function (req, res) {
    const { name, email } = req.body;

    const query = {};

    if (name) {
      query.name = { $regex: new RegExp(name, 'i') };
    }

    if (email) {
      query.email = { $regex: new RegExp(email, 'i') };
    }

    const emp = await employeeModel.find(query);

    res.json(emp);
  });



// ----------------------------------------------To Add New Employee -- working code---------------------------------------------------
employeeRoute.route('/addEmployee').post(async function (req, res) {
    try {

      //const employee = new employeeModel();
      const name = req.body.name;
      const nic = req.body.nic;
      const email = req.body.email;
      const phone = req.body.phone;
      const password =  req.body.password ;

      const salt = await bcrypt.genSalt(10);
      const shpass = await bcrypt.hash(password, salt);

      const newEmployee = new employeeModel({
        name,
        nic,
        email,
        phone,
        password : shpass
      });

      await newEmployee.save();

      // Send email to user
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
      
        auth: {
            user: 'metrarailway@gmail.com', // email address
            pass: 'bedbocjmzqrajjbl' // email password
        }
        });
  
        let mailOptions = {
          from: 'metrarailway@gmail.com',
          to: req.body.email,
          //to: email,
          //to: 'kavinduhashan2k17@gmail.com',
          subject: 'Registration Confirmation',
          html: '<h1>Hi ' + req.body.name + ' Welcome to METRA</h1><p>Thank you for registering with us.</p>'
        };
  
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
              console.log(error);
          } else {
              console.log('Email sent: ' + info.response);
          }
         });

      res.status(200).json({ 'employee': 'Employee Added Successfully' }); 

    } catch (err) {
      console.log(err.message);
      res.status(400).send("Error in Saving");
    }
  });

// login
employeeRoute.route('/login').post(async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const employee = await employeeModel.findOne({ email: email });
    if (!employee) {
      return res.status(401).send({ message: 'Authentication failed. User not found.' });
    }
  
    // Check if the employee object is null or undefined before accessing its properties
    if (!employee || !employee.password) {
      return res.status(400).send({ message: 'Bad request. Employee object or password is null or undefined.' });
    }
  
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Authentication failed. Wrong password.' });
    }
  
    // Password is valid
    return res.status(200).send({ message: 'Authentication successful.' });
  
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal server error.' });
  }
});


employeeRoute.route('/forgotPassword').post(async function (req, res) {
  const { email } = req.body;

  try {
    const user = await employeeModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'metrarailway@gmail.com', // email address
          pass: 'bedbocjmzqrajjbl' // email password
      }
    });

    const mailOptions = {
      from: 'metrarailway@gmail.com',
      to: req.body.email,
      subject: 'Email Verification',
      html: `<p>Welcome to METRA,</p><p>Please click on the following link to verify your email address:</p><p><a href="http://localhost:3000/setPassword">Verify email</a></p>`,
    };

    const sendEmail = transporter.sendMail(mailOptions);

    await sendEmail;

    if (res.headersSent) {
      return;
    }
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





// // forget password
// employeeRoute.route('/forgotPassword').post(async function (req, res) {
//   const { email } = req.body;

//   try {
//     const user = await employeeModel.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'Email not found' });
//     }

//     let transporter = nodemailer.createTransport({
//       service: 'Gmail',

//       auth: {
//           user: 'metrarailway@gmail.com', // email address
//           pass: 'bedbocjmzqrajjbl' // email password
//       }
//     });

//     const mailOptions = {
//       from: 'metrarailway@gmail.com',
//       to: req.body.email,
//       subject: 'Verify your email address',
//       html: `<p>Welcome to METRA,</p><p>Please click on the following link to verify your email address:</p><p><a href="http://localhost:3000/setPassword">Verify email</a></p>`,
//     };

//     await transporter.sendMail(mailOptions);

//     user.password = ""; // Deletes the password value

//     await user.save();

//     if (res.headersSent) {
//       return;
//     }

//     res.status(200).json({ message: 'Password reset email sent' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// setpassword
employeeRoute.route('/setNewPassword').post(async function (req, res) {
  try {
    //reset password
    const { email } = req.body;
    const userReset = await employeeModel.findOne({ email });
    if (!userReset) {
      return res.status(404).json({ message: 'Email not found' });
    }
    userReset.password = ""; // Deletes the password value
    await userReset.save();

    // set new password
    const { password } = req.body;
    const user = await employeeModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const salt = await bcrypt.genSalt(10);
    const shpass = await bcrypt.hash(password, salt);

    user.password = shpass;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

  
 
 // To Get Employee Details By Employee ID----------------------------------------------------------------------------------------
 employeeRoute.route('/editEmployee/:id').get(async function (req, res) {
    try {
      const id = req.params.id;
      const employee = await employeeModel.findById(id);
      res.json(employee);
    } catch (err) {
      res.status(400).send("Something Went Wrong");
    }
  });
  
 
 // To Update The Employee Details-------------------------------------------------------------------------------------------------
 employeeRoute.route('/updateEmployee/:id').post(async function (req, res) {
    try {
      const employee = await employeeModel.findById(req.params.id);
      if (!employee) {
        return next(new Error('Unable To Find Employee With This Id'));
      } else {
        employee.name = req.body.name;
        employee.nic = req.body.nic;
        employee.email = req.body.email;
        employee.phone = req.body.phone;
        employee.password = req.body.password;
   
        const updatedEmployee = await employee.save();
        res.json('Employee Updated Successfully');
      }
    } catch (err) {
      res.status(400).send("Unable To Update Employee");
    }
  });
  
 
 // To Delete The Employee---------------------------------------------------------------------------------------------------------
 employeeRoute.route('/deleteEmployee/:id').get(async function (req, res) {
    try {
      const deletedEmployee = await employeeModel.findByIdAndRemove({ _id: req.params.id });
      if (!deletedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json({ message: 'Employee Deleted Successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
 
 module.exports = employeeRoute;