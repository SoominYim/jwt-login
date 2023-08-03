<template>
    <div>
        <div id="google-signin-btn"></div>
    </div>
</template>

<script>
export default {
    mounted() {
        // window.gapi.load("client:auth2", () => {
        //     window.gapi.client.init({
        //         clientId:
        //             "578269839810-4ef3u2gijk62putqh5oto80aeb9as7nt.apps.googleusercontent.com",
        //         plugin_name: "Vue 클라이언트",
        //     });
        // });

        window.gapi.signin2.render("google-signin-btn", {
            onsuccess: this.onSignIn,
        });
    },
    methods: {
        onSignIn(googleUser) {
            const profile = googleUser.getBasicProfile();
            console.log(`ID: ${profile.getId()}`);
            console.log(`Full Name: ${profile.getFullName()}`);
            console.log(`Given Name: ${profile.getGivenName()}`);
            console.log(`Family Name: ${profile.getFamilyName()}`);
            console.log(`Image URL: ${profile.getImageUrl()}`);
            console.log(`Email: ${profile.getEmail()}`);
            

            const id_token = googleUser.getAuthResponse().id_token;
            console.log(`ID Token: ${id_token}`);
        },
    },
};
</script>

<style>
</style>