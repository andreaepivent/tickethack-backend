const mongoose = require("mongoose");
const connectionString = process.env.CONNECTION_STRING;

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Successfully connected to the Tablée Database!"))
  .catch((errorMessage) => console.error(errorMessage))