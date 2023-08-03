var express = require("express");
var router = express.Router();
const app = express();
const dashboardRoutes = require('./dashboard')
const verifyToken = require('./validate-token')


app.use('/api/dashboard', verifyToken, dashboardRoutes)

// var server = require('http').createServer(app)

// const io = require('socket.io')(server, {
//   cors: {
//     origin: "*"
//   }
// })

// const messages = [];

// 앞단에서 요청이 오고 소켓이 생성되면 이벤트를 발생시킨다.
// 두번째 인자인 콜백함수에 생성된 소켓이 담겨져온다.
// 소켓에는 해당 소켓에 연결된 모든 클라이언트들에게 broadcast를 하거나,
// 이벤트를 발생 혹은 수신할 수 있는 메서드가 있다.

// io.on('connetion', socket => {
//   socket.on('send', message => {
//     messages.push(message)
//   })
//   socket.emit('messages', messages)
// })

// // app.listen이 아닌 http.listen를 사용한다.
// server.listen(3000, () => {
//   console.log('started server')
// })

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express"
  });
});

module.exports = router;