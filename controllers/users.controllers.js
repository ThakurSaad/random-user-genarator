const fs = require("fs");

// reading json file
function getUsers() {
  const data = fs.readFileSync("users.json");
  const users = JSON.parse(data);
  return users;
}

module.exports.getAllUser = (req, res) => {
  if (req.query.num === undefined) {
    const users = getUsers();
    console.log("hit", users);
    res.send(users);
  } else {
    const users = getUsers();
    const usersToBeShown = req.query.num;
    const result = users.splice(0, usersToBeShown);
    console.log("hit with query");
    res.send(result);
  }
};

module.exports.getRandomUser = (req, res) => {
  const users = getUsers();
  const randomUser = users[Math.floor(Math.random() * users.length)];
  res.send(randomUser);
};

module.exports.saveAUser = (req, res) => {
  const user = req.body;

  if (
    !user.id ||
    !user.gender ||
    !user.name ||
    !user.contact ||
    !user.address ||
    !user.photoUrl
  ) {
    res.send("Missing properties or values");
  } else {
    const users = getUsers();
    users.push(user);
    fs.writeFileSync("users.json", JSON.stringify(users));
    res.status(200).send("success");
  }
};

module.exports.updateAUser = (req, res) => {
  const newInfo = req.body;
  const userId = req.query.id;
  const users = getUsers();

  const foundUser = users.find(
    (user) => parseInt(user.id) === parseInt(userId)
  );

  if (!foundUser) {
    res.send("no user found");
  } else {
    if (newInfo.id) {
      foundUser.id = newInfo.id;
    }
    if (newInfo.gender) {
      foundUser.gender = newInfo.gender;
    }
    if (newInfo.name) {
      foundUser.name = newInfo.name;
    }
    if (newInfo.contact) {
      foundUser.contact = newInfo.contact;
    }
    if (newInfo.address) {
      foundUser.address = newInfo.address;
    }
    if (newInfo.photoUrl) {
      foundUser.photoUrl = newInfo.photoUrl;
    }

    fs.writeFileSync("users.json", JSON.stringify(users));
    res.status(200).send("success");
  }
};

module.exports.deleteAUser = (req, res) => {
  const userId = req.query.id;
  const users = getUsers();

  const foundUserIndex = users.findIndex(
    (user) => parseInt(user.id) == parseInt(userId)
  );

  if (foundUserIndex !== -1) {
    users.splice(foundUserIndex, 1);
    fs.writeFileSync("users.json", JSON.stringify(users));
    res.status(200).send("success");
  } else {
    res.send("no users found");
  }
};
