const express = require("express");
const usersController = require("../../controllers/users.controllers");
const router = express.Router();

router.route("/all").get(usersController.getAllUser);

router.route("/random").get(usersController.getRandomUser);

module.exports = router;
