var usbDetect = require('./node_modules/usb-detection');


var io = require('./node_modules/socket.io-client');
var socket=io("http://localhost:7000");

/* */
socket.emit("ket-noi-server");
console.log('Start lisening...');
usbDetect.startMonitoring();
/* */



var usb= function(device){
	var str="Thông tin USB được tìm thấy :"+"<br>";
	for(var i=0;i<device.length;i++){

		
		str+=JSON.stringify(device[i])+"<br>";
		console.log(device[i]);
	}
	return str;

}
var DriverInfo= function(device){
	var t="Info : "+"<br>"+

	"vendorId :"+device.vendorId+"<br>"+
	"productId:"+device.productId+"<br>"+
	"deviceName:"+device.deviceName+"<br>"+
	"manufacturer:"+device.manufacturer+"<br>"+
	"serialNumber:"+device.serialNumber+"<br>"+
	"deviceAddress:"+device.deviceAddress+"<br>";
		return t;

}
/* */
usbDetect.find()
	.then(function(devices) {




			










		console.log('find', devices.length, devices.sort((a, b) => {
			if(a.vendorId !== b.vendorId) {
				return a.vendorId - b.vendorId;
			}
			else if(a.productId !== b.productId) {
				return a.productId - b.productId;
			}

			return a.deviceName.localeCompare(b.deviceName);
		}));
			var  str="";
			for(var i=0;i<devices.length;i++){

				
				str+=DriverInfo(devices[i]);
			}
			//socket.emit("client-gui","Find "+devices.length+":<br>"+str);



				socket.emit("client-gui",devices);

	});






usbDetect.on('add', function(device) {



var st="Thêm usb:"+JSON.stringify(device,null,6)+"<br>";


var t;
for( var key in  device){

	t+= key+device[JSON.stringify(key)];

}



/*device.prototype.toString=>function detostring(){
					return this.deviceName+"ahihi";
			};*/




	console.log('add', device);
	//socket.emit("client-gui",DriverInfo(device));

	socket.emit("client-them-usb",device);
	//socket.emit("client-gui",JSON.stringify(element));


	usbDetect.find()
		.then(function(devices) {
			//console.log('find', devices.length, devices);
			socket.emit("client-gui",devices);
		});

});

usbDetect.on('remove', function(device) {
	console.log('remove', device);
//var st="Gỡ usb:"+JSON.stringify(device)+"<br>";




	socket.emit("client-gui-xoa",device);

	usbDetect.find()
		.then(function(devices) {
			//console.log('find', devices.length, devices);
			socket.emit("client-gui",devices);
		});

});

usbDetect.on('change', function(device) {
	console.log('change', device);

	
});
