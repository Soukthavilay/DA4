var express=require('express');
var app= express();
app.use(express.static("public"));//tat ca request cua client vao public
app.set("view engine","ejs");
app.set("views","./views");


var server=require("http").Server(app);
var io= require("socket.io")(server);
server.listen(7000);

var i=1;

var arrayClient=[];

io.on("connection",function(socket){

	console.log("co nguoi kết nối đến:"+socket.id);
	

	socket.on("disconnect",function(){
			console.log( socket.id+"  ngắt kết nối !");
	});

	socket.on("client-send-data",function(data){
		console.log(socket.id+" vừa gửi "+data);
		io.sockets.emit("server-send-data",data+"777");
	});

	socket.on("client-gui",function(device){

			



		io.sockets.emit("server-gui-driver",{idclient:socket.stt,devices:device});
	});
	socket.on("client-gui-xoa",function(device){
		io.sockets.emit("server-gui-driver-xoa",{idclient:socket.stt,devices:device});
	});
	socket.on("client-them-usb",function(device){
		io.sockets.emit("server-them-usb",{idclient:socket.stt,devices:device});
	});

	socket.on("ket-noi-server",function(){
		var data="Client: "+i;
		if(arrayClient.indexOf(data)<0){

			arrayClient.push(data);
		socket.name=data;
		socket.stt=i;

				i=i+1;
		io.sockets.emit("server-send-danhsach",arrayClient);
		io.sockets.emit("server-send-new-client",{idclient:socket.stt});
		}
		

	});


	socket.on("danhsach",function(){
			io.sockets.emit("server-send-danhsach",arrayClient);

	});
});

app.get("/",function(req,res){

	res.render("trangchu");
});
app.get("/kinne",function(req,res){

	res.render("trangchu");
});