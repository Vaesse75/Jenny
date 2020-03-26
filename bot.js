/*
    Future Plans:
	Create automated support tickets (Support phrases and examples below)
*/

// Set constants
const Discord = require('discord.js');
const Jenny = new Discord.Client();
const auth = require('/home/plex/bots/authJenny.json');
//const fs = require('fs');
const Ch = {};
//const Em = {};
const Usr = {};
//Recs = {"list":[]};

//support Array
	breakpoint="I can't help you with this just yet. "+User.get("casting")+", someone needs your assistance!"; //close ticket
	breakpoint2="The service is down, sorry. "User.get("casting")+", someone needs your assistance!"; //close ticket
	support=[];
    support[0]="Hi,"+Mbr(msg.member,0)+"! The boss isn't here right now, but maybe I can help.\r\n\r\nIs your problem with **Plex**, **Calibre**, or **FTP**? You can also tell me that it's **fixed** to close your trouble ticket.";
	support["calibre"]=breakpoint;
	support["ftp"]=breakpoint;
    support["plex"]=[]; //!ping plex, down=breakpoint2;
    support["plex"][0]="Carl says the service is up, so head on over to <https://vaesse.jasoncollege24.com/> to see if the host is up.\r\nIs the Host up? You can say **yes**, or **no**. You can also tell me to go **back**, or close your ticket by telling me it's **fixed**.";
    support["plex"]["no"]=breakpoint;
	support["plex"]["yes"]=[];
    support["plex"]["yes"][0]="Ok, so everything seems to be working here. What device are you using plex on?\r\nYou can say **Windows**, **Web**, **Android**, **Apple** (for iPads, and iPhones), **Amazon** (for Fire Stick/TV), or **Console**. You can also tell me to go **back**, or close your ticket by saying it's **fixed**.";
	breakpoint="I can't help you with this just yet. "+User.get("casting")+", someone needs your assistance!";
	support["plex"]["yes"]["windows"]=[];
	support["plex"]["yes"]["windows"][0]="What are you trying to do?\r\nView the **library**, watch a **video**, listen to **music**, or look at **pictures**? You can also tell me to go **back**, or close your ticket by telling me it's **fixed**.";
	support["plex"]["yes"]["windows"]["library"]=breakpoint;
	support["plex"]["yes"]["windows"]["video"]=breakpoint;
	support["plex"]["yes"]["windows"]["music"]=breakpoint;
	support["plex"]["yes"]["windows"]["pictures"]=breakpoint;
	support["plex"]["yes"]["web"]=[];
	support["plex"]["yes"]["web"][0]="What are you trying to do?\r\nView the **library**, watch a **video**, listen to **music**, or look at **pictures**? You can also tell me to go **back**, or close your ticket by telling me it's **fixed**.";
	support["plex"]["yes"]["web"]["library"]=breakpoint;
	support["plex"]["yes"]["web"]["video"]=breakpoint;
	support["plex"]["yes"]["web"]["music"]=breakpoint;
	support["plex"]["yes"]["web"]["pictures"]=breakpoint;
	support["plex"]["yes"]["android"]=[];
	support["plex"]["yes"]["android"][0]="What are you trying to do?\r\nView the **library**, watch a **video**, listen to **music**, or look at **pictures**? You can also tell me to go **back**, or close your ticket by telling me it's **fixed**.";
	support["plex"]["yes"]["android"]["library"]=breakpoint;
	support["plex"]["yes"]["android"]["video"]=breakpoint;
	support["plex"]["yes"]["android"]["music"]=breakpoint;
	support["plex"]["yes"]["android"]["pictures"]=breakpoint;
	support["plex"]["yes"]["apple"]=[];
	support["plex"]["yes"]["apple"][0]="What are you trying to do?\r\nView the **library**, watch a **video**, listen to **music**, or look at **pictures**? You can also tell me to go **back**, or close your ticket by telling me it's **fixed**.";
	support["plex"]["yes"]["apple"]["library"]=breakpoint;
	support["plex"]["yes"]["apple"]["video"]=breakpoint;
	support["plex"]["yes"]["apple"]["music"]=breakpoint;
	support["plex"]["yes"]["apple"]["pictures"]=breakpoint;
	support["plex"]["yes"]["amazon"]=[];
	support["plex"]["yes"]["amazon"][0]="What are you trying to do?\r\nView the **library**, watch a **video**, listen to **music**, or look at **pictures**? You can also tell me to go **back**, or close your ticket by telling me it's **fixed**.";
	support["plex"]["yes"]["amazon"]["library"]=breakpoint;
	support["plex"]["yes"]["amazon"]["video"]=breakpoint;
	support["plex"]["yes"]["amazon"]["pictures"]=breakpoint;
	support["plex"]["yes"]["amazon"]["music"]=breakpoint;
	support["plex"]["yes"]["console"]=[];
	support["plex"]["yes"]["console"][0]="What are you trying to do?\r\nView the **library**, watch a **video**, listen to **music**, or look at **pictures**? You can also tell me to go **back**, or close your ticket by telling me it's **fixed**.";
	support["plex"]["yes"]["console"]["library"]=breakpoint;
	support["plex"]["yes"]["console"]["video"]=breakpoint;
	support["plex"]["yes"]["console"]["music"]=breakpoint;
	support["plex"]["yes"]["console"]["pictures"]=breakpoint;
