module.exports=function(input,say,chan,member) {
	var text=[];
	if (input.match(/^h(ey|ello|i)a?.* jenny.*/)) {
		text=[
			"Hi there, "+Mbr(member,0)+"! What's up?",
			"What's up?",
			"Hi!",
			"Hey there!",
		];
	}
	if (input.match(/^(good ?)?(bye|n(ight|ite)).* jenny.*/)) {
		text=[
			"Later!",
			"See ya later!",
			"Come back soon, "+Mbr(member,0)+".",
		];
	}
	if (input.match(/^(good ?)?morning.* jenny.*/)) {
		text=[
			"Need coffee!",
			"Morning.",
			"Hey look! It's "+Mbr(member,0)+"!",
			"It's still morning? Why do I not have coffee?",
		];
	}
	if (input.match(/thank(s.*| ?you.*) jenny.*/)) {
		text=[
			"Any time!",
			"Not a problem!",
			"It's what I'm here for!",
			"You betcha!"
		];
	}
	if (input=="was that star trek or star wars?") {
		text=[
			"Hmmm.... That's a really hard choice!",
			"Why not both?",
			"Today, I prefer the Firefly class!",
            "Let's just say Tribbles are adorably troublesome...",
            "These are not the bots you're looking for."
		];
	}
	say(text[Math.floor(Math.random()*say.length)],chan);
};
