import {
    createStore
} from "vuex";


const store = createStore({
    state: {
        token: null,
        user: {
            user_id: '',
            user_nm: '',
            user_pw: '',
            user_email: ''
        }
    },
    getters: {},
    mutations: {
        // setToken(state, payload) {
        //     state.token = payload
        // },
        // setUser(state, payload) {
        //     state.user.user_id = payload.user.user_id;
        //     state.user.user_nm = payload.user.user_nm;
        //     state.user.user_pw = payload.user.user_pw;
        //     state.user.user_email = payload.user.user_email;
        // },
        // logout() {
        //     localStorage.removeItem('token')
        //     location.reload()
        // }
    },
    actions: {
        // async login({
        //     commit
        // }, user) {
        //     try {
        //         const res = await fetch('/api/users/login', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify(user)
        //         })
        //         const userDB = await res.json()
        //         commit('setToken', userDB.data.token)
        //         localStorage.setItem('token', userDB.data.token)
        //     } catch (error) {
        //         console.log('Error: ', error)
        //     }
        // },
        // getToken({
        //     commit
        // }) {
        //     if (localStorage.getItem('token')) {
        //         commit('setToken', localStorage.getItem('token'))
        //     } else {
        //         commit('setToken', null)
        //     }
        // },
        // async dashboard({
        //     commit
        // }, auth_token) {
        //     try {
        //         const res = await fetch('/api/dashboard', {
        //             method: 'GET',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'auth-token': auth_token
        //             },
        //         })
        //         const userDB = await res.json()
        //         commit('setUser', {
        //             name: userDB.data.user.name
        //         })
        //     } catch (error) {
        //         console.log('Error: ', error)
        //     }
        // },
        // logout({
        //     commit
        // }) {
        //     commit('logout')
        // },
        // async register(user) {
        //     try {
        //         const res = await fetch('/api/user/register', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify(user)
        //         })
        //         const userDB = await res.json()
        //         console.log(userDB)
        //     } catch (error) {
        //         console.log('Error: ', error)
        //     }
        // },
    }
})

export default store;