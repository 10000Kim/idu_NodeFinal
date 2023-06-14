const { Socket } = require("dgram");
const express = require("express")

const http = require("http")

const app = express();
const path = require("path")

const server = http.createServer(app)
//express에 구현한 app이 http를 통해서 

const socketIO = require("socket.io")

const moment = require("moment");
const { monitorEventLoopDelay } = require("perf_hooks");

const io = socketIO(server);


app.use(express.static(path.join(__dirname, "src")))

let connectedUsers = 0; // 연결된 사용자 수

const PORT = process.env.PORT || 5000;



io.on("connection", (socket) => {
    connectedUsers++; // 소켓 연결이 발생하면 연결된 사용자 수 증가
    io.emit("userCount", connectedUsers); // 연결된 사용자 수를 모든 클라이언트에게 전달
  
    socket.on("disconnect", () => {
      connectedUsers--; // 소켓 연결이 해제되면 연결된 사용자 수 감소
      io.emit("userCount", connectedUsers); // 연결된 사용자 수를 모든 클라이언트에게 전달
    })
  
    socket.on("chatting", (data) => {
      const { name, msg } = data;
      io.emit("chatting", {
        name,
        msg,
        time: moment(new Date()).format("h:ss A"),
      })
    })
  })

// io.on("connection", (socket) => {
    
//     socket.on("chatting",(data) => {
//         const { name, msg} = data;
//         io.emit("chatting", {
//             name,
//             msg,
//             time: moment(new Date()).format("h:ss A")
//         })
//     })
// })


server.listen(PORT, () => console.log(`server is running ${PORT}`))