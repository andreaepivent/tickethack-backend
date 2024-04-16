var express = require("express");
var router = express.Router();
const Travel = require("../models/travels");
var moment = require("moment");

/* Display all travels for certain departure, arrival and date */
router.get("/:departure/:arrival/:timestamp", function (req, res, next) {
  const { departure, arrival, timestamp } = req.params;
  const date = moment.unix(Number(timestamp)).format("YYYY-MM-DD");

  // Début de la journée spécifiée
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0); // Mettre l'heure à 00:00:00

  // Début du jour suivant
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999); // Mettre l'heure à 23:59:59:999

  Travel.find({ departure, arrival, date: { $gte: startOfDay, $lte: endOfDay } }).then((travels) => {
    if (travels) {
      // On retourne les infos des trajets
      res.json({ result: true, travels: travels});
    } else {
      // Le trajet n'existe pas
      res.json({ result: false });
    }
  });
});

module.exports = router;
