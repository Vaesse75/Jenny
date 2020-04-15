function Check(args,chan,pass) {
    var shellCommand = require("linux-shell-command").shellCommand;
    for (var s=0;s<Server.length;s++) {
        if (args == Server[s]) {
            var sc = shellCommand("systemctl status "+ServerProc[s]+"|grep Active|while read a b c;do echo $b;done");
            sc.execute()
            .then(success => {
                for (var r in Server) {
                    if(args==Server[r]) s=r;
                }
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
        else if (args==ServerProc[s]) {
            Check(Server[s],chan);
        }
        else if (args==""||args=="all") {
            Check(Server[s],chan,"all");
        }
    }
    if(chan) Report(args,chan);
}
    // Arrays of services and other related sundries.
    Server=new Array("plex","calibre","ftp");
    ServerProc=new Array("plexmediaserver","calibre-server","proftpd");

    // Fill Online status array with indeterminant state.
    for (args in Server) {
        Online[Server[args]]="unknown";
    }
    // First check
    Check('');

    // Repeat checks
     // setInterval(function() {Check('')},5000);
        // ping reply
module.exports=Check;