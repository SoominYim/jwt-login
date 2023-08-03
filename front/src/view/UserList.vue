<template>
    <div>
        <div v-for="(user, i) in users" :key="i">
            <h2>No.{{ i + 1 }}</h2>
            <h2>아이디:{{ user.user_id }}</h2>
            <h2>pass:{{ user.user_pw }}</h2>
            <h2>이름:{{ user.user_nm }}</h2>
            <h2>email:{{ user.user_email }}</h2>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [],
        };
    },
    mounted() {
        this.$axios.get("/api/users").then((res) => {
            this.users = res.data;
        });
    },
};
</script>

<style lang="scss" scoped>
div {
    div {
        width: 500px;
        height: 200px;
        h2 {
            font-size: 20px;
            color: #000;
        }
    }
}
</style>