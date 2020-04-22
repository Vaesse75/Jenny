//set constants
//const Discord = require('discord.js');

// Underlay function for support, and tips
module.exports.underlay=function(say,cat) {
	var color='#000000';
	if (!say) {
		var say=errs+" (A1)";
		console.error("Oops! There's no say! (A1)");
	}
	else if (cat == "tips") {
		color='#C70039';
	}
	else if (cat == "support") {
		color='#FFC300';
	}
	var embed = new Discord.RichEmbed()
	.setColor(color)
	.setDescription(say);
	return embed;
}

// Walk the support tree
module.exports.walkSupport=function(arr) {
    var level=support;
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
// returns "Friend" if name can't be resolved
module.exports.Mbr=function(mem,leadcap) {
    return leadcap?mem||"Friend":mem||"friend";
}
// use for social replies
module.exports.reply=function(say,chan) {
    if (say) {
        if (!chan) {
            chan=onconn;
            console.error("No channel was sent! (A2)")
            say=say+" "+errs+" (A2)"
        }
        return chan.send(say);
    }
}
//service check
// usage: variable=require(filename)(<plexmediaserver>|<calibre-server>|<proftpd>);
module.exports.check=function(args,Server) {
    var shellCommand = require("linux-shell-command").shellCommand;
    var sc = shellCommand("systemctl status "+args+"|grep Active|while read a b c;do echo $b;done");
    sc.execute()
    .then(success => {
        for (var r in Server) {
            if (args==Server[r]) s=r;
        }
        if (success === true && sc.stdout != "") {
            if (sc.stdout.slice(0,6) == "active") {
                return true;
            }
            else if (sc.stdout.slice(0,6) != "active") {
                return false;
            }
        }
    })
    .catch(e => {
        console.error(e);
    });
}
