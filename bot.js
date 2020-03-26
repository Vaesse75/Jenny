/*
    Future Plans:
        Ch and Usr seach by name
        Fix funcion Em (Figure out emoji lookup)
        Split Reccomendations (Recc) out from Tips
		Make separate docs for: TV, movies, books, misc
		Call with `!recc TV` or `!recc`
		If no sub specified, randomly chose one of the available docs
		Then once in doc randomly choose one line and return it.
		Create an interface for adding new entries to these from Discord (Crypto should be able to help)
*/

// Set constants
const Discord = require('discord.js');
const Carl = new Discord.Client();
const auth = require('./auth.json');
const fs = require('fs');
const Ch = {};
const Em = {};
const Usr = {};
Recs = {"list":[]};

// Define Functions
Ch.get=function(id) {
    return Carl.channels.get(this[id.toLowerCase()]||id.toLowerCase());
};
Ch.ref=function(id) {
    return "<#"+(this[id.toLowerCase()]||id.toLowerCase())+">";
};
Ch.set=function(id,val) {
    this[id.toLowerCase()]=val;
};
function Check(srv,chan,pass) {
    var shellCommand = require("linux-shell-command").shellCommand;
    for (var s=0;s<Server.length;s++) {
        if (srv == Server[s]) {
            var sc = shellCommand("systemctl status "+ServerProc[s]+"|grep Active|while read a b c;do echo $b;done");
            sc.execute()
            .then(success => {
                for (var r in Server) {
                    if(srv==Server[r]) s=r;
                }
                if (success === true && sc.stdout != "") {
                    if (sc.stdout.substr(0,6) == "active") {
                        if (Online[Server[s]] == false&&OnMsg[s]) {
                            var say=new Array(code[Server[s]]+" has just reopened.");
                            onconn.send(say[Math.floor(Math.random()*say.length)]);
                        }
                        Online[Server[s]]=true;
                    }
                    else if (sc.stdout.substr(0,6) != "active") {
                        if (Online[Server[s]] == true&&OffMsg[s]) {
                            var say=new Array(code[Server[s]]+" has just closed.");
                            onconn.send(say[Math.floor(Math.random()*say.length)]);
                        }
                        Online[Server[s]]=false;
                    }
                }
            })
            .catch(e => {
                console.error(e);
            });
        }
        else if (srv==ServerProc[s]) {
            Check(Server[s],chan);
        }
        else if (srv==""||srv=="all") {
            Check(Server[s],chan,"all");
        }
    }
    if(chan) Report(srv,chan);
}
Em.add=function(name,id) {
    this[name]=name+":"+id;
}
Em.find=function(id) {
    return onconn.guild.emojis.find(emoji => emoji.name === id);
}
Em.use=function(name) {
    return "<"+this[name]+">";
}
function Mbr(mem,leadcap) {
    if (leadcap) {
        return mem||"Friend";
    }
    else return mem||"friend";
}
Recs.add=function(u,c,t,r) {
    for (var a in Recs.list.length) {
        if (Recs.list[a].user.toLowerCase()==u.toLowerCase()&&Recs.recs.list[a].cat.toLowerCase()==c.toLowerCase()&&Recs.recs.list[a].title.toLowerCase()==t.toLowerCase()) {
            return false;
        }
        Recs.list.push({"user":u,"cat":c,"title":t,"reason":r});
        return true;
    }
}
function Report(srv,chan) {
    var ch=chan||onconn;
    if (srv==""||srv=="all") {
        if (Online["plex"] && Online["calibre"]) {
            var say=new Array("The theater and library are open. Everything appears to be running smoothly.");
            ch.send(say[Math.floor(Math.random()*say.length)]);
        }
        else if (Online["plex"] && !Online["calibre"]) {
            var say=new Array("The theater is open, however the library is currently closed... likely for restocking.");
            ch.send(say[Math.floor(Math.random()*say.length)]);
        }
        else if (!Online["plex"] && Online["calibre"]) {
            var say=new Array("The theater is currently closed, would you like to visit the library instead?");
            ch.send(say[Math.floor(Math.random()*say.length)]);
        }
        else if(Online["ftp"]) {
            var say=new Array("Both the theater and library are closed. Have you considered asking one of our @Casting staff about FTP access?");
            ch.send(say[Math.floor(Math.random()*say.length)]);
        }
        else {
            Casting = Carl.channel.server.roles.mention("name","Casting");
            var say=new Array(CastingRef+", we appear to be running by candlelight. Nothing is working. Why am I not at home?");
            ch.send(say[Math.floor(Math.random()*say.length)]);
        }
    }
    else {
        var stat;
        if (srv=="plex"||srv=="calibre") {
            if (Online[srv]) stat="open.";
            else stat="closed.";
        }
        else {
            if (Online[srv]) stat="up.";
            else stat="down.";
        }
        if(code[srv]&&stat) ch.send(code[srv]+" is "+stat);
    }
}
Usr.ref=function(id) {
    return "<@&"+(this[id.toLowerCase()]||id.toLowerCase())+">";
};
Usr.set=function(id,val) {
    this[id.toLowerCase()]=val;
};

