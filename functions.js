//set constants
const Discord = require('discord.js');


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
module.exports.checkit=async function(args) {
    var shellCommand = require("linux-shell-command").shellCommand;
    var sc = shellCommand("systemctl status "+args+"|grep Active|while read a b c;do echo $b;done");
    return sc.execute()
    .then(success => {
        if (success === true && sc.stdout != "") {
            return (sc.stdout.slice(0,6) == "active");
        }
    })
    .catch(e => {
        console.error(e);
    });
}
