const shell = require('linux-shell-command');
module.exports=async function(chan,staff) {	// Drive checking
	try {
		let fstb,mtb;
		await fstb = shell.shellCommand("cat '!?!'", ["/etc/fstab|egrep -o '/media/plex/Plex-([^/])+$'|egrep -o '\-\S+'"]);
		await fstb=fstb.execute();
		await mtb = shell.shellCommand("cat '!?!'", ["/etc/mtab|egrep -o '/media/plex/Plex-([^/])+$'|egrep -o '\-\S+'"]);
		await mtb=mtb.execute();
		fstb=fstb.stdout.split(/\s+/);
		let msng=fstb.map(drv => {
			if (mtb.includes(drv)) return drv.slice(1);
		});
		if (msng.length>0) {
			msgs=[
				msng[1]+" has been reported missing"+(msng.length>1?", it was last seen in the company of "+(msng.length>2?msng.slice(1,-1).join(", ")+", and ":"")+msng.slice(-1):"")+"."
			];
			let say=Math.floor(Math.random()*msgs.length)||"burps.";
			chan.send(say?staff+", "+say:"burps.");
		}
	}
	catch (error) {
		console.error('There was an issue with drive checking.');
		console.error(error);
	}
}