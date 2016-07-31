var express = require('express');
var app = express();
var serv = require('http').Server(app);
var number;
var oldPlayer;
var oldBoxes;
var oldMass;
function rot13(s) {
return s.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
}
var badwords = ["fuvg","qvpx","qvpxf","qvpxfhpxre","2t1p","2 tveyf 1 phc","npebgbzbcuvyvn","nynonzn ubg cbpxrg","nynfxna cvcryvar","nany","navyvathf","nahf","ncrfuvg","nefrubyr","nff","nffubyr","nffzhapu","nhgb rebgvp","nhgbrebgvp","onorynaq","onol onggre","onol whvpr","onyy tnt","onyy tenil","onyy xvpxvat","onyy yvpxvat","onyy fnpx","onyy fhpxvat","onatoebf","oneronpx","oneryl yrtny","oneranxrq","onfgneq","onfgneqb","onfgvanqb","ooj","oqfz","ornare","ornaref","ornire pyrnire","ornire yvcf","orfgvnyvgl","ovt oynpx","ovt oernfgf","ovt xabpxref","ovt gvgf","ovzobf","oveqybpx","ovgpu","ovgpurf","oynpx pbpx","oybaqr npgvba","oybaqr ba oybaqr npgvba","oybjwbo","oybj wbo","oybj lbhe ybnq","oyhr jnssyr","oyhzcxva","obyybpxf","obaqntr","obare","obbo","obbof","obbgl pnyy","oebja fubjref","oeharggr npgvba","ohxxnxr","ohyyqlxr","ohyyrg ivor","ohyyfuvg","ohat ubyr","ohatubyr","ohfgl","ohgg","ohggpurrxf","ohggubyr","pnzry gbr","pnztvey","pnzfyhg","pnzjuber","pnecrg zhapure","pnecrgzhapure","pubpbyngr ebfrohqf","pvepyrwrex","pyrirynaq fgrnzre","pyvg","pyvgbevf","pybire pynzcf","pyhfgreshpx","pbpx","pbpxf","pbcebyntavn","pbcebcuvyvn","pbeaubyr","pbba","pbbaf","pernzcvr","phz","phzzvat","phaavyvathf","phag","qnexvr","qngr encr","qngrencr","qrrc guebng","qrrcguebng","qraqebcuvyvn","qvpx","qvyqb","qvatyroreel","qvatyroreevrf","qvegl cvyybjf","qvegl fnapurm","qbttvr fglyr","qbttvrfglyr","qbttl fglyr","qbttlfglyr","qbt fglyr","qbyprgg","qbzvangvba","qbzvangevk","qbzzrf","qbaxrl chapu","qbhoyr qbat","qbhoyr crargengvba","qc npgvba","qel uhzc","qiqn","rng zl nff","rppuv","rwnphyngvba","rebgvp","rebgvfz","rfpbeg","rhahpu","snttbg","srpny","srypu","sryyngvb","srygpu","srznyr fdhvegvat","srzqbz","svttvat","svatreonat","svatrevat","svfgvat","sbbg srgvfu","sbbgwbo","sebggvat","shpx","shpx ohggbaf","shpxva","shpxvat","shpxgneqf","shqtr cnpxre","shqtrcnpxre","shgnanev","tnat onat","tnl frk","travgnyf","tvnag pbpx","tvey ba","tvey ba gbc","tveyf tbar jvyq","tbngpk","tbngfr","tbq qnza","tbxxha","tbyqra fubjre","tbbqcbbc","tbb tvey","tbertnfz","tebcr","tebhc frk","t-fcbg","theb","unaq wbo","unaqwbo","uneq pber","uneqpber","uragnv","ubzbrebgvp","ubaxrl","ubbxre","ubg pney","ubg puvpx","ubj gb xvyy","ubj gb zheqre","uhtr sng","uhzcvat","vaprfg","vagrepbhefr","wnpx bss","wnvy onvg","wnvyonvg","wryyl qbahg","wrex bss","wvtnobb","wvttnobb","wvttreobb","wvmm","whttf","xvxr","xvaonxh","xvaxfgre","xvaxl","xaboovat","yrngure erfgenvag","yrngure fgenvtug wnpxrg","yrzba cnegl","ybyvgn","ybirznxvat","znxr zr pbzr","znyr fdhvegvat","znfgheongr","zrantr n gebvf","zvys","zvffvbanel cbfvgvba","zbgureshpxre","zbhaq bs irahf","ze unaqf","zhss qvire","zhssqvivat","anzoyn","anjnfuv","arteb","arbanmv","avttn","avttre","avt abt","avzcubznavn","avccyr","avccyrf","afsj vzntrf","ahqr","ahqvgl","alzcub","alzcubznavn","bpgbchffl","bzbenfuv","bar phc gjb tveyf","bar thl bar wne","betnfz","betl","cnrqbcuvyr","cnxv","cnagvrf","cnagl","crqborne","crqbcuvyr","crttvat","cravf","cubar frk","cvrpr bs fuvg","cvffvat","cvff cvt","cvffcvt","cynlobl","cyrnfher purfg","cbyr fzbxre","cbalcynl","cbbs","cbba","cbbagnat","chanal","cbbc puhgr","cbbcpuhgr","cbea","cbeab","cbeabtencul","cevapr nyoreg cvrepvat","cgup","chorf","chffl","dhrns","dhrrs","dhvz","enturnq","entvat obare","encr","encvat","encvfg","erpghz","erirefr pbjtvey","evzwbo","evzzvat","ebfl cnyz","ebfl cnyz naq ure 5 fvfgref","ehfgl gebzobar","fnqvfz","fnagbehz","fpng","fpuybat","fpvffbevat","frzra","frk","frkb","frkl","funirq ornire","funirq chffl","furznyr","fuvonev","fuvg","fuvgoyvzc","fuvggl","fubgn","fuevzcvat","fxrrg","fynagrlr","fyhg","f&z","fzhg","fangpu","fabjonyyvat","fbqbzvmr","fbqbzl","fcvp","fcybbtr","fcybbtr zbbfr","fcbbtr","fcernq yrtf","fchax","fgenc ba","fgencba","fgenccnqb","fgevc pyho","fglyr qbttl","fhpx","fhpxf","fhvpvqr tveyf","fhygel jbzra","fjnfgvxn","fjvatre","gnvagrq ybir","gnfgr zl","grn onttvat","guerrfbzr","guebngvat","gvrq hc","gvtug juvgr","gvg","gvgf","gvggvrf","gvggl","gbathr va n","gbcyrff","gbffre","gbjryurnq","genaal","gevonqvfz","gho tvey","ghotvey","ghful","gjng","gjvax","gjvaxvr","gjb tveyf bar phc","haqerffvat","hcfxveg","herguen cynl","hebcuvyvn","intvan","irahf zbhaq","ivoengbe","ivbyrg jnaq","ibenercuvyvn","iblrhe","ihyin","jnax","jrgonpx","jrg qernz","juvgr cbjre","jenccvat zra","jevaxyrq fgnesvfu","kk","kkk","lnbv","lryybj fubjref","lvssl","mbbcuvyvn","🖕"].map(rot13);
function cleanUp(text){
    for(var i = 0; i < badwords.length; i++){
        if(new RegExp(badwords[i], "i").test(text)){
            return Array(text.length+1).join("*");
        }
    }
    return text;

}

