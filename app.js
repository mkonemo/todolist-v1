const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const ejs = require("ejs");

const app = express();

let items = ["Buy food", "Cook food", "Eat food"];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

// ROOT

app.get("/", function(req, res) {
  let day = date.getDate();

  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {
  console.log(req.body);

  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

// WORK

app.get("/work", (req, res) => {
  res.render("list", {
    listTitle: "Work list",
    newListItems: workItems
  });
});

app.post("/work", (req, res) => {
  let item = req.body.newItem;

  workItems.push(item);

  res.redirect("/work");
});

// ABOUT

app.get("/about", (req, res) => {
  res.render("about");
})

// ALL || 404
app.all('*', (req, res) => {
  res.send("404 page");
})

app.listen(4000, () => {
  console.log("Server running on port 4000. ");
});
