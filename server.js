const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

class Server {
  apiPaths = {
    users: "/api/users",
    forms: "/api/forms",
    menus: "/api/menus",
    auth: "/api/auth",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Read and body parser
    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    this.app.use(bodyParser.json());

    // Public folder
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.auth, require("./routes/auth"));
    this.app.use(this.apiPaths.users, require("./routes/users"));
    this.app.use(this.apiPaths.menus, require("./routes/menus"));
    // this.app.use(this.formsPath, require('../routes/forms'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
    });
  }
}

module.exports = Server;
