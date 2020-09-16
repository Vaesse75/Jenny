module.exports={
	start1:{
		trigger(msg) {
			return !!(msg.content.toLowerCase()=="my apologies, i was a bit distracted." && Math.floor(Math.random() * 4)==0)
		},
		execute(msg){
			return [
				"What's her name?",
				"Umm... Do I really want to know?",
				"At least somebody's having fun."
			];
		}
	},
	followUp1:{
		trigger(msg) {
			return !!(msg.content.toLowerCase()=="was that Star Trek or Star Wars?")
		},
		execute(msg) {
			return [
				"Hmmm.... That's a really hard choice!",
				"Why not both?",
				"Today, I prefer the Firefly class!",
				"Let's just say Tribbles are adorably troublesome...",
				"These are not the bots you're looking for."
			];
		}
	}
}