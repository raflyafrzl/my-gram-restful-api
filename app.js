const express = require("express");
require("dotenv").config();
const app = express();

app.listen(process.env.PORT_EXPRESS, () => {
  console.log("server is listening to port: " + process.env.PORT_EXPRESS);
});
