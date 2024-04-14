import express from "express"
import { createServer } from "http"
import logger from 'morgan'
import { Server } from "socket.io"

const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on("disconect", () => {
        console.log("an user has disconnected");
    })
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg)
    })
})

app.use(logger('dev'))

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/client/index.html")
})

server.listen(port, () => {
    console.log(`server runing on port http://localhost:${port}`);
})