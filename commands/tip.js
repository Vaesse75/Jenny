// hidden links example "There's a pretty good description of the Habitica [classes](https://discordapp.com/channels/664197181846061077/664199483025915904/664219513172131843) in our adventure guide."

module.exports={
	name:"tip",
	description:"tells me to give you a random support tip.",
	execute(msg,args) {
		var Jenny=msg.client;
		var say=[];
		var say=[
			"TIP #1: Did you know? It's ok to see a warning that you can't reach our Plex securely on first use (may be device dependent). Just select 'Allow always' when prompted.",
			"TIP #2: Did you know? Plex libraries always default to show 'Recommended' items on first use. To show the entire library, change that to 'Library', and you should be good to go.",
			"TIP #3: Did you know? Each device uses Plex a bit differently, so what works on one, may not always work on another.",
			"TIP #4: Did you know? Plex, Calibre, and other relevent services automatically get restarted around 3am (Eastern), for continued stability, and updates. In some cases, the entire server restarts.",
			"TIP #5: Still see the episode, movie, or other item you just finished playing in 'On Deck', or 'Continue watching'? This is a known Plex bug! Click on another menu item, then back to the server's home, or refresh the page, and it will update.",
			"TIP #6: Did you pause your video for a time, only to find that it stops playback a few seconds after being resumed? This is a recently discovered issue. To get around it, refresh the page, or reload the app, then click or tap on your video to resume playback from where you left off."
		];
		if (args.length) {
			client.log(`say[args] is ${args}`);
			if (isNaN(args) || args == 0 || args > say.length) {
				msg.channel.send(client.underlay(`ERROR: Argument must be a tip number between 1-${say.length}.	(eg ${prefix}tip 3)`,"tips"));
			}
			else {
				args=args-1;
				msg.channel.send(client.underlay(say[args],"tips"));
			}
		}
		else {
			msg.channel.send(Jenny.underlay(say[Math.floor(Math.random()*say.length)],"tips"));
		}
	}
}
