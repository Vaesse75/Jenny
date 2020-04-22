/*
    Future Plans:
	Finish automated support tickets
	Implement ping for support
	write open support tickets to file (delete file on ticket close)
	Add underlay for support
	
	Known issues:
		If Carl's service isn't running, Jenny doesn't timeout, waiting for his ping reply.
*/

// Set constants
const Discord = require('discord.js');
const Jenny = bot = new Discord.Client();
const auth = require('/home/plex/bots/authJenny.json');
//const fs = require('fs');
const Ch = require('./ch.js');
//const Em = {};
const Role = require('./role.js');

// Set variables
//Recs = {"list":[]};
ticket=[];
waitForCarl=false;
errs="Oops! I dropped something!";
training=false; //change to false for normal operation

// Functions
functions=require("./functions.js");
underlay=functions.underlay;
walkSupport=functions.walkSupport;
Mbr=functions.Mbr;
reply=functions.reply;
checkit=functions.checkit;

// acknowledge ready state
Jenny.once('ready', () => {
    // console.warn('Logged in as ${Jenny.user.tag)!');
    
    //define Ch and Role objects.
    Ch.set("welcome","581340165520359424");
    Ch.set("plex","581346715852865547");
    Ch.set("calibre","590195078765608961");
    Ch.set("bot","675864898617606184");
    Ch.set("help","583979972578770945");
    Ch.set("test","681380531493142533");
    Ch.set("rules","581352180355694603");
    Ch.set("report","581603029263056921");
    Role.set("casting","581334517151825920");
    Role.set("support","692818837736915054");
    
    // define frequently used channels.
    offconn = Ch.get("test");
    if (training) {
        onconn=offconn;
        suppconn=offconn;
        repconn=Ch.get("report"); //comment this to test report module
        //repconn=offconn; //uncomment this to test report module
    }
    else {
        onconn = Ch.get("bot");
        suppconn = Ch.get("help");
        repconn = Ch.get("report");
    }
        
    // Links to roles and channels.
    CastingRef=Role.ref("casting");
    RulesRef=Ch.ref("rules");
    CalibreRef=Ch.ref("calibre");
    PlexRef=Ch.ref("plex");
	HelpRef=Ch.ref("help");
    SupportRef=Role.ref("support");

	// Support Array
	require("./support.js");

    // Wakeup message.
    var say=new Array("Ok ok! I'm up already!","Have no fear, Jenny's here!","Sorry, I was doing some uhh... nerdy stuff.");
	onconn.send(say[Math.floor(Math.random()*say.length)]);

});

// Reply to messages
Jenny.on('message', msg => {
	require('./noproblemo.js')(msg);
    var input=msg.content.toLowerCase();
    var tag="<@"+msg.author.id+">";

    //response modules
    require('./social.js')(input,reply,msg.channel); // Social responses (Plain text)
    require('./tips.js')(input,underlay,msg.channel,msg.member); //tips module (Programmatic)
 
 //// Programatic triggers
    //undocumented test trigger
    if (input.match(/^\?test ping/)) {
        var plex="plexmediaserver";
        var calibre="calibre-server";
        var ftp="proftpd";
            var say1="Theater is "+check("plexmediaserver");
            var say2="Library is "+check("calibre-server");
            var say3="FTP is "+check("proftpd");
        msg.channel.send(say1+" "+say2+" "+say3);
    }
 
    // ping reply
	if (input.match(/^\?ping/)) {
        var say=new Array("Yup! You're here!");
        msg.channel.send(say[Math.floor(Math.random()*say.length)]);
    }
	// support text
	if (input.match(/^\?support/)) {
        ticket[msg.author.id]=input.substr(9).split(" ");
        var level=support;
        if (ticket[msg.author.id].length>0 && ticket[msg.author.id][0] != "") {
            var keys="";
            for (var key in level) {
                if (keys != "") keys+=",";
                keys+=key;
            }
            if (ticket[msg.author.id].length > 0 && keys.indexOf(ticket[msg.author.id][0]) >= 0) {
                waitForCarl=ticket[msg.author.id][0];
                suppconn.send(tag+", "+pingwarn);
				suppconn.send("!ping "+ticket[msg.author.id][0]+" for "+tag);
            }
            else {
                ticket[msg.author.id]=[];
                //suppconn.send(support[0]);
            }
        }
        else {
            ticket[msg.author.id]=[];
            //suppconn.send(support[0]);
        }
	}

    // If author has an open ticket
	if (ticket[msg.author.id] && !input.match(' ')) {
        var arr=ticket[msg.author.id];
        var said=input.split(" ")[0];
        var level=walkSupport(ticket[msg.author.id]);
        var keys="";
        for (var key in level) {
            if (keys != "") keys+=",";
            keys+=key;
        }
        if (keys.indexOf(said) >= 0) {
            arr.push(said);
            level=walkSupport(arr);
            var keys="";
            for (var key in level) {
                if (keys != "") keys+=",";
                keys+=key;
            }
        }
        if (said=="back") {
            ticket[msg.author.id].pop();
            level=walkSupport(ticket[msg.author.id]);
            suppconn.send(tag+", "+level[0]);
        }
        else if (said=="fixed") {
         suppconn.send(tag+", "+fixedbreak);
         ticket[msg.author.id]=null;
        }
		else if (said=="cancel") {
			suppconn.send(tag+", "+cancelbreak);
			ticket[msg.author.id]=null;
		}
		else if (ticket[msg.author.id].length==1 && said != "?support") {
            waitForCarl=ticket[msg.author.id][0];
            suppconn.send(tag+", "+pingwarn);
            suppconn.send("!ping "+ticket[msg.author.id][0]+" for "+tag);
        }
        else if (typeof level == "string") {
            suppconn.send(tag+", "+level);
            ticket[msg.author.id]=null;
        }
        else  {
            suppconn.send(tag+", "+level[0]);
        }
 
    }
    if (input.match(/^[^,]*, (\w* ){2}is .*\.$/) && waitForCarl) {
        tag=input.split(",")[0];
        if (input.substr(input.length-5,4)=="open" || input.substr(input.length-3,2)=="up") {
            suppconn.send(tag+", "+support[waitForCarl][0]);
        }
        else if (input.substr(input.length-7,6)=="closed" || input.substr(input.length-5,4)=="down") {
            suppconn.send(tag+", "+breakpoint2);
      		ticket[msg.author.id]=null;
        }
        waitForCarl=false;
    }
    // help text
	if (input.match(/^\?help/)||input.match(/^help.*jenny.*/)) {
        var say=new Array(Mbr(msg.member,0)+", here's a quick help list!\n\n?ping - Asks me to check if you're online.\n?support - Opens a trouble ticket (Automated support is in Beta, and requires Carl to be online.).\n?tip - tells me to give you a random support tip. (New!)\n?help - Tells me to display this message.\n\nNeed help from Carl? type !help to see what he can do!\n\nIf you need assistance or have feedback about my service, let a member of our Casting staff know in "+HelpRef+".");
        msg.channel.send(say[Math.floor(Math.random()*say.length)]);
	}
});

Jenny.login(auth.token);
