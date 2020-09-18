/*
    Future Plans:
	fix drvchk
	Finish automated support tickets
	Implement ping for support
	write open support tickets to file (delete file on ticket close)
	Add underlay for support
	
	Known issues:
		If Carl's service isn't running, Jenny doesn't timeout, waiting for his ping reply.
*/
// Set constants
const findPlugins=function(client,command,plg) {
    let [prop,key]=plg;
    if (Object.keys(command).includes("execute") && Object.keys(command).includes(key)) client[prop].set(command[key],command);
    else Object.keys(command).forEach((c) => {findPlugins(client,command[c],plg);});
}

const fs=require('fs');
const Discord=require('discord.js');
const {prefix,token}=require('/home/plex/bots/authJenny.json');
const Jenny = new Discord.Client();
const Ch = require('./ch.js');
//const Em = {};
const Role = require('./role.js');

let plugins=[["commands","name"],["socials","trigger"]]; // Array setup is ["folder-type","key"]
plugins.forEach(plg=>{
    Jenny[plg[0]]=new Discord.Collection(); //Jenny.commands=new Discord.Collection();
    let tmp=fs.readdirSync("./"+plg[0]).filter(file => file.endsWith(".js"));
    for (const file of tmp) findPlugins(Jenny,require(`./${plg[0]}/`+file),plg);
});


// Set variables
//Recs = {"list":[]};
let carl=true;
let nCarl;
let kill;
Jenny.ticket=[];
Jenny.waitForPing=false;
errs="Oops! I dropped something!";
training=false; //change to false for normal operation

// Functions
functions=require("./functions.js");
Mbr=functions.Mbr;
reply=functions.reply;
checkit=functions.checkit;

// Underlay function for support, and tips
underlay=function(say,cat) {
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


// acknowledge ready state
Jenny.on('ready', () => {
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
	Role.set("staff","676660602688765962");
    
    // define frequently used channels.
    offconn = Ch.get(Jenny,"test");
    repconn = Ch.get(Jenny,"report");
    if (training) {
        onconn=offconn;
        suppconn=offconn;
    }
    else {
        onconn = Ch.get(Jenny,"bot");
        suppconn = Ch.get(Jenny,"help");
    }
        
    // Links to roles and channels.
    CastingRef=Role.ref("casting");
    RulesRef=Ch.ref("rules");
    CalibreRef=Ch.ref("calibre");
    PlexRef=Ch.ref("plex");
	HelpRef=Ch.ref("help");
    SupportRef=Role.ref("support");

	// Support Array
	Jenny.support=require("./support.js");
	Jenny.timers=[];
    // Wakeup message.
    var say=new Array("Ok ok! I'm up already!","Have no fear, Jenny's here!","Sorry, I was doing some uhh... nerdy stuff.");
	onconn.send(say[Math.floor(Math.random()*say.length)]);

	// Drive check
    //Jenny.setInterval(()=> require('./drvchk.js')(suppconn,Role.ref("staff")),350000);
	


});

// Reply to messages
Jenny.on('message', msg => {
	if (Jenny.user.id !== msg.author.id) {
		require('./noproblemo.js')(msg);
		var input=msg.content.toLowerCase();
		var tag="<@"+msg.author.id+">";
		//response modules
		require('./tips.js')(msg,underlay); //tips module (Programmatic)
	 
		const args = msg.content.slice(prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();
		if (msg.content.startsWith(prefix+commandName) && Jenny.commands.has(commandName)) {
			const command=Jenny.commands.get(commandName);
			if (command.args && !args.length) {
				let reply = `You didn't provide any arguments, ${message.author}!`;
				if (command.usage) {
					reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
				}
				return message.channel.send(reply);
			}
			else command.execute(msg, args);
		}

		//Plain text social responses
		else {
			let say;
			Jenny.socials.forEach(social => {if (social.trigger(msg)) say=social.execute(msg);});
			if (say && say.length > 0) {
				if (Array.isArray(say)) msg.channel.send(say[Math.floor(Math.random()*say.length)]);
				else if (typeof say == "string") msg.channel.send(say);
			}
		}

	 //// Programatic triggers
		// help text
		if (input.match(/^\?help/)||input.match(/^help.*jenny.*/)) {
			var say=new Array(Mbr(msg.member,0)+", here's a quick help list!\n\n?ping - Asks me to check if you're online.\n?support - Opens a trouble ticket (Automated support is in Beta, and requires Carl to be online.).\n?tip - tells me to give you a random support tip. (New!)\n?help - Tells me to display this message.\n\nNeed help from Carl? type !help to see what he can do!\n\nIf you need assistance or have feedback about my service, let a member of our Casting staff know in "+HelpRef+".");
			msg.channel.send(say[Math.floor(Math.random()*say.length)]);
		}
	}
});

Jenny.login(token);

process.on('SIGTERM', () => {
	try {
		if (!kill) {
			kill=true;
			onconn.send("I need a break! Be back in five!");
			setTimeout(() => {
				console.log("Waited for exit");
				process.exit(0);
			},500).unref();
		}
	}
	catch(e) {
		console.error(e);
		return;
	}
});
