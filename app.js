const express = require("express");
require("dotenv").config();
const app = express();
const userRoute = require("./routes/users.route");
const errorMiddleware = require("./middlewares/err.middleware");
const morgan = require("morgan");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//body-parser middleware
app.use(express.json());

//logger-middleware

app.use("/users", userRoute);

app.use(errorMiddleware);

app.listen(process.env.PORT_EXPRESS, () => {
  console.log("server is listening to port: " + process.env.PORT_EXPRESS);
});
