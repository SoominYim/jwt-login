var app = require('express')();
var server = require('http').createServer(app);

//소켓 서버 설정
var io = require('socket.io')(server, {
    cors: {
        origin:'*'
    }
});

app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
})

app.get('/', function (req, res) {
    res.sendFile('Hellow Chating App Server')
})

// connection 수립
io.on('connection', function (socket) {
    console.log('Connet from Client: ' + socket);

    // 클라이언트로 부터 caht 이벤트 전달받음
    socket.on('chat', data => {
        console.log('message from Client: ' + data.message)

        var rtnMessage = {
            message: data.message
        }

        // 클라이언트로 chat 이벤트 전달, broadcase를 추가하면 자신을 제외한 나머지 클라이언트에게만 전달
        socket.broadcast.emit('chat', rtnMessage);
    })

})

server.listen(3001, () => {
    console.log('socket io server listening on port 3001')
})