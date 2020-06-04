module.exports=function(msg) {
	var input=msg.content.toLowerCase();
	var tag=msg.author;
	var say=[];
	if (input.match(/^h(ey|ello|i)a?.* jenny.*/)) {
		say=[
			"Hi there, "+tag+"! What's up?",
			"What's up?",
			"Hi!",
			"Hey there!",
		];
	}
	if (input.match(/^(good ?)?(bye|n(ight|ite)).* jenny.*/)) {
		say=[
			"Later!",
			"See ya later!",
			"Come back soon, "+tag+".",
			"You're leaving already!?"
		];
	}
	if (input.match(/^(good ?)?morning.* jenny.*/)) {
		say=[
			"Need coffee!",
			"Morning.",
			"Hey look! It's "+tag+"!",
			"It's still morning? Why do I not have coffee?",
		];
	}
	if (input.match(/thank(s.*| ?you.*) jenny.*/)) {
		say=[
			"Any time!",
			"Not a problem!",
			"It's what I'm here for!",
			"You betcha!"
		];
	}
	if (input=="was that star trek or star wars?") {
		say=[
			"Hmmm.... That's a really hard choice!",
			"Why not both?",
			"Today, I prefer the Firefly class!",
            "Let's just say Tribbles are adorably troublesome...",
            "These are not the bots you're looking for."
		];
	}
	if (say && Array.isArray(say) && say.length > 0) msg.channel.send(say[Math.floor(Math.random()*say.length)]);
};
