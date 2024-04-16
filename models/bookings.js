const mongoose = require("mongoose")

const bookingSchema = mongoose.Schema({
    travelInfos: { type: mongoose.Schema.Types.ObjectId, ref: 'travels' }, 
  })

  const Booking = mongoose.model("bookings", bookingSchema)

  module.exports = Booking;