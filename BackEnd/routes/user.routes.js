const express = require("express"),
  userController = require("../controllers/users.controller"),
  authenticate = require("../middlewares/authenticate"),
  encodings = require("../middlewares/encodings");

let api = express.Router();

api.get("/getUserById/:id", userController.getUserById);
api.get("/getUserByUsername/:username", userController.getUserByUsername);
api.get("/getUsers", userController.getUsers);

api.post("/postUser", [encodings.encodePassword], userController.postUser);
api.post("/login", userController.login);

api.post("/postRelationUserEmployee", userController.postRelationUserEmployee);

api.put("/putUser/:id", [encodings.encodePassword], userController.putUser);

module.exports = api;
