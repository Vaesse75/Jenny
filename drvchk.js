const shell = require('linux-shell-command');
module.exports=async function(chan,staff) {	// Drive checking
	try {
		console.log(shell);
		let fstb=shell.shellCommand("cat /etc/fstab|egrep -o '/media/plex/Plex-([^/])+$'|egrep -o '\-\S+'");
		fstb.execute().
		then(success=> {
			console.log("I'm checking the drive! :-p");
			console.log("fstb:\n"+success+"\n"+fstb.stdout);
			if (success === true && fstb.stdout != "") {
				let mtb=shell.shellCommand("cat /etc/mtab|egrep -o '/media/plex/Plex-([^/])+$'|egrep -o '\-\S+'");
				mtb.execute().
				then(success => {
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
				});
			}
		});
	}
	catch (error) {
		console.error('There was an issue with drive checking.');
		console.error(error);
	}
}