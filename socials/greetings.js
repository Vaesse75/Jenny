module.exports={
	hi1:{
		trigger(msg) {
			return !!msg.content.match(/^h(ey|ello|i)a?.* jenny.*/i);
		},
		execute(msg) {
			return [
				"Hi there, "+msg.author+"! What's up?",
				"What's up?",
				"Hi!",
				"Hey there!",
			];
		}
	},
	hi2:{
		trigger(msg) {
			return !!msg.content.match(/^(good ?)?morning.* jenny.*/i);
		},
		execute(msg) {
			return [
				"Need coffee!",
				"Morning.",
				"Hey look! It's "+msg.author+"!",
				"It's still morning? Why do I not have coffee?",
			];
		}
	},
	bye:{
		trigger(msg) {
			return !!msg.content.match(/^(good ?)?(bye|n(ight|ite)).* jenny.*/i);
		},
		execute(msg) {
			return [
				"Later!",
				"See ya later!",
				"Come back soon, "+msg.author+".",
				"You're leaving already!?"
			];
		}
	},
	ty:{
		trigger(msg) {
			return !!msg.content.match(/thank(s.*| ?you.*) jenny.*/i);
		},
		execute(msg) {
			return [
				"Any time!",
				"Not a problem!",
				"It's what I'm here for!",
				"You betcha!"
			];
		}
	}
}