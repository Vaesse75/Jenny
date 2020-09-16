// this file is a test

module.exports={
    name:"ping",
    description:"Make the bot respond to you",
    execute(msg,args) {
        var say=new Array("Yup! You're here!");
        msg.channel.send(say[Math.floor(Math.random()*say.length)]);
    }
}