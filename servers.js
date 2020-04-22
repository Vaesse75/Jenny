// usage: variable=require(filename)(<plexmediaserver>|<calibre-server>|<proftpd>);
module.exports=function(args) {
    var shellCommand = require("linux-shell-command").shellCommand;
    var sc = shellCommand("systemctl status "+args+"|grep Active|while read a b c;do echo $b;done");
    sc.execute()
    .then(success => {
        //for (var r in Server) {
          //  if (args==Server[r]) s=r;
        //}
        if (success === true && sc.stdout != "") {
            if (sc.stdout.slice(0,6) == "active") {
                return true;
            }
            else if (sc.stdout.slice(0,6) != "active") {
                return false;
            }
        }
    })
    .catch(e => {
        console.error(e);
    });
}
