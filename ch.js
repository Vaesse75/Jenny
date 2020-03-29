this.get=function(id) {
    return Jenny.channels.get(this[id.toLowerCase()]||id.toLowerCase());
};
this.ref=function(id) {
    return "<#"+(this[id.toLowerCase()]||id.toLowerCase())+">";
};
this.set=function(id,val) {
    this[id.toLowerCase()]=val;
}
