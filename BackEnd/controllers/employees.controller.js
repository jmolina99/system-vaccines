const Employee = require("../models/Employee");

let getEmployeeById = async (req, res) => {
  let { id } = req.params,
    employee = await Employee.findById({ _id: id });

  if (employee) {
    return res.status(200).json({
      ok: true,
      data: employee,
      sms: "",
      token: req.token,
    });
  } else if (employee.length === 0) {
    return res.status(404).json({
      ok: true,
      data: null,
      sms: "Employee not found",
    });
  } else {
    return res.status(500).json({
      ok: false,
      data: null,
      sms: "Server error",
    });
  }
};

let getEmployees = async (req, res) => {
  let employees = await Employee.find();

  if (employees) {
    return res.status(200).json({
      ok: true,
      data: employees,
      sms: "",
      token: req.token,
    });
  } else if (employees.length === 0) {
    return res.status(404).json({
      ok: false,
      data: null,
      sms: "Without employees to show",
    });
  } else {
    return res.status(500).json({
      ok: false,
      data: null,
      sms: "Server error",
    });
  }
};

let postEmployee = async (req, res) => {
  let { employee } = req.body;

  if (employee.type_vaccine == "") {
    employee.type_vaccine = null;
  }

  let newEmployee = new Employee(employee);

  await newEmployee
    .save()
    .then(() => {
      return res.status(200).json({
        ok: true,
        data: newEmployee,
        sms: "Employee created",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        ok: false,
        data: null,
        sms: error,
      });
    });
};

let putEmployee = async (req, res) => {
  let { id } = req.params,
    { employee } = req.body,
    putEmployee = await Employee.updateOne({ _id: id }, { $set: employee });

  if (putEmployee) {
    return res.status(200).json({
      ok: true,
      data: employee,
      sms: "Employee updated",
      token: req.token,
    });
  } else {
    return res.status(500).json({
      ok: false,
      data: null,
      sms: "Server error",
    });
  }
};

let removeEmployee = async (req, res) => {
  let { id } = req.params,
    removeEmployee = await Employee.deleteOne({ _id: id });

  if (removeEmployee) {
    return res.status(200).json({
      ok: true,
      data: null,
      info: "Employee removed",
    });
  } else {
    return res.status(500).json({
      ok: false,
      data: null,
      info: "Server error",
    });
  }
};

let getEmployeeByStatusVaccine = async (req, res) => {
  let { status_vaccine } = req.params,
    employee = await Employee.find({ status_vaccine });

  if (employee) {
    return res.status(200).json({
      ok: true,
      data: employee,
      sms: "",
      token: req.token,
    });
  } else {
    res.status(404).json({
      ok: false,
      data: null,
      sms: "Employees not found",
    });
  }
};

let getEmployeeByTypeVaccine = async (req, res) => {
  let { type_vaccine } = req.params,
    employee = await Employee.find({ type_vaccine });

  if (employee) {
    return res.status(200).json({
      ok: true,
      data: employee,
      sms: "",
      token: req.token,
    });
  } else {
    res.status(404).json({
      ok: false,
      data: null,
      sms: "Employees not found",
    });
  }
};

let getEmployeeByRangeDate = async (req, res) => {
  let { start_date, end_date } = req.params,
    employee = await Employee.find({
      date_vaccine: {
        $gte: new Date(new Date(start_date).setHours(00, 00, 00)),
        $lt: new Date(new Date(end_date).setHours(23, 59, 59)),
      },
    });

  if (employee) {
    return res.status(200).json({
      ok: true,
      data: employee,
      sms: "",
      token: req.token,
    });
  } else {
    res.status(404).json({
      ok: false,
      data: null,
      sms: "Employees not found",
    });
  }
};

