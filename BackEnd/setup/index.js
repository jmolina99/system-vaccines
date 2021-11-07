const env = require("dotenv").config(),
  app = require("./app"),
  port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server running on port: ${port}`);
  } else {
    console.error(`Server doesn't work`);
  }
});
