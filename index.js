#!/usr/bin/env node
"use strict"

require("dotenv").config({ silent: true })

// instantiate our custom server
const server = require("./app")()
const port = process.env.PORT || 3000

// start listening on the port
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`)
})

// function to stop listening
const close = () => {
  listener.close()
}

module.exports = {
  close: close,
}
