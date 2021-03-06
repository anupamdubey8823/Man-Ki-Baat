const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");

const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messageServiceSid = process.env.MESSAGING_SERVICE_SID;
const twilioClient = require('twilio')(accountSid, authToken);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/auth", authRoutes);

app.get('/', (req, res) => {
    res.send("Hello from Man Ki Baat backend!");
})

app.post('/', (req, res) => {
    const { message, user: sender, type, members } = req.body;
    if (type === 'message.new') {
        members
            .filter(member => member.user_id !== sender.id)
            .forEach(({ user }) => {
                if (!user.online) {
                    twilioClient.messages.create({
                        body: `You have a new message from ${message.user.fullName} - ${message.text}`,
                        messagingServiceSid: messageServiceSid,
                        to: user.phoneNumber
                    }) 
                    .then(() => console.log('Message sent'))
                    .catch(err => console.log(err));
                }
            })
        res.status(200).send("Message sent!");
    }
    return res.status(200).send("Not a new message request");
})

app.listen(port, () => console.log(`Server is up and running on port ${port}!`));