let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendfile('./src/index.html');
});

users = [];
io.on('connection', (socket) => {
    console.log("A user is connected!");
    socket.on('setUsername', (data) => {
        if (users.indexOf(data) > -1) {
            socket.emit('userExists', data + ' username is taken! try some other username');
        } else {
            users.push(data);
            socket.emit('userSet', { username: data });
        }
    });
    socket.on('msg', (data) => {
        io.sockets.emit('newmsg', data);
    });
});
http.listen(3000, () => {
    console.log('Listening on port 3000');
})