// acknowledge ready state
Carl.on('ready', () => {
    // console.log('Logged in as ${Carl.user.tag)!');
    
    //define Ch and Usr objects.
    Ch.set("bot","675864898617606184");
    Ch.set("help","583979972578770945");
    Ch.set("test","681380531493142533");
    Ch.set("welcome","581340165520359424");
    Ch.set("plex","581346715852865547");
    Ch.set("calibre","590195078765608961");
    Ch.set("rules","581352180355694603");
    Usr.set("casting","581334517151825920");
    
    // define frequently used channels.
    onconn = Ch.get("bot");
    offconn = Ch.get("test");
    newconn = Ch.get("welcome");

    // uncomment below to set Carl to send to testing channel. (Ushers/Producer only)
    // onconn=offconn;

    // Links to roles and channels.
    CastingRef=Usr.ref("CaStInG");
    RulesRef=Ch.ref("rules");
    CalibreRef=Ch.ref("calibre");
    PlexRef=Ch.ref("plex");
	HelpRef=Ch.ref("help");

    // Arrays of services and other related sundries.
    Server=new Array("plex","calibre","ftp");
    ServerProc=new Array("plexmediaserver","calibre-server","proftpd");
    code=new Array();
    code["plex"]="The theater";
    code["calibre"]="The library";
    code["ftp"]="FTP access";
    OnMsg=new Array(true,true,false);
    OffMsg=new Array(true,true,false);
    Online=new Array();

    // Fill Online status array with indeterminant state.
    for (srv in Server) {
        Online[Server[srv]]="unknown";
    }

    // Open recommends file to parse
        fs.readFile('/home/Plex/Bot/Carl/recommends.txt', 'utf8', function(err, contents) {
        var c,recs=contents.split("\n");
        for (var a in recs) {
            recs[a]=recs[a].substr(1,recs[a].length-2).split("\",\"");
            var b=Recs.add(recs[a][0],recs[a][1],recs[a][2]);
            if (!b) console.log(recs[a]+" failed to load");
            c=a;
        }
        console.log(c+" recs loaded.");
        console.log(Recs.list);
    });

    // Wakeup message.
    var say=new Array("Sorry, I must have dozed off for a bit.","Please excuse me, the best scene just finished. I'm here now.","My apologies, I was a bit distracted.");
	onconn.send(say[Math.floor(Math.random()*say.length)]);

    // First check
    Check('');

    // Repeat checks
    setInterval(function() {Check('')},5000);
});

