// support text
module.exports={
	name:"support",
	description:"Opens a trouble ticket (Automated support is in Beta.)",
	execute(msg,args) {
		let tag=msg.author;

		const Jenny = msg.client;
		if (msg.channel != offconn && Jenny.training) {
			suppchan.send(`Sorry ${tag}. I can't help you, while I'm training with the boss. Hang on, and he should be with you in a bit.`);
		}
		else {
			if (typeof msg.client.noCarl == "undefined") {
				msg.client.noCarl=function(id) {
					suppconn.send(`${tag}, Sorry, Carl isn't around right now. Let's continue without him. ${CastingRef}, Carl's slacking off again!"`);
					svc={"plex":"plexmediaserver","ftp":"proftpd","calibre":"calibre-server"};
					checkit(svc[msg.client.waitForPing]).then(a => {
						if (a) {
							suppconn.send(msg.client.support[msg.client.waitForPing][0]);
						}
						else {
							suppconn.send(breakpoint2);
						}
						msg.client.waitForPing=false;
					});
				}
			}
			input=msg.content.toLowerCase();
			msg.client.ticket[msg.author.id]=input.substr(9).split(" ");
			var level=support;
			if (msg.client.ticket[msg.author.id].length>0 && msg.client.ticket[msg.author.id][0] != "") {
				var keys=level.keys().join(",");
				if (msg.client.ticket[msg.author.id].length > 0 && keys.indexOf(msg.client.ticket[msg.author.id][0]) >= 0) {
					msg.client.timers[msg.author.id]=setTimeout(()=>{msg.client.noCarl(msg.author.id);},3000);
					msg.client.waitForPing=msg.client.ticket[msg.author.id][0];
					suppconn.send(`${tag}, ${pingwarn}`);
					suppconn.send(`!ping ${msg.client.ticket[msg.author.id][0]} for ${tag}`);
				}
				else {
					msg.client.ticket[msg.author.id]=[];
					suppconn.send(support[0]);
				}
			}
			else {
				msg.client.ticket[msg.author.id]=[];
				suppconn.send(support[0]);
			}
		}
	}
}

