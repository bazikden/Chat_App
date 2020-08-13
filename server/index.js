require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const { Chat } = require('./models/Chat')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require('./config/database')
const server = require('http').createServer(app)
const io = require('socket.io')(server)



db.on('connect', () => console.log('Database connected...'))
db.on('error', () => console.log('Failed to connect DB...'))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/users', require('./routes/users'));
app.use('/api/chats', require('./routes/chats'))

io.on('connection', socket => {
  socket.on('Input chat message', async (msg) => {
    try {
      const message = await Chat.create({
        message: msg.message,
        sender: msg._id,
        type: msg.image
      })
      const newMessage = await Chat.findOne({ _id: message._id }).populate('sender', 'name image')
      io.sockets.emit("Output chat message", newMessage)

    } catch (error) {
      console.log("Error", error)
    }
  })

})
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});