const express = require("express");
const cors = require("cors");
const app = express();
const expensesRoute = require("./routers/expenseRoute");
const userRoute = require("./routers/userRoute");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const sequelize = require("./util/database");

app.use("/user", userRoute);
app.use("/expense", expensesRoute);
sequelize
  .sync()
  .then(() => {
    console.log("Database Connected Succesfully");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });