<template>
    <div class="register">
        <img alt="Vue logo" src="../assets/logo.png" />
        <form @submit.prevent="register(user)">
            <input
                type="text"
                placeholder="Ingrese Nombre"
                v-model="user.name"
            />
            <input
                type="text"
                placeholder="Ingrese Email"
                v-model="user.email"
            />
            <input
                type="password"
                placeholder="Ingrese contraseña"
                v-model="user.password"
            />
            <button type="submit">Registrar</button>
        </form>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
    name: "RegiSter",
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: "",
            },
        };
    },
    methods: {
        ...mapActions(["register"]),
    },
};
</script>