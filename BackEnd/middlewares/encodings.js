const bcrypt = require("bcrypt");

let encodePassword = (req, res, next) => {
  let { user } = req.body || null;

  if (!user || user.password === "" || !user.password) {
    return res.status(401).json({
      ok: false,
      data: null,
      sms: "Invalid username or password",
    });
  } else {
    let encodePassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    if (encodePassword) {
      user.password = encodePassword;
      user.createAt = new Date();
      if (req.sessionID) {
        user.sessionID = req.sessionID;
        next();
      } else {
        return res.status(400).json({
          ok: false,
          data: null,
          sms: "Invalid session",
        });
      }
    } else {
      return res.status(401).json({
        ok: false,
        data: null,
        sms: "Password not encrypted",
      });
    }
  }
};

module.exports = {
  encodePassword,
};
