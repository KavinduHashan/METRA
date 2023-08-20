const express = require('express');
const app = express();
app.use(express.json());
const Route = express.Router();

let canteenModel = require('../model/canteen');

Route.route('/getcanteen').get(async function (req, res) {
    try {
      const fb = await canteenModel.find();
      res.json(fb);
    } catch (err) {
      console.log(err);
    }
  });



  Route.route('/order').post(async function (req, res) {
    try {
      const { itemId, quantity } = req.body;
  
      const item = await canteenModel.findById(itemId);
  
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      if (item.quantity < quantity) {
        return res.status(400).json({ error: 'Insufficient quantity' });
      }
  
      item.quantity -= quantity;

      await item.save();
  
      res.json({ message: 'Order successfully', item });
    } catch (err) {
      console.log('Error ordering item:', err);
      res.status(500).json({ error: 'Error ordering item' });
    }
  });
  


  Route.route('/addcanteen').post(async function (req, res) {
    try {
     
      const canteen = new canteenModel({
        foodname: req.body.foodname,
        quantity: req.body.quantity,
        price: req.body.price,

      });
      await canteen.save();
       res.status(200).json({ '': 'Successfully' });      
    } catch (err) {
      res.status(400).send("Something Went Wrong");
    }
  });

  Route.route('/editcanteen/:id').get(async function (req, res) {
    try {
      const id = req.params.id;
      const c = await canteenModel.findById(id);
      res.json(c);
    } catch (err) {
      res.status(400).send("Something Went Wrong");
    }
  });


  Route.route('/updatecanteen/:id').post(async function (req, res) {
    try {
      const canteen = await canteenModel.findById(req.params.id);
      if (!canteen) {
        return next(new Error('Unable To Find With This Id'));
      } else {
        canteen.foodname = req.body.foodname;
        canteen.quantity = req.body.quantity;
        canteen.price = req.body.price;
   
        const updatedEmployee = await canteen.save();
        res.json('Updated Successfully');
      }
    } catch (err) {
      res.status(400).send("Unable To Update");
    }
  });



  Route.route('/deletecanteen/:id').get(async function (req, res) {
    try {
      const d = await canteenModel.findByIdAndRemove({ _id: req.params.id });
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