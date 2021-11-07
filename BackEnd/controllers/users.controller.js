const User = require("../models/User"),
  UserEmployee = require("../models/UserEmployee"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");

let getUserById = async (req, res) => {
  let { id } = req.params,
    user = await User.findById({ _id: id });

  if (user) {
    return res.status(200).json({
      ok: true,
      data: user,
      sms: "",
      token: req.token,
    });
  } else if (user.length === 0) {
    return res.status(404).json({
      ok: true,
      data: null,
      sms: "User not found",
    });
  } else {
    return res.status(500).json({
      ok: false,
      data: null,
      sms: "Server error",
    });
  }
};

let getUserByUsername = async (req, res) => {
  let { username } = req.params,
    user = await User.findOne({ username });

  if (user) {
    return res.status(200).json({
      ok: true,
      data: user,
      sms: "",
      token: req.token,
    });
  } else {
    res.status(404).json({
      ok: false,
      data: null,
      sms: "User not found",
    });
  }
};

let getUsers = async (req, res) => {
  let users = await User.find();

  if (users) {
    return res.status(200).json({
      ok: true,
      data: users,
      sms: "",
      token: req.token,
    });
  } else if (users.length === 0) {
    return res.status(404).json({
      ok: false,
      data: null,
      sms: "Without users to show",
    });
  } else {
    return res.status(500).json({
      ok: false,
      data: null,
      sms: "Server error",
    });
  }
};

let postUser = async (req, res) => {
  let { user } = req.body,
    newUser = new User(user);

  await newUser
    .save()
    .then(() => {
      return res.status(200).json({
        ok: true,
        data: newUser,
        sms: "User created",
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

let putUser = async (req, res) => {
  let { id } = req.params,
    { user } = req.body,
    putUser = await User.updateOne({ _id: id }, { $set: user });

  if (putUser) {
    return res.status(200).json({
      ok: true,
      data: user,
      sms: "User updated",
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

let login = async (req, res) => {
  let { user } = req.body,
    userLog = await User.find({ username: user.username, rol: user.rol });

  if (userLog.length == 1) {
    if (bcrypt.compareSync(user.password, userLog[0].password)) {
      let userData = {
        _id: userLog[0]._id,
        username: userLog[0].username,
        rol: userLog[0].rol,
      };

      let token = jwt.sign(userData, process.env.KEY_JWT, {
        algorithm: "HS256",
        expiresIn: parseInt(process.env.TIME),
      });

      return res.status(200).json({
        ok: true,
        data: user,
        sms: "User found",
        token,
      });
    } else {
      return res.status(200).json({
        ok: false,
        data: null,
        sms: "incorrect password",
      });
    }
  } else {
    return res.status(200).json({
      ok: false,
      data: null,
      sms: "not found",
    });
  }
};

let postRelationUserEmployee = async (req, res) => {
  let { entity } = req.body,
    newRelation = new UserEmployee(entity);

  await newRelation
    .save()
    .then(() => {
      return res.status(200).json({
        ok: true,
        data: newRelation,
        sms: "Relation user - employee created",
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

module.exports = {
  getUserById,
  getUserByUsername,
  getUsers,
  postUser,
  putUser,
  login,
  postRelationUserEmployee,
};
