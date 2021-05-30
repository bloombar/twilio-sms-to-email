var nodemailer = require("nodemailer")

// a class to handle sending email
function EmailService(config) {
  this.getTransporter = () => {
    // format the transporter object properly
    const transporter = nodemailer.createTransport({
      host: config.host,
      secure: config.secure,
      port: config.port,
      auth: {
        user: config.user,
        pass: config.password,
      },
    })
    return transporter
  }

  this.getMailOptions = (to, subject, text) => {
    // format the mail options object properly
    const mailOptions = {
      from: process.env.EMAIL_FROM_NAME,
      to: to,
      subject: subject,
      text: text,
      // html: html // causes getting flagged as spam!
    }
    return mailOptions
  }

  // send the mail!
  this.send = (to, subject, text) => {
    const transporter = this.getTransporter()
    const mailOptions = this.getMailOptions(to, subject, text)

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`Error sending email to ${to}: ${error}`)
      } else {
        console.log(`Email sent to ${to}: ${info}`)
      }
    })
  } // send
} // EmailService

module.exports = {
  EmailService,
}
