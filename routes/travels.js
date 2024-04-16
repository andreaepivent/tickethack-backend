var express = require("express");
var router = express.Router();
const Travel = require("../models/travels");
var moment = require("moment");

/* Display all travels for certain departure, arrival and date */
router.get("/:departure/:arrival/:timestamp", function (req, res, next) {
  const { departure, arrival, timestamp } = req.params;
  const date = moment(Number(timestamp));

  // Début de la journée spécifiée
  const startOfDay = date.startOf("day").toDate();
  // Début du jour suivant
  const endOfDay = date.endOf("day").toDate();

  // Utilisation de RegExp pour rendre la recherche insensible à la casse
  const departureRegExp = new RegExp(departure, "i");
  const arrivalRegExp = new RegExp(arrival, "i");

  Travel.find({
    departure: departureRegExp,
    arrival: arrivalRegExp,
    date: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  }).then((travels) => {
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
