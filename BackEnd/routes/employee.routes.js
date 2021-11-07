const express = require("express"),
  employeeController = require("../controllers/employees.controller"),
  authenticate = require("../middlewares/authenticate");

let api = express.Router();

api.get("/getEmployeeById/:id", employeeController.getEmployeeById);
api.get("/getEmployees", employeeController.getEmployees);

api.get("/getEmployeeByStatusVaccine/:status_vaccine?", employeeController.getEmployeeByStatusVaccine);
api.get("/getEmployeeByTypeVaccine/:type_vaccine?", employeeController.getEmployeeByTypeVaccine);
api.get("/getEmployeeByRangeDate/:start_date?/:end_date?", employeeController.getEmployeeByRangeDate);

api.post("/getEmployeesByParams", employeeController.getEmployeesByParams);

api.post("/postEmployee", employeeController.postEmployee);

api.put("/putEmployee/:id", employeeController.putEmployee);

api.delete("/removeEmployee/:id", employeeController.removeEmployee);

module.exports = api;
