const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    travelInfos: { type: mongoose.Schema.Types.ObjectId, ref: 'travels' }, 
  })

  const Cart = mongoose.model("carts", cartSchema)

  module.exports = Cart;