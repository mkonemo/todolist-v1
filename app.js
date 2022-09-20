const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.get("/", function(req, res){
  let today = new Date();
  let currentDay = today.getDay();
  let day ="";

  if (currentDay === 6 || currentDay === 0) {
    day = "weekend";
  } else {
    day = "working day";
  }

  let currentDayName = today.toLocaleDateString('en-us', {weekday: 'long'});
  res.render("list", {
    kindOfDay: day,
    dayName: currentDayName
  });
});

app.listen(4000, () => {
  console.log("Server running on port 4000. ");
});
