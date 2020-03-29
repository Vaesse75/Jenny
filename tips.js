// hidden links example "There's a pretty good description of the Habitica [classes](https://discordapp.com/channels/664197181846061077/664199483025915904/664219513172131843) in our adventure guide."

module.exports=function(input) {
	if (input.match(/^\?tip/)) {
		//tips
		var say=[
			"TIP: Did you know? It's normal to see a warning that you can't reach our Plex securely on first use (per device). Just select 'Allow always' when prompted.",
			"TIP: Did you know? Plex libraries always default to show 'Recommended' items on first use. To show the entire library, change that to 'Library', and you should be good to go."
		];
		tip=underlay(say[Math.floor(Math.random()*say.length)],tips);
		msg.channel.send({ tip });
	}
}
