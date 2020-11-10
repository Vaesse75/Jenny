module.exports={
    get:function(msg,id) {
        return msg.member.roles.cache.get(this[id.toLowerCase()]||id.toLowerCase());
    },
    ref:function(id) {
        return "<@&"+(this[id.toLowerCase()]||id.toLowerCase())+">";
    },
    set:function(id,val) {
        this[id.toLowerCase()]=val;
    }
}