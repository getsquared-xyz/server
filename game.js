var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));
app.get('/game',function(req, res) {
    res.sendFile(__dirname + '/client/game.html');
});
app.get('/style',function(req, res) {
    res.sendFile(__dirname + '/client/style.css');
});
serv.listen(2000);
console.log("Server started.");

var SOCKET_LIST = {};
var PLAYER_LIST = {};

var Player = function(id){
    var self = {
        x:250,
        y:250,
        xoff:0,
        yoff:0,
        id:id,
        pressingRight:false,
        pressingLeft:false,
        pressingUp:false,
        pressingDown:false,
        maxSpd:10,
	name:""
    }
    self.updatePosition = function(){
        if(self.pressingRight){
            self.x += self.maxSpd;
            self.xoff += self.maxSpd;
						console.log(self.xoff);
						}
        if(self.pressingLeft) {
            self.x -= self.maxSpd;
            self.xoff -= self.maxSpd;
						console.log(self.xoff);
						}
        if(self.pressingUp){
            self.y -= self.maxSpd;
            self.yoff -= self.maxSpd;
						console.log(self.yoff);
						}
        if(self.pressingDown){
            self.y += self.maxSpd;
            self.yoff += self.maxSpd;
						console.log(self.yoff);
						}
    }
    return self;
}
function isValid(str) { return /^\w+$/.test(str); }
var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;

    var player = Player(socket.id);
    PLAYER_LIST[socket.id] = player;

    socket.on('disconnect',function(){
        delete SOCKET_LIST[socket.id];
        delete PLAYER_LIST[socket.id];
    });
		socket.on("name",function(name){
			PLAYER_LIST[socket.id].name=name;
			/*
      used=false;
      if (name!=="" && name.length < 11 && isValid(name)) {
        for(var i in PLAYER_LIST){
          var player = PLAYER_LIST[i];
          if (player.name==name) {
            PLAYER_LIST[socket.id].name="Rand:"+Math.floor(Math.random()*(10-1+1)+1);
            used = true;
						break;
          }
        }
        if (used==false) {
        PLAYER_LIST[socket.id].name=name;
        }
			}
			*/
    });

    socket.on('keyPress',function(data){
        if(data.inputId === 'left')
            player.pressingLeft = data.state;
        else if(data.inputId === 'right')
            player.pressingRight = data.state;
        else if(data.inputId === 'up')
            player.pressingUp = data.state;
        else if(data.inputId === 'down')
            player.pressingDown = data.state;
    });


});

setInterval(function(){
    var pack = [];
    for(var i in PLAYER_LIST){
        var player = PLAYER_LIST[i];
        player.updatePosition();
        pack.push({
            xoff:player.xoff,
            yoff:player.yoff,
            x:player.x,
            y:player.y,
            number:player.number,
						name:player.name,
        });
    }
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions',pack);
    }




},1000/25);
