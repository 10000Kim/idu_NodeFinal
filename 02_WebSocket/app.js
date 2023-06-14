const { Socket } = require("dgram"); //dgram 모듈 Socket 클래스 가져오기 (사용X)
const express = require("express")   //Express 모듈 가져옵니다.

const http = require("http")         //http 모듈 가져옵니다.

const app = express();               //express 객체 생성
const path = require("path")         //path 모듈 가져옵니다.

const server = http.createServer(app) //app을 이용해 http 서버 생성합니다.
//express에 구현한 app이 http를 통해서 

const socketIO = require("socket.io") //socket.io 모듈 가져오기

const moment = require("moment");     //moment 모듈 가져오기
const { monitorEventLoopDelay } = require("perf_hooks");
//perf_hooks 모듈에서 monitorEventLoopDelay 함수를 가져옵니다.

const io = socketIO(server); 
// server를 이용하여 socket.io의 인스턴스(io)를 생성합니다.

app.use(express.static(path.join(__dirname, "src")))

let connectedUsers = 0; // 연결된 사용자 수를 저장하는 변수입니다.

const PORT = process.env.PORT || 5000;
// 환경 변수에서 포트 번호를 가져오거나 기본값으로 5000을 설정합니다.


 // 클라이언트와의 소켓 연결 이벤트를 처리하는 콜백 함수입니다.
io.on("connection", (socket) => {
    connectedUsers++; // 소켓 연결이 발생하면 연결된 사용자 수 증가
    io.emit("userCount", connectedUsers); // 연결된 사용자 수를 모든 클라이언트에게 전달
  
    socket.on("disconnect", () => {
      connectedUsers--; // 소켓 연결이 해제되면 연결된 사용자 수 감소
      io.emit("userCount", connectedUsers); // 연결된 사용자 수를 모든 클라이언트에게 전달
    })
  
    // 채팅 메시지 이벤트 처리
    socket.on("chatting", (data) => {
      const { name, msg } = data;
      io.emit("chatting", {   // 모든 클라이언트에게 채팅 메시지와 시간 정보를 전송합니다.
        name,
        msg,
        time: moment(new Date()).format("h:ss A"), // 현재 시간을 포맷에 맞게 변환합니다.
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

// 서버 시작
server.listen(PORT, () => console.log(`server is running ${PORT}`))