// End support array



// Define Functions
Ch.get=function(id) {
    return Jenny.channels.get(this[id.toLowerCase()]||id.toLowerCase());
};
Ch.ref=function(id) {
    return "<#"+(this[id.toLowerCase()]||id.toLowerCase())+">";
};
Ch.set=function(id,val) {
    this[id.toLowerCase()]=val;
};
Usr.ref=function(id) {
    return "<@&"+(this[id.toLowerCase()]||id.toLowerCase())+">";
};
Usr.set=function(id,val) {
    this[id.toLowerCase()]=val;
};

function Mbr(mem,leadcap) {
    if (leadcap) {
        return mem||"Friend";
    }
    else return mem||"friend";
}

// acknowledge ready state
Jenny.on('ready', () => {
    // console.log('Logged in as ${Jenny.user.tag)!');
    
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
    suppconn = Ch.get("help");
    offconn = Ch.get("test");
    newconn = Ch.get("welcome");

    // uncomment below to set Jenny to send to testing channel. (Ushers/Producer only)
    //onconn=offconn;
    //suppconn=offconn

    // Links to roles and channels.
    CastingRef=Usr.ref("CaStInG");
    RulesRef=Ch.ref("rules");
    CalibreRef=Ch.ref("calibre");
    PlexRef=Ch.ref("plex");
	HelpRef=Ch.ref("help");


    // Wakeup message.
    var say=new Array("Ok ok! I'm up already!","Have no fear, Jenny's here!","Sorry, I was doing some uhh... nerdy stuff.");
	onconn.send(say[Math.floor(Math.random()*say.length)]);

});

// Reply to messages
Jenny.on('message', msg => {
    
    //Plain text social responses
	if (msg.content.match(/^[Hh](e(llo)?|i|y)a?.* [Jj]enny.*/)) {
        var say=new Array("Hi there, "+Mbr(msg.member,0)+"! What's up?");
        msg.channel.send(say[Math.floor(Math.random()*say.length)]);
    }
    if (msg.content.match(/^([Gg]ood ?)?([Bb]ye|[Nn](ight|ite)).* [Jj]enny.*/)) {
        var say=new Array("See ya later!","Come back soon, "+Mbr(msg.member,0)+".");
        msg.channel.send(say[Math.floor(Math.random()*say.length)]);
    }
    if(msg.content.match(/[Mm]orning.* [Jj]enny.*/)) {
        var say=new Array("Need coffee!","Hey look! It's "+Mbr(msg.member,0)+"!");
        msg.channel.send(say[Math.floor(Math.random()*say.length)]);
    }
    if(msg.content.match(/[Tt]hank(s.*| ?you.*) [Jj]enny.*/)) {
        var say=new Array("Any time!","Not a problem!","It's what I'm here for!");
        msg.channel.send(say[Math.floor(Math.random()*say.length)]);
    }

    //// Programatic triggers
    // ping reply
	if (msg.content.match(/^\?[Pp]ing/)) {
        var say=new Array("Yup! You're here!");
        msg.channel.send(say[Math.floor(Math.random()*say.length)]);
    }
    
	// support text
	if (msg.content.match(/^\?[Ss]upport/)) {
	var say=new Array(""+Mbr(msg.member,0)+" Sorry, but I can't help you just yet. Hang on, and the boss will be with you soon. (Trouble ticket open)");
	suppconn.send(say[Math.floor(Math.random()*say.length)]);
	}

	// help text
	if (msg.content.match(/^\?[Hh]elp/)||msg.content.match(/^[Hh]elp.*[Jj]enny.*/)) {
	var say=new Array(""+Mbr(msg.member,0)+", here's a quick help list!"+"\r\n\r\n"+"?ping - Asks me to check if you're online."+"\r\n"+"?support - Opens a trouble ticket (Automated support not available)."+"\r\n"+"?help - Tells me to display this message."+"\r\n\r\n"+"If you need assistance or have a suggestion for my service, let a member of our Casting staff know in "+HelpRef+".");
	msg.channel.send(say[Math.floor(Math.random()*say.length)]);
	}
	
});

Jenny.login(auth.token);
