module.exports={
    get:function(bot,id) {
        return bot.channels.cache.get(this[id.toLowerCase()]||id.toLowerCase());
    },
    ref:function(id) {
        return "<#"+(this[id.toLowerCase()]||id.toLowerCase())+">";
    },
    set:function(id,val) {
        this[id.toLowerCase()]=val;
    }
}