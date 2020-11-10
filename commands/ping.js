module.exports={
    name:"ping",
    description:"Asks me to check if you're online.",
    execute(msg,args) {
        var say=new Array("Yup! You're here!");
        msg.channel.send(say[Math.floor(Math.random()*say.length)]);
    }
}