// Reply to messages
Carl.on('message', msg => {
    
    //Plain text social responses
	if (msg.content.match(/^[Hh](e(llo)?|i|y)a?.* [Cc]arl.*/)) {
        var say=new Array("Hello, "+Mbr(msg.member,0)+", is there something I can help you with?");
        msg.channel.send(say[Math.floor(Math.random()*say.length)]);
    }
    if (msg.content.match(/^([Gg]ood ?)?([Bb]ye|[Nn](ight|ite)).* [Cc]arl.*/)) {
        var say=new Array("Hope to see you again soon.","Hope to see you again soon, "+Mbr(msg.member,0)+".");
        msg.channel.send(say[Math.floor(Math.random()*say.length)]);
    }
    if(msg.content.match(/[Mm]orning.* [Cc]arl.*/)) {
        var say=new Array("Great to see you again.","Great to see you again, "+Mbr(msg.member,0)+".");
        msg.channel.send(say[Math.floor(Math.random()*say.length)]);
    }
    if(msg.content.match(/[Tt]hank(s.*| ?you.*) [Cc]arl.*/)) {
        var say=new Array("It is a pleasure to be of service.","You are most welcome.");
        msg.channel.send(say[Math.floor(Math.random()*say.length)]);
    }

    //// Programatic triggers
    // emote
	if (msg.content.match(/^![Ee]mote/)) {
        var em=msg.content.substr(7);
        if (em.length>0) {
            em=em.split(" ");
            for (var a=0;a<em.length;a++) {
                msg.channel.send("Emote:"+em[a]+"="+Em.find(em[a]));
            }
        }
    }

    // ping reply
	if (msg.content.match(/^![Pp]ing/)) {
        var srv=msg.content.substr(6);
        if (srv.length>0) {
            srv=srv.split(" ");
            for (var a=0;a<srv.length;a++) {
                Report(srv[a].toLowerCase(),msg.channel);
            }
        }
        else Report("",msg.channel);
    }
    
    // New Member follow-up
    if (msg.content.match(/^\"?[Ii] understand.?\"?$/) && msg.channel == newconn) {
	    newconn.send("Done? Great! Sorry to put you through that mess, but it was pretty important. Now, I'll slip a note to our "+CastingRef+" department. They should be by soon to answer any questions and let you in.");
        setTimeout(function() {newconn.send("Oh, I almost forgot! Once you're in, if you need help, be sure to ask in the "+HelpRef+" channel. You can also type !help to see what I can help you with.")},5000);
    }
    
	//tips reply
	if (msg.content.match(/^![Tt]ip.?/)) {
		var say=new Array("🇹 🇮 🇵 Did you know? you can get access to the video library by sending a DM to Vaesse that includes your Plex email address, and a request for access.","🇹 🇮 🇵 Did you know? You can get access to our library of E-Books by requesting access to Calibre in the "+HelpRef+" channel!","🇹 🇮 🇵  Need FTP access? You can request it in the "+HelpRef+" channel!","🇹 🇮 🇵 Looking for audiobooks? Check in the Audiobooks library! If you don't see it, check under the Music library. Still can't find it? Ask for help in the "+HelpRef+" channel, and someone will assist you soon!","🇹 🇮 🇵 Having technical issues, or something is not working as expected? Ask for assistance in the "+HelpRef+" channel, and one of our volunteer Tech Support reps will get back to you soon!","🇹 🇮 🇵 Have a show, movie, album, or book you want to recommend to everyone?  Let us know what you love and why in the "+HelpRef+" channel, and we'll add a tip!");
         msg.channel.send(say[Math.floor(Math.random()*say.length)]);
    }
     // "🇹 🇮 🇵 Have you seen the show **Nikita**? Vaesse recommends it saying, \"This reboot of 'La Femme Nikita' is an action-thriller. All the characters are amazing!\" Check it out in the TV library!"
     
	/* Unicode Symbols for various services
	 *	 📺   TV
	 *	 ? ?️   Movies
	 *	 🎵   Music
	 *	 📖   Audiobook
	 *	 📚   Book
	 *	 <:die:342484331941593088>   RPG
	 *	 💥   Comics
	 */
	
    
	// help text
	if (msg.content.match(/^![Hh]elp/)||msg.content.match(/^[Hh]elp.*[Cc]arl.*/)) {
		msg.channel.send(Mbr(msg.member,1)+', here\'s a quick help list!\r\n\r\n!ping ["plex"/"calibre"/"ftp"/"all"/""] - Asks me the status of various services.\r\n!tips - Asks me for a random tip.\r\n!help - Tells me to display this message.\r\n\r\nIf you need assistance or have a suggestion for my service, let a member of our Casting staff know in '+HelpRef+'.');
	}
	
});

// Member greeting
Carl.on('guildMemberAdd', member => {
    newconn.send(Mbr(member,1)+", welcome! Please read everything in "+RulesRef+", "+PlexRef+", and "+CalibreRef+", then come back here and tell me, \"**I understand**,\" to continue.");
});
Carl.login(auth.token);
