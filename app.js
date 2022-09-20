const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

let items = ["Buy food", "Cook food", "Eat food"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  let today = new Date();
  let options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }

  let day = today.toLocaleDateString('en-us', options);

  res.render("list", {kindOfDay: day, newListItems: items});
});

app.post("/", function(req, res) {
  var item = req.body.newItem;

  items.push(item);

  res.redirect("/");
});

app.listen(4000, () => {
  console.log("Server running on port 4000. ");
});
