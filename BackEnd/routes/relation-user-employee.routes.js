const express = require("express"),
  relationUserEmployeeController = require("../controllers/relation-user-employee.controller");

let api = express.Router();

api.get("/getRelationUserEmployeeByUserId/:id", relationUserEmployeeController.getRelationUserEmployeeByUserId);

module.exports = api;
