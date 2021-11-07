const jwt = require("jsonwebtoken");

let tokenAuth = (req, res, next) => {
  let token = req.headers.authorization || null;

  jwt.verify(token, process.env.KEY_JWT, (error, decode) => {
    if (error) {
      return res.status(400).json({
        ok: false,
        data: error,
        info: "Invalid token",
      });
    } else {
      let token = jwt.sign({ data: decode.data }, process.env.KEY_JWT, {
        algorithm: "HS256",
        expiresIn: 300,
      });

      req.decode = decode;
      req.token = token;

      next();
    }
  });
};

let emailAuth = (req, res, next) => {
  let employee = req.body.employee;
  let path = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  let validate = path.test(employee.email);
  if (validate) {
    next();
  } else {
    return res.status(401).json({
      ok: false,
      data: null,
      info: "Invalid email",
    });
  }
};

module.exports = {
  tokenAuth,
  emailAuth,
};
