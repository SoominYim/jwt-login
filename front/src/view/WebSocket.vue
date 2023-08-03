<template>
    <div>
        <textarea
            ref="chatInput"
            v-model="message"
            name=""
            cols="30"
            rows="10"
            id="chatMessage"
        >
        </textarea>
        <button @click="sendMessage">전송</button>
        <div v-for="(chat, i) in chats" :key="i">
            {{ chat }}
        </div>
    </div>
</template>

<script>
import { io } from "socket.io-client";

export default {
    data() {
        return {
            socket: null,
            message: "",
            receiveMessage: [],
            chats: [],
        };
    },
    async created() {
        // 소켓 서버와 연결한다.
        // 여기서 서버에서 지정해놓은 io.on('connection') 이벤트가 실행된다.
        // 그리고 생성된 소켓을 반환한다.
        this.socket = io("http://localhost:3000");

        this.socket.on("connect", () => {});

        this.socket.on("messages", (messages) => {
            this.receiveMessage = messages;
        });
    },
    methods: {
        sendMessage() {
            this.socket.emit("send", this.message);
            this.chats.push(this.message);
            document.getElementById("chatMessage").value = "";
        },
    },
};
</script>

<style>
</style> 