const express = require('express');

const app = express();
app.use(express.json());
const mapRoutes = express.Router();

let mapModel = require('../model/map');

mapRoutes.route('/getMap').get(async function (req, res) {
  try {
    const fb = await mapModel.find();
    res.json(fb);
  } catch (err) {
    console.log(err);
  }
});

mapRoutes.route('/api').post(async function (req, res) {
    const location = new mapModel(req.body);
    try {
      await location.save();
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

module.exports = mapRoutes;