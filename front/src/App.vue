<template>
    <div>
        <router-link to="/">홈</router-link>&nbsp;
        <router-link to="/signup">회원가입 </router-link>&nbsp;
        <router-link to="/login">로그인</router-link>&nbsp;
        <router-link to="/users">user</router-link>&nbsp;
        <router-link to="/kakaologin">카카오로그인</router-link>&nbsp;
        <router-link to="/naverlogin">네이버로그인</router-link>&nbsp;
        <router-link to="/googlelogin">구글로그인</router-link>&nbsp;
        <router-link to="/WebSocket">웹소켓</router-link>&nbsp;
        <router-link to="/dashboard">대시보드</router-link>
        <router-link to="/register">레지스터</router-link>
        <button @click="logout">로그아웃</button>
        <router-view />
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "App",

    components: {},

    data: () => ({
        //
    }),
    methods: {
        ...mapActions(["getToken", "logout"]),
    },
    created() {
        // this.getToken();
    },
};
</script>

<style lang="scss" scoped>
</style>
