/* testing a git pull
    Future Plans:
	Finish automated support tickets
	write open support tickets to file (delete file on ticket close)
	Add underlay for support
	
	Known issues:
		Doesn't parse existing reports on startup, unless a message is sent first
		
*/
// Set constants
Discord=require('discord.js'),fs=require('fs'),{prefix,token}=require('/home/plex/bots/authJenny.json'),Jenny=new Discord.Client();
const findPlugins=function(client,command,plg) {
    let [prop,key]=plg;
    if (Object.keys(command).includes("execute") && Object.keys(command).includes(key)) client[prop].set(command[key],command);
    else Object.keys(command).forEach((c) => {findPlugins(client,command[c],plg);});
}
// Set variables
let logging=true,carl,nCarl,kill,plugins=[["commands","name"],["socials","trigger"]]/* Plugins array setup is ["folder-type","key"] */;
Jenny.errs="Oops! I dropped something!";
Jenny.chanMan = require('./ch.js');
Jenny.roleMan = require('./role.js');
Jenny.ticket=[];
Jenny.waitForPing=false;
Jenny.training=false; //change to false for normal operation
Jenny.trainRep=false; //change to false for normal problem reports
// Functions
plugins.forEach(plg=>{
    Jenny[plg[0]]=new Discord.Collection(); //Jenny.commands=new Discord.Collection();
    let tmp=fs.readdirSync(`./${plg[0]}`).filter(file => file.endsWith(".js"));
    for (const file of tmp) findPlugins(Jenny,require(`./${plg[0]}/${file}`),plg);
});
reply=function(say,chan) { // use for social replies
    if (say) {
        if (!chan) {
            chan=onconn;
            console.error("No channel was sent! (A2)");
            say=`${say} ${errs} (A2)`;
        }
        return chan.send(say);
    }
}
Jenny.underlay=function(say,cat) { // Underlay function for support, and tips
	var color='#000000';
	if (!say) {
		var say=`${errs} (A1)`;
		console.error("Oops! There's no say! (A1)");
	}
	else if (cat == "tips") {
		color='#C70039';
	}
	else if (cat == "support") {
		color='#FFC300';
	}
	var embed = new Discord.MessageEmbed()
	.setColor(color)
	.setDescription(say);
	return embed;
}
Jenny.warn=Jenny.error=function(txt, error){ // logging console errors to disk
	console.error(error);
	if (logging) {
		fs.appendFileSync('./errorlog.txt', `\n****\nERROR: ${txt}`);
		fs.appendFileSync('./errorlog.txt', `${error.stack}\n****`);
	}
}
Jenny.log=function(txt) { // logging console logs to disk
	console.log(txt);
	if (logging) {
		fs.appendFileSync('./errorlog.txt', txt);
	}
}
// acknowledge ready state
Jenny.on('ready', () => {
	/*
	Jenny.guilds.cache.get("581333387403329557").members.fetch("231506627654582272").then(Carl=>{
		carl=Carl.presence.status=="offline"?false:true;
		Jenny.log(Carl.presence);
	});
	*/
	fs.createWriteStream('./errorlog.txt');
	Jenny.log('Logged in as Jenny, and ready to go!');
    //define Jenny.chanMan and Jenny.roleMan objects.
    Jenny.chanMan.set("welcome","581340165520359424");
    Jenny.chanMan.set("plex","581346715852865547");
    Jenny.chanMan.set("calibre","590195078765608961");
    Jenny.chanMan.set("bot","675864898617606184");
    Jenny.chanMan.set("help","583979972578770945");
    Jenny.chanMan.set("test","681380531493142533");
    Jenny.chanMan.set("rules","581352180355694603");
    Jenny.chanMan.set("report","581603029263056921");
    Jenny.roleMan.set("casting","581334517151825920");
    Jenny.roleMan.set("support","692818837736915054");
	Jenny.roleMan.set("staff","676660602688765962");
    // define frequently used channels.
    offconn = Jenny.chanMan.get(Jenny,"test");
    repconn = Jenny.chanMan.get(Jenny,"report");
	suppchan = Jenny.chanMan.get(Jenny,"help");
    if (Jenny.training) {
        onconn=offconn;
        suppconn=offconn;
    }
    else {
        onconn = Jenny.chanMan.get(Jenny,"bot");
        suppconn = Jenny.chanMan.get(Jenny,"help");
    }
    // Links to roles and channels.
    CastingRef=Jenny.roleMan.ref("casting");
    RulesRef=Jenny.chanMan.ref("rules");
    CalibreRef=Jenny.chanMan.ref("calibre");
    PlexRef=Jenny.chanMan.ref("plex");
	HelpRef=Jenny.chanMan.ref("help");
    SupportRef=Jenny.roleMan.ref("support");
	// Support Array
	Jenny.support=require("./support.js");
	Jenny.timers=[];
    // Wakeup message.
    var say=[
		"Ok ok! I'm up already!",
		"Have no fear, Jenny's here!",
		"Sorry, I was doing some uhh... nerdy stuff."
	];
	onconn.send(say[Math.floor(Math.random()*say.length)]).catch(error => {
		Jenny.error("There was an issue waking up. [A1]\n", error);
		onconn.send(`${Jenny.errs} [A1]`);
	});
});

// Check for Carl's online status
/*
Jenny.on('presenceUpdate', (oldPresence, newPresence) => {
    if (newPresence.member.id === '675406803567378512'){
		if (newPresence.status == 'offline') offconn.send(`Carl is ${newPresence.status}!`);
		carl=newPresence.status=="offline"?false:true;
		Jenny.log(carl);
	}
});
*/

// Reply to messages
Jenny.on('message', msg => {
	if (Jenny.user.id !== msg.author.id) {
		require('./noproblemo.js')(msg);
		let input=msg.content.toLowerCase();
		let tag=`${msg.author}`;
		//response modules
		//require('./tips.js')(msg,underlay); //tips module (Programmatic)
	 
		let args = msg.content.slice(prefix.length).split(/ +/);
		let commandName = args.shift().toLowerCase();
		if (msg.content.startsWith(prefix+commandName) && Jenny.commands.has(commandName)) {
			const command=Jenny.commands.get(commandName);
			if (command.args && !args.length) {
				let reply = `You didn't provide any arguments, ${msg.author}!`;
				if (command.usage) {
					reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
				}
				return msg.channel.send(reply);
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
			var say=new Array(`${msg.author}, here's a quick help list!\n\n?ping - Asks me to check if you're online.\n?support - Opens a trouble ticket (Automated support is in Beta.).\n?tip - tells me to give you a random support tip.\n?help - Tells me to display this message.\n\nNeed help from Carl? type !help to see what he can do!\n\nIf you need assistance or have feedback about my service, let a member of our Casting staff know in ${HelpRef}.`);
			msg.channel.send(say[Math.floor(Math.random()*say.length)]);
		}
	}
});

Jenny.login(token);