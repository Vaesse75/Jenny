const shell = require('linux-shell-command').shellCommand;
module.exports=async function(chan,staff) {	// Drive checking
	try {
		let fstb=shell("cat /etc/fstab");
		fstb.execute()
		.then(success=> {
			if (success === true && fstb.stdout != "") {
				let f={};
				fstb.stdout.match(/\/media\/plex\/Plex-([^\/]+?)\s/g).map(a=>{return a.slice(17,-1);}).forEach(a=>{f[a]=true;});
				f=Object.keys(f);
				let mtb=shell("cat /etc/mtab");
				mtb.execute()
				.then(success => {
					if (success === true && mtb.stdout != "") {
						let m={};
						mtb.stdout.match(/\/media\/plex\/Plex-([^\/]+?)\s/g).map(a=>{return a.slice(17,-1);}).forEach(a=>{m[a]=true;});
						m=Object.keys(m);
						let msng=[];
						f.forEach(drv=>{
							if (!m.includes(drv)) msng.push(drv);
						});
						if (msng.length>0) {
							msgs=[
								msng[1]+" has been reported missing"+(msng.length>1?", it was last seen in the company of "+(msng.length>2?msng.slice(1,-1).join(", ")+", and ":"")+msng.slice(-1):"")+"."
							];
							let say=msgs[Math.floor(Math.random()*msgs.length)];
							console.log("Missing drives: "+msng+"\n"+say);
							chan.send(say?staff+", "+say:"burps.");
						}
					}
				}).catch(e => {
					console.error(e);
				});
			}
		}).catch(e => {
			console.error(e);
		});
	}
	catch (error) {
		console.error('There was an issue with drive checking.');
		console.error(error);
	}
}