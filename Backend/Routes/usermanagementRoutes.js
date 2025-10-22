const express = require("express");
const { getUsers, addUser, deleteUser } = require("../Controller/UsermanagementController");

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", addUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
