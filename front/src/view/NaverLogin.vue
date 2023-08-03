<template>
    <div>
        <div id="naverIdLogin"></div>
        <button @click="logout()">로그아웃</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            naverLogin: null,
        };
    },
    mounted() {
        this.naverLogin = new window.naver.LoginWithNaverId({
            clientId: "XjnUNy6dZC4Nm_y2IgEY", // 개발자센터에서 등록한 clientId
            callbackUrl: "http://localhost:8080/naverlogin", // 개발자센터에서 등록한 callbackUrl
            isPopup: false, // 팝업을 통한 연동처리 여부
            loginButton: {
                // 로그인 버튼타입
                color: "green",
                type: 3,
                height: 60,
            },
        });

        //설정 정보를 초기화하고 연동준비
        this.naverLogin.init();

        this.naverLogin.getLoginStatus((status) => {
            if (status) {
                console.log(status);
                console.log(this.naverLogin.user);

                //필수적으로 받아야 하는 프로필 정보가 있다면 callback 처리 시점에 체크
                var email = this.naverLogin.user.getEmail();
                if (email == undefined || email == null) {
                    alert(
                        "이메일은 필수 정보 입니다. 정보 제공을 동의해주세요."
                    );
                    // 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함
                    this.naverLoginLogin.reprompt();
                    return;
                }
            } else {
                console.log("callback 처리 실패");
            }
        });
    },
    methods: {
        logout() {
            const accessToken = this.naverLogin.accessToken.accessToken;
            const url = `/oauth2.0/token?grant_type=delete&client_id=XjnUNy6dZC4Nm_y2IgEY&client_secret=4sgmtDEjhf&access_token=${accessToken}&service_provider=NAVER`;
            /*           /oauth2.0/token?grant_type=delete&client_id=zFcLWPMTcDQTNTB6iIOy&client_secret=bUW7FZMpS9&access_token=${accessToken}&service_provider=NAVER` */
            /*          `/oauth2.0/token?grant_type=delete&client_id=XjnUNy6dZC4Nm_y2IgEY&client_secret=4sgmtDEjhf&access_token=${accessToken}&service_provider=NAVER`; */
            axios.get(url).then((res) => {
                console.log(res.data);
            });
        },
    },
};
</script>

<style>
</style>