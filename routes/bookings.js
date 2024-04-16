var express = require("express");
var router = express.Router();
const Booking = require("../models/bookings");
const Cart = require("../models/carts");

/* GET all travels */
router.get("/allBookings", function (req, res, next) {
  
  Booking.find({ })
  .then((travels) => {
    if (travels) { // On retourne les infos des trajets
        res.json({result: true, travels: travels});
    } else { // Le trajet n'existe pas
        res.json({result: false});
    }
  })
});

/* Post a travel */
router.post("/purchase", function (req, res, next) {
  
    Cart.find({})
    .then((travels) => {
      if (travels) { // On ajoute les trajets du panier dans les bookings
        for (let travel of travels) {
            const newTravel = new Booking({
                travel
            });

            newTravel.save().then();
        }
          res.json({result: true});
      } else { // Le trajet n'existe pas
          res.json({result: false});
      }
    })
  });

module.exports = router;
