"use strict"

// 서버에 연결하는 소켓 인스턴스 생성합니다.
const socket = io();

const nickname = document.querySelector("#nickname")
const chatlist = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");
// HTML 요소 선택입니다.


// 메시지 전송 함수
function send (){
    const param ={
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit("chatting", param)
}

// 채팅 입력란에서 Enter 키를 누를 경우 메시지 전송
chatInput.addEventListener("keypress", (event) => {
    if(event.keyCode === 13){
        send()
        chatInput.value = ""
    }
})

// 전송 버튼 클릭 시 메시지 전송
sendButton.addEventListener("click", send)

// 채팅 메시지 수신 처리
socket.on("chatting", (data)=> {
    const {name, msg, time} = data
    const item = new LiModel(name, msg, time); // LiModel 객체 생성
    item.makeLi()
    displayContainer.scrollTo(0, displayContainer.scrollHeight) // 화면 스크롤을 가장 아래로 이동
    // li.innerText = `${data.name}님이 - ${data.msg}`;
    // chatlist.appendChild(li)
})

// 사용자 수 업데이트 처리
socket.on("userCount", (count) => {
    const userCountElement = document.querySelector("#userCount")
    userCountElement.innerText = count;
  })

chatInput.addEventListener("input", () => {
    if (chatInput.value !== "") {
        socket.emit("typing"); // 입력 중임을 서버에 알림
    } else {
        socket.emit("stopTyping"); // 입력을 멈춤을 서버에 알림
    }
});


// LiModel 생성자 함수
function LiModel(name, msg, time){
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi=()=>{  // 채팅 메시지를 HTML 리스트 아이템으로 생성
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received")
        const dom = `<span class = "profile">
        <span class="user">${this.name}</span>
        <img class="image" src = "https://placeimg.com/50/50/any" alt="any">
    </span>
    <span class="message">${this.msg}</span>
    <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatlist.appendChild(li)
    }
}

console.log(socket)