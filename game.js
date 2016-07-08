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
var BOXES={};
var gamesize=1000;
var gamesize2=2000;
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
				name:"",
				boxCount:0
    }
    self.updatePosition = function(){
        if(self.pressingRight){
					if (self.x<=gamesize-432.475) {
            self.x += self.maxSpd;
            self.xoff += self.maxSpd;
						}

						}
        if(self.pressingLeft) {
					if (self.x>=-422.475) {
            self.x -= self.maxSpd;
            self.xoff -= self.maxSpd;
					}

						}
        if(self.pressingUp){
					if (self.y>=-97) {
            self.y -= self.maxSpd;
            self.yoff -= self.maxSpd;
					}
				}
        if(self.pressingDown){
					if (self.y<=gamesize-102) {
            self.y += self.maxSpd;
            self.yoff += self.maxSpd;
					}
						}
    }
    return self;
}
var Boxes = function(oX,oY, owner){
    var self = {
        x:oX,
        y:oY,
        time:5,
				Owner:owner
    }
    self.updatePosition = function(){

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
		socket.on('Space',function(){
			if (PLAYER_LIST[socket.id].boxCount<4) {
				s = Math.random();
		    var box = Boxes(PLAYER_LIST[socket.id].x,PLAYER_LIST[socket.id].y,PLAYER_LIST[socket.id].name);
		    BOXES[s] = box;
				PLAYER_LIST[socket.id].boxCount++;
			}
			if (PLAYER_LIST[socket.id].boxCount==4) {
				rectofDEATH();
			}
    });
		    function rectofDEATH(){
            socket.emit("rectofDEATH",'true');
				}
			socket.on("name",function(name){
	      used=false;
	      if (name!=="" && name.length < 11 && isValid(name)) {
	        for(var i in PLAYER_LIST){
	          var player = PLAYER_LIST[i];
	          if (player.name==name) {
	            PLAYER_LIST[socket.id].name="Rand:"+Math.floor(Math.random()*(10-1+1)+1);
	            used = true;
	          }
	        }
	        if (used==false) {
	        PLAYER_LIST[socket.id].name=name;
	        }else
	        {
	          SOCKET_LIST[socket.id].emit('adminRequest', "location.replace('http://getsquared.xyz/');");
	        }
	      } else
	      {
	        SOCKET_LIST[socket.id].emit('adminRequest', "location.replace('http://getsquared.xyz/');");
	      }
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
function kickAll() {
	for(var i in SOCKET_LIST){
			var socket = SOCKET_LIST[i];
			socket.emit('adminRequest', "location.replace('http://getsquared.xyz/server-closed.html')");

	}
}
function findID(username) {
  for(var i in PLAYER_LIST){
    if (PLAYER_LIST[i].name==username) {
      return PLAYER_LIST[i].id;
    }
  }
}
setInterval(function(){
    for(var i in BOXES){
        var box = BOXES[i];
        if (box.time==0) {
					delete BOXES[i];
					try {
						var player = PLAYER_LIST[findID(box.Owner)];
						player.boxCount--;
					}
					catch(err) {
    				console.log("Player Left Before Box Removed")
					}

				} else {
					box.time=box.time-1;
				}
    }
},1000);
setInterval(function(){
	var pack = [];
	for(var i in BOXES){
			var box = BOXES[i];
			pack.push({
					x:box.x,
					y:box.y,
					owner:box.Owner
			});
	}
	for(var i in SOCKET_LIST){
			var socket = SOCKET_LIST[i];
			socket.emit('Boxes',pack);
	}
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
process.on('SIGINT', function () {
    console.log('Kicking all users');
		kickAll();
    process.exit(1)
});
