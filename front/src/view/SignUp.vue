<template lang="">
    <div>
<v-form ref="form" lazy-validation>
  <v-row>
    <v-col cols="12">
        <v-text-field 
        v-model="user.user_id" 
            label="아이디*" 
            :rules="user_id_rule" 
            :disabled="state == 'ins' ? false : true"
            required
            >
        </v-text-field>
    </v-col>
    <v-col cols="12">
        <v-text-field 
        v-model="user.user_nm" 
            label="이름*" 
            :rules="user_nm_rule" 
            required
            >
        </v-text-field>
    </v-col>
    <v-col cols="12">
        <v-text-field 
        v-model="user.user_pw" 
            label="비밀번호*" 
            type="password" 
            :rules="user_pw_rule"
            >
        </v-text-field>
    </v-col>
    <v-col cols="12">
        <v-text-field 
        v-model="user.user_pwchk" 
            label="비밀번호 확인*" 
            type="password" 
            :rules="user_pw_rule2"
            >
        </v-text-field>
    </v-col>
    <v-col cols="12">
        <v-text-field 
        v-model="user.user_email" 
            label="이메일"  
            required
            :rules="user_email_rule"
            >
        </v-text-field>
    </v-col>
  </v-row>
    <div class="button">
        <button
        :disabled = "user.user_id == '' || user.user_pw == '' || user.user_nm == '' || user.user_pwchk == '' || user.user_email ==''"
        @click.prevent="signUp">
        가입하기
    </button>
    </div>
</v-form>
    </div>
    <div>
        {{test}}
    </div>
</template>
<script>
export default {
    data() {
        return {
            ids: ["aa111", "bb111"],
            dialog: false,
            state: "ins",
            test: "",
            user: this.$store.state.user,
            user_id_rule: [
                (v) => !!v || "아이디는 필수 입력사항입니다.",
                (v) =>
                    /^[a-zA-Z0-9]*$/.test(v) ||
                    "아이디는 영문+숫자만 입력 가능합니다.",
                (v) =>
                    !(v && v.length >= 15) ||
                    "아이디는 15자 이상 입력할 수 없습니다.",
                (v) => this.checkId(v) || "중복",
            ],

            user_nm_rule: [
                (v) => !!v || "이름은 필수 입력사항입니다.",
                (v) =>
                    !(v && v.length >= 30) ||
                    "이름은 30자 이상 입력할 수 없습니다.",
                (v) =>
                    !/[~!@#$%^&*()_+|<>?:{}]/.test(v) ||
                    "이름에는 특수문자를 사용할 수 없습니다.",
            ],

            user_pw_chk: "",
            user_pw_rule: [
                (v) =>
                    this.state === "ins"
                        ? !!v || "패스워드는 필수 입력사항입니다."
                        : true,
                (v) =>
                    !(v && v.length >= 30) ||
                    "패스워드는 30자 이상 입력할 수 없습니다.",
            ],
            user_pw_rule2: [
                (v) =>
                    this.state === "ins"
                        ? !!v || "패스워드는 필수 입력사항입니다."
                        : true,
                (v) =>
                    !(v && v.length >= 30) ||
                    "패스워드는 30자 이상 입력할 수 없습니다.",
                (v) =>
                    v === this.user.user_pw || "패스워드가 일치하지 않습니다.",
            ],

            user_email_rule: [
                (v) => {
                    const replaceV = v.replace(/(\s*)/g, "");
                    const pattern =
                        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
                    return (
                        pattern.test(replaceV) || "이메일 형식으로 입력해주세요"
                    );
                },
            ],
        };
    },

    methods: {
        async save() {
            const validate = this.$refs.form.validate();
            if (validate) {
                if (confirm("ㅁㄴㅇㄴㅁㅇ")) {
                    const params = {
                        user_id: this.user.user_id,
                        user_nm: this.user.user_nm,
                        user_pw: this.user.user_pw,
                        user_email: this.user.user_email,
                    };
                    if (this.state == "upd") {
                        params._id = this.user.user_info._id;
                    }
                }
            }
        },
        checkId(v) {
            for (var i = 0; i < this.ids.length; i++) {
                if (this.ids[i] === v) {
                    return false;
                }
            }
            return true;
        },
        signUp() {
            const vm = this;
            this.$axios
                .post("/api/users/signup", {
                    user: this.user,
                })
                .then((res) => {
                    if (res.data.success == true) {
                        alert(res.data.message);
                        vm.$router.push(
                            { name: "login" },
                            () => {
                                window.alert("success");
                            },
                            () => {
                                window.alert("fail");
                            }
                        );
                        this.user.user_id = "";
                        this.user.user_nm = "";
                        this.user.user_pw = "";
                        this.user.user_email = "";
                        this.user_pw_chk = "";
                    }
                    if (res.data.success == false) {
                        alert(res.data.message);
                    }
                })
                .catch((error) => {
                    alert(error);
                    console.log(error);
                });
        },
        mounted() {
            this.$axios
                .get(
                    "https://fde3c043-e635-4e24-9433-a662e26891ea.mock.pstmn.io/test"
                )
                .then((res) => (this.test = res.body));
        },
    },
};
</script>
<style lang="scss" scoped>
div {
    text-align: center;
}

button {
    width: 100px;
    height: 50px;
    background: tomato;
    border-radius: 20px;
}
button:disabled {
    background: #ccc;
    border-radius: 20px;
}
</style>
