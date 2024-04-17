var express = require("express");
var router = express.Router();
const Cart = require("../models/carts");
const Travel = require("../models/travels");

/* Display all travels in cart */
router.get("/allCart", function (req, res, next) {
  
  Cart.find({ })
  .populate('travelInfos')
  .then((travels) => {
    if (travels.length>0) { // On retourne les infos des trajets
        res.json({result: true, travels: travels});
    } else { // Le trajet n'existe pas
        res.json({result: false});
    }
  })
});

/* Post a travel in the cart */
router.post("/addToCart", function (req, res, next) {
  
    const {travelInfos} = req.body;

    Travel.findById(travelInfos).then(data => {
      if (data) {
        const newTrip = new Cart({
          travelInfos
        });
  
      newTrip.save()
      .then((trip) => {
          res.json({result: true, tripCart: trip})
      });
  
      } else {
        res.json({result: false})
      }
    })
  });

/* Delete a travel in the cart */
router.delete("/deleteTrip/:id", function (req, res, next) {
  
    Cart.deleteOne({travelInfos: req.params.id})
    .then(() => {
        res.json({result: true})
    });

  });

/* Empty cart */
router.delete("/emptyCart", function (req, res, next) {
  
    Cart.deleteMany({ })
    .then(() => {
        res.json({result: true})
    });

  });

module.exports = router;
