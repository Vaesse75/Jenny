// support text
module.exports={
	name:"support",
	description:"Get automated support for related servers.",
	execute(msg,args) {
		let tag=msg.author;
		if (typeof msg.client.noCarl == "undefined") {
			msg.client.noCarl=function(id) {
				console.log("Carl's being lazy again...");
			}
		}
		input=msg.content.toLowerCase();
		msg.client.ticket[msg.author.id]=input.substr(9).split(" ");
		var level=support;
		/*if (msg.client.ticket[msg.author.id][0] == "plex") {
			var srvc="plexmediaserver";
		}
		if (msg.client.ticket[msg.author.id][0] == "calibre") {
			var srvc="calibre-server";
		}
		if (msg.client.ticket[msg.author.id][0] == "ftp") {
			var srvc="proftpd";
		}*/
		if (msg.client.ticket[msg.author.id].length>0 && msg.client.ticket[msg.author.id][0] != "") {
			var keys="";
			for (var key in level) {
				if (keys != "") keys+=",";
				keys+=key;
			}
			if (msg.client.ticket[msg.author.id].length > 0 && keys.indexOf(msg.client.ticket[msg.author.id][0]) >= 0) {
				//waitForPing=true;
				//Online=checkit(srvc);
				msg.client.timers[msg.author.id]=setTimeout(()=>{msg.client.noCarl(msg.author.id);},3000);
				msg.client.waitForPing=msg.client.ticket[msg.author.id][0];
				suppconn.send(tag+", "+pingwarn);
				suppconn.send("!ping "+msg.client.ticket[msg.author.id][0]+" for "+tag);
			}
			else {
				msg.client.ticket[msg.author.id]=[];
				//suppconn.send(support[0]);
			}
		}
		else {
			msg.client.ticket[msg.author.id]=[];
			//suppconn.send(support[0]);
		}
	}
}

