<template>
    <div>
        <v-row>
            <v-col col="12">
                <v-text-field
                    v-model="user.user_id"
                    label="아이디*"
                    :disabled="state == 'ins' ? false : true"
                    :rules="user_id_rule"
                    required
                >
                </v-text-field>
            </v-col>
            <v-col col="12">
                <v-text-field
                    v-model="user.user_pw"
                    label="비밀번호"
                    type="password"
                    :rules="user_pw_rule"
                ></v-text-field>
            </v-col>
        </v-row>
        <button type="submit" @click="login">asadsad</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            state: "ins",
            user: this.$store.state.user,
            user_id_rule: [
                (v) => !!v || "아이디는 필수 입력사항입니다.",
                (v) =>
                    /^[a-zA-Z0-9]*$/.test(v) ||
                    "아이디는 영문+숫자만 입력 가능합니다.",
                (v) =>
                    !(v && v.length >= 15) ||
                    "아이디는 15자 이상 입력할 수 없습니다.",
            ],
            user_pw_rule: [
                (v) =>
                    this.state === "ins"
                        ? !!v || "패스워드는 필수 입력사항입니다."
                        : true,
                (v) =>
                    !(v && v.length >= 30) ||
                    "패스워드는 30자 이상 입력할 수 없습니다.",
            ],
        };
    },
    methods: {
        login() {
            const vm = this;
            console.log(this.user.user_id, this.user.user_pw);
            this.$axios
                .post("/api/users/login", {
                    user: this.user,
                })
                .then(
                    (res) => {
                        if (res.data.success == true) {
                            alert(res.data.message);
                            vm.$router.push(
                                { name: "users" },
                                () => {
                                    window.alert("success");
                                },
                                () => {
                                    window.alert("fail");
                                }
                            );
                        }
                        if (res.data.success == false) {
                            alert(res.data.message);
                            window.location.reload(true);
                        }
                    },
                    (err) => {
                        alert("실패" + err);
                    }
                )
                .catch((err) => {
                    alert(err);
                });
        },
    },
    created() {},
};
</script>

<style lang="scss" scoped>
button {
    width: 100px;
    height: 100px;
    background: #fff;
}
</style>

