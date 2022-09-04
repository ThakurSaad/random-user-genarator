const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Random user is chilling like a villain");
});

app.all("*", (req, res) => {
  res.send("No routes found");
});

app.listen(port, (req, res) => {
  console.log("Who is this random user?");
});
