module.exports={
    timer:{
        name:"timer",
        description:"Cancelable timer for testing",
        execute(msg,args) {
            if (args[0].match(/set/i)) {
                if (args[1]!=NaN) {
                    msg.client.timer=setTimeout(()=>{console.log("Time's up.");},(args[1]*1000));
                }
            }
            else if (args[0].match(/clear/i)) {
                clearTimeout(msg.client.timer);
            }
        }
    }
}