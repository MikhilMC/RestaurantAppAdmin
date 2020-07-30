const express = require("express");
const chalk = require("chalk");
const path = require("path");
const bodyParser = require('body-parser')

const app = new express();
const port = process.env.PORT || 3000;

let nav = [
  {
    link: "/add-item",
    name: "ADD ITEM",
  },
  {
    link: "/create-menu",
    name: "CREATE TODAY'S MENU"
  }
];

const addItemRouter = require(path.join(
  __dirname,
  "/src/routes/addItemRouter.js"
))(nav);
const createMenuRouter = require(path.join(
  __dirname,
  '/src/routes/createMenuRouter.js'
))(nav)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));

app.use("/add-item", addItemRouter);
app.use('/create-menu', createMenuRouter);

app.get("/", (req, res) => {
  res.send("connected to Restaurent admin website");
});

app.listen(port, () => {
  console.log("Server is running at port " + chalk.blue.bold(port));
});
