const fs = require("fs");

// reading json file
const data = fs.readFileSync("users.json");
const users = JSON.parse(data);

module.exports.getAllUser = (req, res) => {
  res.send(users);
};

module.exports.getRandomUser = (req, res) => {
  const randomUser = users[Math.floor(Math.random() * users.length)];
  res.send(randomUser);
};
