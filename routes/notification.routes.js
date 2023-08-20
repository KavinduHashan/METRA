const express = require('express');
const app = express();
app.use(express.json());
const Route = express.Router();

let notificationModel = require('../model/notification');

Route.route('/getNotification').get(async function (req, res) {
    try {
      const fb = await notificationModel.find();
      res.json(fb);
    } catch (err) {
      console.log(err);
    }
  });

  Route.route('/addnotification').post(async function (req, res) {
    try {
      // const employee = new employeeModel(req.body);
      const fb = new notificationModel({
        notification: req.body.notification,
      });
      await fb.save();
       res.status(200).json({ '': ' Added Successfully' });      
    } catch (err) {
      res.status(400).send("Something Went Wrong");
    }
  });

  Route.route('/editnotification/:id').get(async function (req, res) {
    try {
      const id = req.params.id;
      const sch = await notificationModel.findById(id);
      res.json(sch);
    } catch (err) {
      res.status(400).send("Something Went Wrong");
    }
  });
  
  Route.route('/updatenotification/:id').post(async function (req, res) {
    try {
      const sch = await notificationModel.findById(req.params.id);
      if (!sch) {
        return next(new Error('Unable To Find Employee With This Id'));
      } else {
        sch.notification= req.body.notification;
      };
   
        const upsch = await sch.save();
        res.json(' Updated Successfully');
    } catch (err) {
      res.status(400).send("Unable To Update Employee");
    }
  });

  Route.route('/deletenotification/:id').get(async function (req, res) {
    try {
      const notification = await notificationModel.findByIdAndRemove({ _id: req.params.id });
      if (!notification) {
        return res.status(404).json({ message: 'not found' });
      }
      res.status(200).json({ message: 'Deleted Successfully'});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  module.exports = Route;