const expess = require("express");
const cors = require("cors");
const app = expess();
const userController = require("./controllers/userController");
const userRoute = require("./routers/userRoute");
app.use(expess.json());
app.use(expess.urlencoded({ extended: true }));
app.use(cors());

const sequelize = require("./util/database");

app.use("/user", userRoute);

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