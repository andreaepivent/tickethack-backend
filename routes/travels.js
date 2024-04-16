var express = require("express");
var router = express.Router();
const Travel = require("../models/travels");
var moment = require('moment');

/* GET all travels */
router.get("/:departure/:arrival/:date", function (req, res, next) {
  const { departure, arrival, date } = req.params;
  const dateFormat = moment(date,"YYYY-MM-DD").toDate();
  
  Travel.find({ departure, arrival, date:dateFormat })
  .then((travels) => {
    if (travels) { // On retourne les infos des trajets
        res.json({result: true, travels: travels});
    } else { // Le trajet n'existe pas
        res.json({result: false});
    }
  })
});

module.exports = router;
