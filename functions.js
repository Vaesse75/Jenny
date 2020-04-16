//set constants
const Discord = require('discord.js');

// Underlay function for support, and tips
module.exports.underlay=function(say,cat) {
	var color='#000000';
	if (!say) {
		var say=err+" (A1)";
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
module.exports.Mbr=function(mem,leadcap) {
    return leadcap?mem||"Friend":mem||"friend";
}
module.exports.reply=function(say,chan) {
    if (say) {
        if (!chan) {
            chan=onconn;
            console.error("No channel was sent! (A1)")
            say=say+" "+err+" (A1)"
        }
        return chan.send(say);
    }
}