let getEmployeesByParams = async (req, res) => {
  let dataFilter = req.body;

  if (dataFilter.status_vaccine !== "" && dataFilter.status_vaccine === "on") {
    dataFilter.status_vaccine = true;
  } else if (
    dataFilter.status_vaccine !== "" &&
    dataFilter.status_vaccine === "off"
  ) {
    dataFilter.status_vaccine = false;
  }

  console.log(dataFilter);

  // Filter 1
  if (
    dataFilter.status_vaccine !== "" &&
    dataFilter.type_vaccine == "" &&
    dataFilter.start_date == "" &&
    dataFilter.end_date == ""
  ) {
    console.log(1);
    let status_vaccine = dataFilter.status_vaccine;
    console.log(status_vaccine);
    let employees = await Employee.find({ status_vaccine });
    console.log(employees);

    if (employees) {
      return res.status(200).json({
        ok: true,
        data: employees,
        sms: "",
        token: req.token,
      });
    } else {
      res.status(404).json({
        ok: false,
        data: null,
        sms: "Employees not found",
      });
    }
  }

  // Filter 2
  if (
    dataFilter.status_vaccine == "" &&
    dataFilter.type_vaccine !== "" &&
    dataFilter.start_date == "" &&
    dataFilter.end_date == ""
  ) {
    console.log(2);
    let type_vaccine = dataFilter.type_vaccine;
    let employees = await Employee.find({ type_vaccine });

    if (employees) {
      return res.status(200).json({
        ok: true,
        data: employees,
        sms: "",
        token: req.token,
      });
    } else {
      res.status(404).json({
        ok: false,
        data: null,
        sms: "Employees not found",
      });
    }
  }

  // Filter 3
  if (
    dataFilter.status_vaccine == "" &&
    dataFilter.type_vaccine == "" &&
    dataFilter.start_date !== "" &&
    dataFilter.end_date !== ""
  ) {
    console.log(3);
    let employees = await Employee.find({
      date_vaccine: {
        $gte: new Date(new Date(dataFilter.start_date).setHours(00, 00, 00)),
        $lt: new Date(new Date(dataFilter.end_date).setHours(23, 59, 59)),
      },
    });

    if (employees) {
      return res.status(200).json({
        ok: true,
        data: employees,
        sms: "",
        token: req.token,
      });
    } else {
      res.status(404).json({
        ok: false,
        data: null,
        sms: "Employees not found",
      });
    }
  }

  // Filter 1 - 2
  if (
    dataFilter.status_vaccine !== "" &&
    dataFilter.type_vaccine !== "" &&
    dataFilter.start_date == "" &&
    dataFilter.end_date == ""
  ) {
    console.log("1-2");
    let status_vaccine = dataFilter.status_vaccine;
    let type_vaccine = dataFilter.type_vaccine;
    let employees = await Employee.find({ status_vaccine, type_vaccine });

    if (employees) {
      return res.status(200).json({
        ok: true,
        data: employees,
        sms: "",
        token: req.token,
      });
    } else {
      res.status(404).json({
        ok: false,
        data: null,
        sms: "Employees not found",
      });
    }
  }

  // Filter 1 - 3
  if (
    dataFilter.status_vaccine !== "" &&
    dataFilter.type_vaccine == "" &&
    dataFilter.start_date !== "" &&
    dataFilter.end_date !== ""
  ) {
    console.log("1-3");
    let status_vaccine = dataFilter.status_vaccine;
    let employees = await Employee.find({
      status_vaccine,
      date_vaccine: {
        $gte: new Date(new Date(dataFilter.start_date).setHours(00, 00, 00)),
        $lt: new Date(new Date(dataFilter.end_date).setHours(23, 59, 59)),
      },
    });

    if (employees) {
      return res.status(200).json({
        ok: true,
        data: employees,
        sms: "",
        token: req.token,
      });
    } else {
      res.status(404).json({
        ok: false,
        data: null,
        sms: "Employees not found",
      });
    }
  }

  // Filter 2 - 3
  if (
    dataFilter.status_vaccine == "" &&
    dataFilter.type_vaccine !== "" &&
    dataFilter.start_date !== "" &&
    dataFilter.end_date !== ""
  ) {
    console.log("2-3");
    let type_vaccine = dataFilter.type_vaccine;
    let employees = await Employee.find({
      type_vaccine,
      date_vaccine: {
        $gte: new Date(new Date(dataFilter.start_date).setHours(00, 00, 00)),
        $lt: new Date(new Date(dataFilter.end_date).setHours(23, 59, 59)),
      },
    });

    if (employees) {
      return res.status(200).json({
        ok: true,
        data: employees,
        sms: "",
        token: req.token,
      });
    } else {
      res.status(404).json({
        ok: false,
        data: null,
        sms: "Employees not found",
      });
    }
  }

  // Filter 1 - 2 - 3
  if (
    dataFilter.status_vaccine !== "" &&
    dataFilter.type_vaccine !== "" &&
    dataFilter.start_date !== "" &&
    dataFilter.end_date !== ""
  ) {
    console.log("1-2-3");
    let status_vaccine = dataFilter.status_vaccine;
    let type_vaccine = dataFilter.type_vaccine;
    let employees = await Employee.find({
      status_vaccine,
      type_vaccine,
      date_vaccine: {
        $gte: new Date(new Date(dataFilter.start_date).setHours(00, 00, 00)),
        $lt: new Date(new Date(dataFilter.end_date).setHours(23, 59, 59)),
      },
    });

    if (employees) {
      return res.status(200).json({
        ok: true,
        data: employees,
        sms: "",
        token: req.token,
      });
    } else {
      res.status(404).json({
        ok: false,
        data: null,
        sms: "Employees not found",
      });
    }
  }
};

module.exports = {
  getEmployeeById,
  getEmployees,
  getEmployees,
  postEmployee,
  putEmployee,
  removeEmployee,
  getEmployeeByStatusVaccine,
  getEmployeeByTypeVaccine,
  getEmployeeByRangeDate,
  getEmployeesByParams,
};
