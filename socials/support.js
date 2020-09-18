// Walk the support tree
walkSupport=function(client,arr) {
    var level=client.support;
    for (var a in arr) {
        var keys="";
        for (var key in level) {
            if (keys != "") keys+=",";
            keys+=key;
        }
        if (keys.indexOf(arr[a]) >= 0) {
            level=level[arr[a]];
        }
        else {
            console.log(a+" is invalid.");
            return level;
        }
    }
    return level;
}
module.exports={
	userInput:{
		trigger(msg) {
			return (msg.client.ticket[msg.author.id] && !msg.content.match(' '));
		},
		execute(msg) {
			let tag=msg.author;
			// If author has an open msg.client.ticket
			var arr=msg.client.ticket[msg.author.id];
			var said=msg.content.split(" ")[0];
			var level=walkSupport(msg.client,msg.client.ticket[msg.author.id]);
			var keys="";
			if (msg.client.ticket[msg.author.id][0] == "plex") {
				var srvc="plexmediaserver";
			}
			if (msg.client.ticket[msg.author.id][0] == "calibre") {
				var srvc="calibre-server";
			}
			if (msg.client.ticket[msg.author.id][0] == "ftp") {
				var srvc="proftpd";
			}
			for (var key in level) {
				if (keys != "") keys+=",";
				keys+=key;
			}
			if (keys.indexOf(said) >= 0) {
				arr.push(said);
				level=walkSupport(msg.client,arr);
				var keys="";
				for (var key in level) {
					if (keys != "") keys+=",";
					keys+=key;
				}
			}
			if (said=="back") {
				msg.client.ticket[msg.author.id].pop();
				level=walkSupport(msg.client,msg.client.ticket[msg.author.id]);
				suppconn.send(tag+", "+level[0]);
			}
			else if (said=="fixed") {
			 suppconn.send(tag+", "+fixedbreak);
			 msg.client.ticket[msg.author.id]=null;
			}
			else if (said=="cancel") {
				suppconn.send(tag+", "+cancelbreak);
				msg.client.ticket[msg.author.id]=null;
			}
			else if (msg.client.ticket[msg.author.id].length==1 && !said.match(/.support/i)) {
				//waitForPing=checkit(srvc);
				msg.client.timers[msg.author.id]=setTimeout(()=>{msg.client.noCarl(msg.author.id);},3000);
				msg.client.waitForPing=msg.client.ticket[msg.author.id][0];
				suppconn.send(tag+", "+pingwarn);
				suppconn.send("!ping "+msg.client.ticket[msg.author.id][0]+" for "+tag);
				
			}
			else if (typeof level == "string") {
				suppconn.send(tag+", "+level);
				msg.client.ticket[msg.author.id]=null;
			}
			else  {
				suppconn.send(tag+", "+level[0]);
			}
		}
	},
	pingCarl:{
        //Original waitForPing
        trigger(msg) {
            return (msg.content.match(/^[^,]*, (\w* ){2}is .*\.$/i) && msg.client.waitForPing);
        },
        execute(msg) {
            tag=msg.content.split(",")[0];
            if (msg.content.substr(msg.content.length-5,4)=="open" || msg.content.substr(msg.content.length-3,2)=="up") {
                console.log(tag.slice(2,-1));
				suppconn.send(tag+", "+msg.client.support[tag.slice(2,-1)][0]);
            }
            else if (msg.content.substr(msg.content.length-7,6)=="closed" || msg.content.substr(msg.content.length-5,4)=="down") {
                suppconn.send(tag+", "+breakpoint2);
                msg.client.ticket[tag.id]=null;
            }
            clearTimeout(msg.client.timers[tag.id]);
            msg.client.waitForPing=false;
        }
    }
}
