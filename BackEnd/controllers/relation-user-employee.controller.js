const UserEmployee = require("../models/UserEmployee");

let getRelationUserEmployeeByUserId = async (req, res) => {
  let id_user = req.params.id;

  let userEmployee = await UserEmployee.findOne({ id_user });

  if (userEmployee) {
    return res.status(200).json({
      ok: true,
      data: userEmployee,
      sms: "",
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

module.exports = {
  getRelationUserEmployeeByUserId,
};
