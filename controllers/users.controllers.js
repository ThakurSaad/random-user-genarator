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

module.exports.saveAUser = (req, res) => {
  const user = req.body;
  users.push(user);
  fs.writeFileSync("users.json", JSON.stringify(users));
  res.status(200).send("success");
};

module.exports.updateAUser = (req, res) => {
  const newInfo = req.body;
  const userId = req.params.id;

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

// module.exports.saveAUser = (req, res) => {
//   const user = req.body;
//   console.log(user);
//   users.find((previousUser) => {
//     if (previousUser.id == user.id) {
//       console.log("print");
//       res.send("match found. Please provide a different ID");
//     } else {
//       users.push(user);
//       const withNewUser = fs.writeFileSync("users.json", JSON.stringify(users));
//       res.send(withNewUser.length);
//     }
//   });
// };
