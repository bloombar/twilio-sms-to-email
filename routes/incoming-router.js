// express
const express = require("express")
const session = require("express-session")
const { EmailService } = require("../services/EmailService")
const MessagingResponse = require("twilio").twiml.MessagingResponse

const incomingRouter = ({ config }) => {
  const router = express.Router() // create an express router
  router.use(express.urlencoded({ extended: true })) // body-parser
  router.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  )

  router.post("/sms", (req, res) => {
    /**
     * Receives and responds to an incoming SMS
     */

    // debugging
    console.log("INCOMING MESSAGE!")
    console.log(JSON.stringify(req.body, null, 2))

    // determine whether this is the first message this number has sent us or a subsequent message
    req.session.messageCounter = (req.session.messageCounter || 0) + 1

    // shoot out email
    const emailService = new EmailService({
      host: process.env.EMAIL_FROM_HOST,
      port: process.env.EMAIL_FROM_PORT,
      user: process.env.EMAIL_FROM_ADDRESS,
      password: process.env.EMAIL_FROM_PASSWORD,
      secure: process.env.EMAIL_FROM_SECURE == "true",
    })
    try {
      emailService.send(
        process.env.EMAIL_TO_ADDRESS,
        `Incoming Twilio SMS`,
        JSON.stringify(req.body, null, 2)
      )
    } catch (err) {
      console.log(err)
    }

    const twiml = new MessagingResponse()
    const message = twiml.message()

    // determine what to say
    const msg =
      req.session.messageCounter == 1
        ? `Hola ${req.body.FromCity.toLowerCase()}er!  Que paso?`
        : `Interesting...`

    message.body(msg)

    // message.body(`What do you mean, '${req.body.Body}'?!`)
    // attach an image
    // message.media(
    //   "https://knowledge.kitchen/mediawiki/images/5/5b/Amos_Bloomberg_headshot.jpg"
    // )

    res.writeHead(200, { "Content-Type": "text/xml" })
    res.end(twiml.toString())
  })

  return router
}

module.exports = incomingRouter
