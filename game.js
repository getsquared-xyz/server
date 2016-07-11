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
    res.sendFile(__dirname + '/client/commandprompt.css');
});
serv.listen(2000);
console.log("Server started.");
var b;
var p;
var z;
var SOCKET_LIST = {};
var PLAYER_LIST = {};
var BOXES={};
var gamesize=23000;

var Player = function(id){
	var xr=Math.floor((Math.random() * gamesize-1) + 1);
	var yr=Math.floor((Math.random() * gamesize-1) + 1);
    var self = {
        x:xr,
        y:yr,
        xoff:xr-261,
        yoff:yr-251,
        id:id,
				w:30,
				h:30,
        pressingRight:false,
        pressingLeft:false,
        pressingUp:false,
        pressingDown:false,
        maxSpd:10,
				name:"",
				inv:1,
				box1Count:0,
				points:30,
    }
    self.updatePosition = function(){
        if(self.pressingRight){
					if (self.x<=gamesize-(self.w/2)) {
            self.x += self.maxSpd;
            self.xoff += self.maxSpd;
						}

						}
        if(self.pressingLeft) {
					if (self.x>=10) {
            self.x -= self.maxSpd;
            self.xoff -= self.maxSpd;
					}

						}
        if(self.pressingUp){
					if (self.y>=10) {
            self.y -= self.maxSpd;
            self.yoff -= self.maxSpd;
					}
				}
        if(self.pressingDown){
					if (self.y<=gamesize-(self.h/2)) {
            self.y += self.maxSpd;
            self.yoff += self.maxSpd;
					}
						}
    }
    return self;
}
var Boxes = function(oX,oY, owner,type,id){
    var self = {
        x:oX,
        y:oY,
        time:5,
				Owner:owner,
				Type:type,
				UUID:id,
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
			if (PLAYER_LIST[socket.id].box1Count<2) {
				var player = PLAYER_LIST[socket.id];
				s = Math.random();
		    var box = Boxes(PLAYER_LIST[socket.id].x-(player.w*0.75),PLAYER_LIST[socket.id].y-(player.h*0.50),PLAYER_LIST[socket.id].name,"1",PLAYER_LIST[socket.id].id+1);
		    BOXES[s] = box;
				PLAYER_LIST[socket.id].box1Count++;
				}
    });
			socket.on("name",function(name){
	      used=false;
	      if (name!=="" && name.length < 21 && isValid(name)) {
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
function isInside(x, y, z1, z2, z3, z4) {
    x1 = Math.min(z1, z3);
    x2 = Math.max(z1, z3);
    y1 = Math.min(z2, z4);
    y2 = Math.max(z2, z4);
    if ((x1 <= x ) && ( x <= x2) && (y1 <= y) && (y <= y2)) {
        return true;
    } else {
        return false;
    };
};
function intersects(a, b) {
   function checkContains(point, left, right) {
       return point > left && point < right;
   }
   return  (checkContains(a.x, b.x, b.x + b.w)
             || checkContains(a.x + a.w, b.x, b.x + b.w)) &&
           (checkContains(a.y, b.y, b.y + b.h)
             || checkContains(a.y + a.h, b.y, b.y + b.h));
}
//isInside(rect1.x,rect1.y,rect2.x,rect2.y,rect2.x2,rect2.y2)||isInside(rect1.x+(rect1.w/2),rect1.y,rect2.x,rect2.y,rect2.x2,rect2.y2)
function intersectRect(rect1, rect2) {
	if (isInside(rect1.x,rect1.y,rect2.x,rect2.y,rect2.x2,rect2.y2)||isInside(rect1.x-(rect1.w),rect1.y,rect2.x,rect2.y,rect2.x2,rect2.y2)||isInside(rect1.x,rect1.y-(rect1.h),rect2.x,rect2.y,rect2.x2,rect2.y2)||isInside(rect1.x-(rect1.w),rect1.y-(rect1.h),rect2.x,rect2.y,rect2.x2,rect2.y2)) {
		var socket = SOCKET_LIST[findID(rect1.name)];
		var player = PLAYER_LIST[findID(rect2.owner)];
		rand=Math.floor((Math.random() * 1) + 0.5);
		player.points=Math.floor(player.points+(rect1.points*rand));
		socket.emit('dead', {name:rect1.name,server:"http://jade.getsquared.xyz",killer:rect2.owner,points:rect1.points});
		delete SOCKET_LIST[findID(rect1.name)];
		delete PLAYER_LIST[findID(rect1.name)];
		for(var i in BOXES) {
			if (BOXES[i].Owner==rect1.name) {
				delete BOXES[i];
			}
		}



} else {
}
}
function runCollisionText() {
	for(var i in PLAYER_LIST){

		var player=PLAYER_LIST[i];
		b=[];
		p=65;
		try {



			for(var i in BOXES) {
				if (BOXES[i].UUID == player.id+1) {

					b.push({
							id: BOXES[i].UUID,
							x: BOXES[i].x,
							y: BOXES[i].y,
							owner:BOXES[i].Owner,
					});
				}
			}

			z = {
				x:b[0].x,
				y:b[0].y,
				x2:b[1].x,
				y2:b[1].y,
				owner:b[0].owner
			}
			for(var p in PLAYER_LIST){

				var user=PLAYER_LIST[p];
				console.log(z.owner,user.name);
				if (z.owner != user.name &&user.inv == 0) {
					console.log("Not Owner")
			intersectRect(user, z);
		} else {
			console.log("Owner");
		}
		}
	}
		catch(err) {

		}

	}
}
setInterval(function(){
	for(var i in PLAYER_LIST){
		var player = PLAYER_LIST[i];
		if (player.inv > 0) {
			player.inv--;
		}
	}
},1000);
setInterval(function(){
    for(var i in BOXES){
        var box = BOXES[i];
        if (box.time==0) {
					delete BOXES[i];
					try {
						var player = PLAYER_LIST[findID(box.Owner)];
						if (box.Type=="1") {
						player.box1Count--;
					} else {
						player.box2Count--;
					}
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
	runCollisionText();
	var pack = [];
	for(var i in BOXES){
			var box = BOXES[i];
			pack.push({
					x:box.x,
					y:box.y,
					owner:box.Owner,
					type:box.Type,
					id:box.UUID,
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
						id:player.id,
						points:player.points,
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
