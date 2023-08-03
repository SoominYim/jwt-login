import { createWebHashHistory, createRouter } from "vue-router";
import signUp from "./view/SignUp";
import login from "./view/LogIn";
import users from "./view/UserList";
import KakaoLogin from "./view/KakaoLogin";
import GoogleLogin from "./view/GoogleLogin";
import WebSocket from "./view/WebSocket"
import DashBoard from "./view/DashBoard"
import RegiSter from "./view/RegiSter"


import app from "./App";
const routes = [
  {
    path: "/",
    name: "home",
    component: app,
  },
  {
    path: "/signup",
    name: "signup",
    component: signUp,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/users",
    name: "users",
    component: users,
  },
  {
    path: "/kakaologin",
    name: "kakaologin",
    component: KakaoLogin,
  },
  {
    path: "/naverlogin",
    name: "naverlogin",
    component: () =>
      import(/* webpackChunName: "parent" */ "./view/NaverLogin.vue"),
  },
  {
    path: "/googlelogin",
    name: "googlelogin",
    component: GoogleLogin,
  },
  {
    path: "/websocket",
    name: 'websocket',
    component: WebSocket
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component : DashBoard
  },
  {
    path: "/register",
    name: "register",
    component : RegiSter
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


// 상태에 토큰이 있는지 확인
// 이 메서드는 경로를 변경할 때 논리를 수행합니다
router.beforeEach((to, from, next)=>{
  // 인증이 필요한지 확인하는 데 사용합니다
  const protectedRoute = to.matched.some(record => record.meta.requireAuth)
  // 토큰 확인을 진행합니다
  if (protectedRoute && this.$store.state.token === null) {
    next({name: 'home'})
  } else {
    next()
  }
})

export default router;
