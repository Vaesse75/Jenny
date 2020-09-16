module.exports={
    timer:{
        name:"timer",
        description:"Cancelable timer for testing",
        execute(message,args) {
            if (args[0].match(/set/i)) {
                if (args[1]!=NaN) {
                    message.client.timer=setTimeout(()=>{console.log("Time's up.");},(args[1]*1000));
                }
            }
            else if (args[0].match(/clear/i)) {
                clearTimeout(message.client.timer);
            }
        }
    }
}