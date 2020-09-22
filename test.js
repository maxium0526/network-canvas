// var app = require("express")();
// var server = require("http").createServer(app);
var io = require("socket.io")();

var draws = [];
function getId(){
	return draws.length + 1;
}

io.on('connection', function(socket){
	socket.on('draw',function(drawBuffer){
		// console.log("x:", buffer[0], ", y:", posi.y);
		for(var buffer of drawBuffer){
			buffer.id = getId();
			draws.push(buffer);
			
				
			
			//console.log(buffer.id+": "+ buffer.x1+", "+ buffer.y1+", "+ buffer.x2+", "+ buffer.y2+", "+buffer.color+", "+buffer.type);
		}
		socket.emit("returnDraws", drawBuffer);
		socket.broadcast.emit("returnDraws", drawBuffer);
	})
	socket.on("clearDraws",function(){
		draws=[];
		socket.emit("clearDraws",);
		socket.broadcast.emit("clearDraws",);
	});
	socket.on("getDraws",(id)=>{
		let drawBuffer = draws.filter((draw)=>{
			return draw.id > id;
		})
		socket.emit("returnDraws", drawBuffer);
	})
})

io.listen(3000,()=>{console.log("Server listen at 3000")});