app.get('/online', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.send('{"Online":"Online", "Players":"' + Object.size(PLAYER_LIST) + '"}');
});
var url;
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));
app.get('/game', function(req, res) {
    res.sendFile(__dirname + '/client/game.html');
    url = req.get('host').replace(".getsquared.xyz", "");
});
app.get('/style', function(req, res) {
    res.sendFile(__dirname + '/client/style.css');
});
serv.listen(2000);
console.log("Server started.");
var b;
var p;
var z;
var SOCKET_LIST = {};
var PLAYER_LIST = {};
var BOXES = {};
var MASSYSQUARES = {};
var MASSYSQUARESCAP = 100;
var gamesize = 4300;
var adminpass = "Potatoz"
Object.size = function(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
var Player = function(id) {
    var xr = (Math.floor((Math.random() * gamesize - 1) + 1)) - 1;
    var yr = (Math.floor((Math.random() * gamesize - 1) + 1)) - 1;
    var self = {
        x: xr,
        y: yr,
        xoff: xr - 261,
        yoff: yr - 251,
        id: id,
        w: 30,
        h: 30,
        Mousex: 0,
        Mousey: 0,
        maxSpd: 10,
        name: "",
        inv: 1,
        box1Count: 0,
        box2Count: 0,
        points: 30,
        Incolor: 000000,
        Outcolor: 000000,
    }
    self.updatePosition = function() {
      if (self.Mousex <= 10){
        self.Mousex=self.Mousex;
      }else{
        self.Mousex=10;
      }
      if (self.Mousey <= 10){
        self.Mousey=self.Mousey;
      }else{
        self.Mousey=10;
      }
      if (self.Mousex >= -10){
        self.Mousex=self.Mousex;
      }else{
        self.Mousex= -10;
      }
      if (self.Mousey >= -10){
        self.Mousey=self.Mousey;
      }else{
        self.Mousey= -10;
      }
      if (self.Mousex <= 10 && self.Mousey <= 10){
            if (self.x < gamesize && self.x >= 10) {
                self.x += self.Mousex;
                self.xoff += self.Mousex;

            }else{
              if (self.x <= 10 && self.x > -20 && self.Mousex > 0 || self.x >= gamesize-10 && self.x < gamesize+10 && self.Mousex < 0 ) {
                self.x += self.Mousex;
                self.xoff += self.Mousex;

              }
            }
            if (self.y >= 10 && self.y < gamesize) {
              self.y += self.Mousey;
              self.yoff += self.Mousey;

            }else{
              if (self.y <= 10 && self.y > -20 && self.Mousey > 0 || self.y >= gamesize-10 && self.y < gamesize+10 && self.Mousey < 0 ) {
                self.y += self.Mousey;
                self.yoff += self.Mousey;

              }
            }
          }
  }
    return self;
}
var MS = function(id) {
    var self = {
        x: Math.floor((Math.random() * gamesize - 1) + 1),
        y: Math.floor((Math.random() * gamesize - 1) + 1),
        points: 10,
        w: 15,
        h: 15,
        id: id
    }
    return self;
}
var Boxes = function(oX, oY, owner, type, id) {
    var self = {
        x: oX,
        y: oY,
        time: 5,
        Owner: owner,
        Type: type,
        UUID: id,
    }
    self.updatePosition = function() {

    }
    return self;
}

function isValid(str) {
    return /^\w+$/.test(str);
}
var io = require('socket.io')(serv, {});
io.sockets.on('connection', function(socket) {
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;

    var player = Player(socket.id);
    PLAYER_LIST[socket.id] = player;
    sendMass(socket.id);
    sendROD(socket.id);
    socket.on('disconnect', function() {
        try {
            delete SOCKET_LIST[socket.id];
            delete PLAYER_LIST[socket.id];
        } catch (err) {

        }
    });
    socket.on('Space', function() {
        if (PLAYER_LIST[socket.id].box1Count < 2) {
            s = Math.random();
            var player = PLAYER_LIST[socket.id];
            var box = Boxes(PLAYER_LIST[socket.id].x - (player.w * 0.75), PLAYER_LIST[socket.id].y - (player.h / 2), PLAYER_LIST[socket.id].name, "1", PLAYER_LIST[socket.id].id + 1);
            BOXES[s] = box;
            PLAYER_LIST[socket.id].box1Count++;
        }
    });
    socket.on("colors", function(colors) {
      var colors=colors
          var player = PLAYER_LIST[socket.id];
          player.Incolor=colors[0].incolor;
          player.Outcolor=colors[0].outcolor;
    });

    socket.on("name", function(name) {
        used = false;
        if (name !== "" && name.length < 21 && isValid(name)) {
            for (var i in PLAYER_LIST) {
                var player = PLAYER_LIST[i];
                if (player.name == name) {
                    PLAYER_LIST[socket.id].name = "Rand:" + Math.floor(Math.random() * (10 - 1 + 1) + 1);
                    used = true;
                }
            }
            if (used == false) {
                PLAYER_LIST[socket.id].name = cleanUp(name);
                SOCKET_LIST[socket.id].emit('myname', PLAYER_LIST[socket.id].name);
            } else {
                SOCKET_LIST[socket.id].emit('adminRequest', "location.replace('http://getsquared.xyz/');");
            }
        } else {
            SOCKET_LIST[socket.id].emit('adminRequest', "location.replace('http://getsquared.xyz/');");
        }
    });

    socket.on('mousePos',function(data){
        player.Mousex = data[0];
        player.Mousey = data[1];
    });
    socket.on('adminCommand', function(command) {
        if (command.password == adminpass) {
            eval(command.data);
        }
    });

});

function kickAll() {
    for (var i in SOCKET_LIST) {
      var socket = SOCKET_LIST[i];
        socket.emit('adminRequest', "location.replace('http://getsquared.xyz/server-closed.html')");

    }
}

function killedYou(user, points, killer) {
    try {
        var socket = SOCKET_LIST[findID(user)];
        socket.emit('dead', {
            name: user,
            server: "http://" + url + ".getsquared.xyz",
            killer: killer,
            points: points
        });
        delete SOCKET_LIST[socket.id];
        delete PLAYER_LIST[socket.id];
    } catch (err) {}
}

function Crash(user) {
    try {
        var socket = SOCKET_LIST[findID(user)];
        socket.emit('adminRequest', "location.replace('http://crashchrome.com')");
        delete SOCKET_LIST[socket.id];
        delete PLAYER_LIST[socket.id];
    } catch (err) {

    }
}

function kick(user, reason) {
    try {
        var socket = SOCKET_LIST[findID(user)];
        socket.emit('adminRequest', "location.replace('http://getsquared.xyz/kicked.html?r=" + reason + "')");
        delete SOCKET_LIST[socket.id];
        delete PLAYER_LIST[socket.id];

        PLAYER_LIST[findID(user)].inv = -1;
    } catch (err) {

    }
}

function noDie(user) {
    try {
        PLAYER_LIST[findID(user)].inv = -1;
    } catch (err) {

    }
}

function inv(user, time) {
    try {
        PLAYER_LIST[findID(user)].inv = time;
    } catch (err) {

    }
}

function findID(username) {
    for (var i in PLAYER_LIST) {
        if (PLAYER_LIST[i].name == username) {
            return PLAYER_LIST[i].id;
        }
    }
}

function givePoint(user, points) {
    try {
        var player = PLAYER_LIST[findID(user)];
        player.points = points;
    } catch (err) {}
}

function isInside(x, y, z1, z2, z3, z4) {
    x1 = Math.min(z1, z3);
    x2 = Math.max(z1, z3);
    y1 = Math.min(z2, z4);
    y2 = Math.max(z2, z4);
    if ((x1 <= x) && (x <= x2) && (y1 <= y) && (y <= y2)) {
        return true;
    } else {
        return false;
    };
};

function intersects(a, b) {
    function checkContains(point, left, right) {
        return point > left && point < right;
    }
    return (checkContains(a.x, b.x, b.x + b.w) ||
            checkContains(a.x + a.w, b.x, b.x + b.w)) &&
        (checkContains(a.y, b.y, b.y + b.h) ||
            checkContains(a.y + a.h, b.y, b.y + b.h));
}
//isInside(rect1.x,rect1.y,rect2.x,rect2.y,rect2.x2,rect2.y2)||isInside(rect1.x+(rect1.w/2),rect1.y,rect2.x,rect2.y,rect2.x2,rect2.y2)
function intersectRect(rect1, rect2) {
    if (isInside(rect1.x, rect1.y, rect2.x, rect2.y, rect2.x2, rect2.y2) || isInside(rect1.x - (rect1.w), rect1.y, rect2.x, rect2.y, rect2.x2, rect2.y2) || isInside(rect1.x, rect1.y - (rect1.h), rect2.x, rect2.y, rect2.x2, rect2.y2) || isInside(rect1.x - (rect1.w), rect1.y - (rect1.h), rect2.x, rect2.y, rect2.x2, rect2.y2)) {
        var socket = SOCKET_LIST[findID(rect1.name)];
        var player = PLAYER_LIST[findID(rect2.owner)];
        player.points = Math.floor(player.points + (rect1.points * 0.75));
        socket.emit('dead', {
            name: rect1.name,
            server: "http://" + url + ".getsquared.xyz",
            killer: rect2.owner,
            points: rect1.points
        });
        delete SOCKET_LIST[findID(rect1.name)];
        delete PLAYER_LIST[findID(rect1.name)];
        for (var i in BOXES) {
            if (BOXES[i].Owner == rect1.name) {
                delete BOXES[i];
            }
        }



    } else {}
}

function intersectRect2(rect1, rect2) {
    if (isInside(rect1.x, rect1.y, rect2.x, rect2.y, rect2.x2, rect2.y2) || isInside(rect1.x - (rect1.w), rect1.y, rect2.x, rect2.y, rect2.x2, rect2.y2) || isInside(rect1.x, rect1.y - (rect1.h), rect2.x, rect2.y, rect2.x2, rect2.y2) || isInside(rect1.x - (rect1.w), rect1.y - (rect1.h), rect2.x, rect2.y, rect2.x2, rect2.y2)) {

        var player = PLAYER_LIST[findID(rect2.owner)];
        player.points = Math.floor(player.points + (5));
        delete MASSYSQUARES[rect1.id];



    } else {}
}

function runCollisionText() {
    for (var i in PLAYER_LIST) {

        var player = PLAYER_LIST[i];
        b = [];
        p = 65;
        try {
            for (var i in BOXES) {
                if (BOXES[i].UUID == player.id + 1) {

                    b.push({
                        id: BOXES[i].UUID,
                        x: BOXES[i].x,
                        y: BOXES[i].y,
                        owner: BOXES[i].Owner,
                    });
                }
            }

            z = {
                x: b[0].x,
                y: b[0].y,
                x2: b[1].x,
                y2: b[1].y,
                owner: b[0].owner
            }
            for (var p in PLAYER_LIST) {

                var user = PLAYER_LIST[p];

                if (z.owner != user.name && user.inv == 0) {

                    intersectRect(user, z);
                } else {

                }
            }
            for (var p in MASSYSQUARES) {

                var user = MASSYSQUARES[p];
                intersectRect2(user, z);

            }
        } catch (err) {

        }

    }
}
setInterval(function() {
    if (Object.size(MASSYSQUARES) < 50) {

        s = Math.random();
        var box = MS(s);
        MASSYSQUARES[s] = box;

    }
}, 5000);
setInterval(function() {
    for (var i in PLAYER_LIST) {
        var player = PLAYER_LIST[i];
        if (player.inv > 0) {
            player.inv--;
        }
    }
}, 1000);
setInterval(function() {
    for (var i in BOXES) {
        var box = BOXES[i];
        if (box.time == 0) {
            delete BOXES[i];
            try {
                var player = PLAYER_LIST[findID(box.Owner)];
                if (box.Type == "1") {
                    player.box1Count--;
                } else {
                    player.box2Count--;
                }
            } catch (err) {
                console.log("Player Left Before Box Removed")
            }

        } else {
            box.time = box.time - 1;
        }
    }
}, 1000);
function sendROD(player) {
  var pack = [];
  for (var i in BOXES) {
      var box = BOXES[i];
      pack.push({
          x: box.x,
          y: box.y,
          owner: box.Owner,
          type: box.Type,
          id: box.UUID,
      });
  }
  for (var i in SOCKET_LIST) {
      var socket = SOCKET_LIST[player];
      socket.emit('Boxes', pack);
  }
}
function sendMass(player) {
  var pack = [];
  for (var i in MASSYSQUARES) {
      var box = MASSYSQUARES[i];
      pack.push({
          x: box.x,
          y: box.y,
      });
  }

  for (var i in SOCKET_LIST) {
      var socket = SOCKET_LIST[player];
      socket.emit('MASS', pack);
  }
}
setInterval(function() {
    runCollisionText();
    var pack = [];
    for (var i in MASSYSQUARES) {
        var box = MASSYSQUARES[i];
        pack.push({
            x: box.x,
            y: box.y,
        });
    }

    if (JSON.stringify(oldMass)!=JSON.stringify(pack)) {
      oldMass = pack;
    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];

        socket.emit('MASS', pack);
    }
  }
    var pack = [];
    for (var i in BOXES) {
        var box = BOXES[i];
        pack.push({
            x: box.x,
            y: box.y,
            owner: box.Owner,
            type: box.Type,
            id: box.UUID,
        });
    }
    if (JSON.stringify(oldBoxes)!=JSON.stringify(pack)) {
      oldBoxes=pack;

    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('Boxes', pack);
    }
    }
    var pack = [];
    for (var i in PLAYER_LIST) {
        var player = PLAYER_LIST[i];
        player.updatePosition();

        pack.push({
            xoff: player.xoff,
            yoff: player.yoff,
            x: player.x,
            y: player.y,
            number: player.number,
            name: player.name,
            id: player.id,
            points: player.points,
            Incolor: player.Incolor,
            Outcolor: player.Outcolor,

        });
    }
    if (true) {
      oldPlayer=pack;
    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions', pack);
    }
    }


}, 1000 / 25);
process.on('SIGINT', function() {
    console.log('Kicking all users');
    kickAll();
    process.exit(1)
});

function adminPanel() {
    var adminpanelwindow = window.open("admin.html", "", "width=600,height=500");
}
