module.exports={
    name:"reload",
    description:"Reloads a command, after it's been changed.",
    execute(msg,args) {
		rChan = msg.channel;
		if (!args.length) return rChan.send ("You didn't specify a command!");
		const commandName = args[0].toLowerCase();
		const command= Jenny.commands.get(commandName);
		if (!command) return rChan.send("ERROR: Command not found!");
		delete require.cache[require.resolve(`./${command.name}.js`)];
		try {
			const newCommand = require(`./${command.name}.js`);
			Jenny.commands.set(newCommand.name, newCommand);
			rChan.send("Command reloaded!");
		}
		catch (error) {
			Jenny.error(`There was an issue with the reload. [C4]\n`, error);
			rChan.send(`${Jenny.errs} [C4]`);
		}
    }
}