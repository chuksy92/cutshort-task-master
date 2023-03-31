const mongoose = require("mongoose");
require("dotenv").config();
import app from "./src/index";
const port = process.env.PORT || 3000;


// Uncaught exception error handling
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION: Shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});

console.log("Current environment is:", process.env.NODE_ENV)


mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));
  






const server = app.listen(port, () => {
  console.log("listening on port " + port);
});





process.on("unhandledRejection", (ex: any) => {
  console.log("We got an unhandled rejection");
  console.log(ex.name, ex.message);
  server.close(() => {
    process.exit(1);
  });
  // throw ex;
} );