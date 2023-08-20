const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
const scheduleRoute = express.Router();

let scheduleModel = require('../model/trainschedule');

scheduleRoute.route('/getschedule').get(async function (req, res) {
  try {
    const fb = await scheduleModel.find();
    res.json(fb);
  } catch (err) {
    console.log(err);
  }
});

scheduleRoute.route('/getSearch').post(async function (req, res) {
  const { start, end, date } = req.body;

  const query = {};

  if (start) {
    query.start = { $regex: new RegExp(start, 'i') };
  }

  if (date) {
    query.date = { $eq: new Date(date) };
  }  

  if (end) {
    query.end = { $regex: new RegExp(end, 'i') };
  }

  const emp = await scheduleModel.find(query);

  res.json(emp);
});



scheduleRoute.route('/addSchedule').post(async function (req, res) {
  try {

    // per day can add only 3 schedules
    const date = req.body.date;
      const count = await scheduleModel.countDocuments({ date: date });
      if (count >= 3) {
        res.status(400).send('Maximum number of seats reached');
        return;
      }

    const book = new scheduleModel({
      trainname: req.body.trainname,
      start: req.body.start,
      end: req.body.end,
      date: req.body.date,
      time: req.body.time,
      price: req.body.price
    });
    await book.save();
    
      res.status(200).json({ '': ' Successfully' });      
    } catch (err) {
        res.status(400).send("Something Went Wrong");
      }  
});

scheduleRoute.route('/editSchedule/:id').get(async function (req, res) {
  try {
    const id = req.params.id;
    const sch = await scheduleModel.findById(id);
    res.json(sch);
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});

scheduleRoute.route('/updateSchedule/:id').post(async function (req, res) {
  try {
    const sch = await scheduleModel.findById(req.params.id);
    if (!sch) {
      return next(new Error('Unable To Find Employee With This Id'));
    } else {
      sch.trainname= req.body.trainname;
      sch.start= req.body.start;
      sch.end= req.body.end;
      sch.date= req.body.date;
      sch.time=req.body.time;
      sch.price=req.body.price;
    };
 
      const upsch = await sch.save();
      res.json(' Updated Successfully');
  } catch (err) {
    res.status(400).send("Unable To Update Employee");
  }
});

scheduleRoute.route('/deleteSchedule/:id').get(async function (req, res) {
    try {
      const del = await scheduleModel.findByIdAndRemove({ _id: req.params.id });
      if (!del) {
        return res.status(404).json({ message: 'not found' });
      }
      res.status(200).json({ message: 'Deleted Successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });


module.exports = scheduleRoute;