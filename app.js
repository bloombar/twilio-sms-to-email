require("dotenv").config({ silent: true })
const express = require("express") // CommonJS import style!
const bodyParser = require("body-parser") // helps process incoming HTTP POST data
const morgan = require("morgan") // middleware for logging HTTP requests.
const cors = require("cors") // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.

// load routes for incoming and outgoing messages
const incomingRouter = require("./routes/incoming-router")
const outgoingRouter = require("./routes/outgoing-router")

// set up server
const server = () => {
  // instantiate an express server object
  const app = express()

  // load general-purpose middleware
  app.use(cors()) // allow cross-origin resource sharing

  // log all incoming HTTP(S) requests, except when testing
  if (process.env.MODE != "test") {
    app.use(morgan("dev"))
  }

  app.use("/static", express.static("public")) // make 'public' directory publicly readable
  app.use("/favicon.ico", express.static("public/favicon.ico")) // serve up favicon

  // load routes, passing relevant configuration settings as necessary
  app.use("/incoming", incomingRouter({})) // requests for just marker data
  app.use("/outgoing", outgoingRouter({})) // requests for just acccount actions

  return app
}

module.exports = server
