var socket=io("http://localhost:7000");
	var sp=1;
	var count=0;
//	var currentclient=1;
			socket.on("server-send-data",function(data){
					$(".noidungFind").append(data+",");
			});


			socket.on("server-gui-driver",function(data){

				var theDivFind="#noidungFind"+data.idclient;

					count="Find : "+data.devices.length;
					
				console.log("Find of"+data.idclient);
				$(theDivFind).html("");
				$(theDivFind).append(
					"<p class='thep'></div>"
					);
				$(".thep").html(count);
				data.devices.forEach(function(i){
				$(theDivFind).append(

					
					"<div id='usb'>"+
					"USB : "+i.deviceAddress+"<br>"+
					"<div class='sp"+
					"'>"+"vendorId: "+i.vendorId+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"productId: "+i.productId+
					"</div>"
					
					+
					"<div class='sp"+
					"'>"+"deviceName: "+i.deviceName+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"manufacturer: "+i.manufacturer+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"serialNumber: "+i.serialNumber+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"deviceAddress: "+i.deviceAddress+
					"</div>"
					
					+"</div>"



					
					);
					//sp=sp+1;
				});
			});



			socket.on("server-gui-driver-xoa",function(data){
					
				console.log("xoa cua"+data.idclient);
				var theDivChange="#noidungChange"+data.idclient;
				$(theDivChange).html("");
				$(theDivChange).append(

					"<div id='usb'>"+
					"REMOVE USB : "+data.devices.deviceAddress+"<br>"+
					"<div class='sp"+
					"'>"+"vendorId: "+data.devices.vendorId+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"productId: "+data.devices.productId+
					"</div>"
					
					+
					"<div class='sp"+
					"'>"+"deviceName: "+data.devices.deviceName+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"manufacturer: "+data.devices.manufacturer+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"serialNumber: "+data.devices.serialNumber+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"deviceAddress: "+data.devices.deviceAddress+
					"</div>"
					
					+"</div>"



					
					);



			});

			socket.on("server-send-danhsach",function(data){
				$("#listclient").html("");
				data.forEach(function(i){
					$("#listclient").append(
						"<tr>"+
					"<td>"+i+"</td>"+
				"</tr>"
						);
				});

				//them client moi divright

			
			});


			socket.on("server-send-new-client",function(data){//data  là i


					$("#right").append(
					"<div  class='client' id='client"+data.idclient+"'>"
					+"<h2>Find client : "+data.idclient+"</h2>"
					+"<div class='find' id='noidungFind"+data.idclient+"'>"+

					

					"</div>"
					+"<h2>Change client: "+data.idclient+"</h2>"
					+"<div class='change' id='noidungChange"+data.idclient+"'></div>"
					+"</div>"



					);


						$("#thongbao").html("Đã kết nối với Client "+data.idclient).show(3000);
						$("#thongbao").hide(3000);
					//currentclient=data.idclient;

			});

			socket.on("server-them-usb",function(data){
				console.log("change cua"+data.idclient);
				var theDivChange="#noidungChange"+data.idclient;
				$(theDivChange).html("");
				$(theDivChange).append(

					"<div id='usb'>"+
					"ADD USB : "+data.devices.deviceAddress+"<br>"+
					"<div class='sp"+
					"'>"+"vendorId: "+data.devices.vendorId+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"productId: "+data.devices.productId+
					"</div>"
					
					+
					"<div class='sp"+
					"'>"+"deviceName: "+data.devices.deviceName+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"manufacturer: "+data.devices.manufacturer+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"serialNumber: "+data.devices.serialNumber+
					"</div>"
					+
					"<div class='sp"+
					"'>"+"deviceAddress: "+data.devices.deviceAddress+
					"</div>"
					
					+"</div>"



					
					);
				
			});

			$(document).ready(function(){
				socket.emit("danhsach");
				$("#thep").click(function(){
						socket.emit("client-send-data","hello kin");//emit là phat su kien
				});
			});