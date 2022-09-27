const express = require("express");
require("dotenv").config();
const app = express();
const userRoute = require("./routes/users.route");

//body-parser middleware
app.use(express.json());

app.use("/users", userRoute);

app.listen(process.env.PORT_EXPRESS, () => {
  console.log("server is listening to port: " + process.env.PORT_EXPRESS);
});
