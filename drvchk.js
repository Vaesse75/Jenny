const shell = require('linux-shell-command').shellCommand;
module.exports=async function(chan,staff) {	// Drive checking
	try {
		console.log(shell);
		var fstb=shell("cat /etc/fstab|grep -po '-\S+'");
		//'/media/plex/Plex-([^/])+$'   '\-\S+'
		fstb.execute()
		.then(success=> {
			console.log("fstb:\n"+success+"\n"+fstb.stdout);
			if (success === true && fstb.stdout != "") {
				var mtb=shell("cat /etc/mtab|egrep -o '/media/plex/Plex-([^/])+$'|egrep -o '\-\S+'");
				mtb.execute()
				.then(success => {
					console.log("mtb:\n"+success+"\n"+mtb.stdout);
					if (success === true && mtb.stdout != "") {
						
						fstb=fstb.stdout.split(/\s+/);
						let msng=fstb.map(drv => {
							if (mtb.includes(drv)) return drv.slice(1);
						});
						console.log(fstb+"\n"+mtb+"\n"+msng);
						if (msng.length>0) {
							msgs=[
								msng[1]+" has been reported missing"+(msng.length>1?", it was last seen in the company of "+(msng.length>2?msng.slice(1,-1).join(", ")+", and ":"")+msng.slice(-1):"")+"."
							];
							let say=Math.floor(Math.random()*msgs.length)||"burps.";
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