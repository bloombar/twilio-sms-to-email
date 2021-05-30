// express
const express = require("express")
const { EmailService } = require("../services/EmailService")
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const outgoingRouter = ({ config }) => {
  const router = express.Router() // create an express router
  router.use(express.urlencoded({ extended: true })) // body-parser

  router.get("/", async (req, res) => {})

  return router
}

module.exports = outgoingRouter
