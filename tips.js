// hidden links example "There's a pretty good description of the Habitica [classes](https://discordapp.com/channels/664197181846061077/664199483025915904/664219513172131843) in our adventure guide."

module.exports=function(msg,underlay) {
    var input=msg.content.toLowerCase();
	var say=[]
	if (input.match(/^\?tip/)) {
		//tips
		var say=[
			"TIP: Did you know? It's ok to see a warning that you can't reach our Plex securely on first use (may be device dependent). Just select 'Allow always' when prompted.",
			"TIP: Did you know? Plex libraries always default to show 'Recommended' items on first use. To show the entire library, change that to 'Library', and you should be good to go.",
			"TIP: Did you know? Each device uses Plex a bit differently, so what works on one, may not always work on another.",
			"TIP: Did you know? Plex, Calibre, and other relevent services automatically get restarted around 3am (Eastern), for continued stability, and updates. In some cases, the entire server restarts.
			"TIP: Still see the episode, movie, or other item you just finished playing in 'On Deck', or 'Continue watching'? This is a known Plex bug! Click on another menu item, then back to the server's home, or refresh the page, and it will update."
		];
		msg.channel.send(underlay(say[Math.floor(Math.random()*say.length)],"tips"));
	}
}
