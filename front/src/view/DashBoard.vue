<template>
    <div class="dashboard">
        <h1>Esta es una ruta protegida</h1>
        {{ token }}
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    created() {
        this.dashboard(this.token);
    },
    computed: {
        ...mapState(["token", "user"]),
    },
    methods: {
        ...mapActions(["dashboard"]),
    },
};
</script>

<style>
</style>