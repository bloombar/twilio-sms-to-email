# SMS-to-Email

Receives SMS messages via [Twilio](https://twilio.com)'s API, and forwards them to an email address.

Eventually, we will accept email responses to these messages and send them as SMS... that part is not yet done.

## Set up

1. Clone the code
1. Copy the file named `env.example` into a file named `.env`, and replace the values in that file with your own.
1. Run `npm install` to install all dependencies.
1. Run `nodemon node .` to start the app.
1. Use a service such as `ngrok` to generate a public URL that forwards to your local instance.
1. Create a Twilio account, add a phone number that accepts SMS, and set up a Messaging/SMS webhook that will create a POST request to `https://your-ngrok-url/incoming/sms` whenever an incoming SMS arrives.
1. Send a text message from your own phone to your Twilio phone number to test.
