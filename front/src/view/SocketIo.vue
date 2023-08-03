<template>
    <div>
        <textarea v-model="message"></textarea>
        <button type="button" @click="sendMessage()">전송asdsada</button>
        {{ message }}
    </div>
</template>

<script>
import { io } from "socket.io-client";

export default {
    data() {
        return {
            socket: null,
            message: "",
            textarea: "",
            receivedMessage: [],
        };
    },
    async created() {
        this.socket = io("http://localhost:3001");
        this.socket.on("chat", (data) => {
            this.textarea += data.message + "\n";
        });
    },
    methods: {
        sendMessage() {
            this.socket.emit("chat", {
                message: this.message,
            });
            this.textarea += this.message + "\n";
            this.message = "";
        },
    },
};
</script>

<style lang="scss" scoped>
button {
    width: 100px;
    height: 50px;
    background: red;
}
</style>