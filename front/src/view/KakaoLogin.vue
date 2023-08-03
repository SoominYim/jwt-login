<template>
    <div>
        <a @click="kakaoLogin()" id="cuntom-login-btn">
            <img
                src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
                width="222"
                alt=""
            />
        </a>
        <button @click="kakaoLogout()">카카오로그아웃</button>
        <div>{{ user }}</div>
        <img
            v-if="user.profile_image"
            :src="user.profile_image"
            alt=""
            style="width: 50px; height: 50px; border-radius: 50%"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: [
                {
                    nickname: "",
                    profile_image: "",
                },
            ],
        };
    },
    methods: {
        kakaoLogin() {
            window.Kakao.Auth.login({
                scope: "profile_nickname,profile_image,account_email",
                success: this.getKakaoAccount,
            });
        },

        getKakaoAccount() {
            window.Kakao.API.request({
                url: "/v2/user/me",
                success: (res) => {
                    const kakao_account = res.kakao_account;
                    const nickname = kakao_account.profile.nickname;
                    const thumbnail_image =
                        kakao_account.profile.thumbnail_image_url;
                    const profile_image =
                        kakao_account.profile.profile_image_url;
                    const email = kakao_account.email;
                    console.log("nickname", nickname);
                    console.log("email", email);
                    console.log("thumbnail", thumbnail_image);
                    console.log("pro_image", profile_image);
                    console.log("res", res);
                    alert("로그인");
                    this.user = {
                        nickname: nickname,
                        profile_image: profile_image,
                    };
                },
                fail: (error) => {
                    console.log(error);
                },
            });
        },
        kakaoLogout() {
            window.Kakao.Auth.logout((res) => {
                console.log("로그아웃", res);
            });
        },
    },
};
</script>

<style>
</style>