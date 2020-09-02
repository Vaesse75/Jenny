/*

}
*/
//Support breakpoints
	plexwarn1=""
	pingwarn="hang on, while I check with Carl...";
	cancelbreak="your ticket is closed. "+SupportRef+" will be with you soon.";
	fixedbreak="I'll close your ticket, and mark it as resolved. If you need more help, come see me again!";
	breakpoint="I can't help you with this just yet. "+SupportRef+", someone needs your assistance! (Ticket closed)"; 
	breakpoint2="the service is down, sorry. "+CastingRef+", service appears to be down! (Ticket closed)";
	breakpoint3="It sounds like you need a password reset. "+breakpoint;
	breakpointCarl="It looks like Carl isn't here. "+CastingRef+", Carl's slacking off! (Ticket closed)";

//Support questions
	service1="so head on over to <https://vaesse.jasoncollege24.com/> to see if the host is up.\r\nIs the Host up? You can say **yes**, or **no**.";
	service2="everything seems to be working here.";
	device="What device are you using? ";
	alloptions="You can also tell me to go **back**, **cancel** your ticket, or resolve your ticket by telling me it's **fixed**.";
	question1="Can you get into the app/player at all? You can say **yes**, or **no**.";
	question2="what are you trying to do?\r\nView the **library**, watch a **video**, listen to **music**, or look at **pictures**?";
	libq1="Have you previously requested access? You can say **yes**, or **no**.";
	libq2="is the library visible at all? You can say **yes**, or **no**.";
	browserq1="Which web browser are you using? You can say **IE** (Internet Explorer), **Edge**, **Chrome**, **Mozilla** (Firefox/Waterfox), **Safari**, or **other**.";

//support Array
	support=[];
    support[0]="the boss isn't here right now, but maybe I can help. Is your problem with **Plex**, **Calibre**, or **FTP**? You can also **cancel** your ticket, or tell me that it's **fixed** to close your trouble ticket.";

	//Calibre section
	support["calibre"]=[]; //!ping calibre, down=breakpoint2;
	support["calibre"][0]="the library is open, "+service1+" "+alloptions;
	support["calibre"]["no"]=breakpoint2;
	support["calibre"]["yes"]=[];
	support["calibre"]["yes"][0]=service2+" "+libq1+" "+alloptions;
	support["calibre"]["yes"]["no"]=breakpoint;
	//Calibre has user
	support["calibre"]["yes"]["yes"]=[];
	support["calibre"]["yes"]["yes"][0]="Ok, so what are you trying to do? **Login**, open a **book**, or **other**? "+alloptions;
	support["calibre"]["yes"]["yes"]["book"]=breakpoint;
	support["calibre"]["yes"]["yes"]["other"]=breakpoint;
	//Calibre Login
	support["calibre"]["yes"]["yes"]["login"]=[];
	support["calibre"]["yes"]["yes"]["login"][0]="Does Calibre just return you to a clear login screen, instead of logging you in? You can say **yes**, or **no**. "+alloptions;
	support["calibre"]["yes"]["yes"]["login"]["no"]=breakpoint;
	support["calibre"]["yes"]["yes"]["login"]["yes"]=breakpoint3;

	// FTP section
	support["ftp"]=[]; //!ping ftp, down=breakpoint2;
	support["ftp"][0]="FTP is up, "+service1+" "+alloptions;
	support["ftp"]["yes"]=breakpoint;
	support["ftp"]["no"]=breakpoint;

	//Plex section
    support["plex"]=[]; //!ping plex, down=breakpoint2;
    support["plex"][0]="the theater is open, "+service1+" "+alloptions;
    support["plex"]["no"]=breakpoint;
	support["plex"]["yes"]=[];
    support["plex"]["yes"][0]=service2+" "+device+"You can say **Windows**, **Web**, **Android**, **Apple** (for iPads, and iPhones), **Amazon** (for Fire Stick/TV), or **Console**. "+alloptions;
	//plex web
	support["plex"]["yes"]["web"]=[];
	support["plex"]["yes"]["web"][0]=question1+" "+alloptions;
	support["plex"]["yes"]["web"]["yes"]=[];
	support["plex"]["yes"]["web"]["yes"][0]=question2+" "+alloptions;
		
	support["plex"]["yes"]["web"]["yes"]["library"]=[];
	support["plex"]["yes"]["web"]["yes"]["library"][0]=libq1+" "+alloptions;
	support["plex"]["yes"]["web"]["yes"]["library"]["yes"]=breakpoint;
	support["plex"]["yes"]["web"]["yes"]["library"]["no"]=breakpoint;
	support["plex"]["yes"]["web"]["yes"]["video"]=breakpoint;
	support["plex"]["yes"]["web"]["yes"]["music"]=breakpoint;
	support["plex"]["yes"]["web"]["yes"]["pictures"]=breakpoint;
	support["plex"]["yes"]["web"]["no"]=breakpoint;
	//plex Windows
	support["plex"]["yes"]["windows"]=[];
	support["plex"]["yes"]["windows"][0]=question1+" "+alloptions;
	support["plex"]["yes"]["windows"]["yes"]=[];
	support["plex"]["yes"]["windows"]["yes"][0]=question2+" "+alloptions;
	support["plex"]["yes"]["windows"]["yes"]["library"]=[];
	support["plex"]["yes"]["windows"]["yes"]["library"][0]=libq1+" "+alloptions;
	support["plex"]["yes"]["windows"]["yes"]["library"]["yes"]=[];
	support["plex"]["yes"]["windows"]["yes"]["library"]["yes"][0]=libq2+" "+alloptions;
	support["plex"]["yes"]["windows"]["yes"]["library"]["yes"]["yes"]=breakpoint;
	support["plex"]["yes"]["windows"]["yes"]["library"]["yes"]["no"]=breakpoint;
	support["plex"]["yes"]["windows"]["yes"]["library"]["no"]=breakpoint;
	support["plex"]["yes"]["windows"]["yes"]["video"]=breakpoint;
	support["plex"]["yes"]["windows"]["yes"]["music"]=breakpoint;
	support["plex"]["yes"]["windows"]["yes"]["pictures"]=breakpoint;
	support["plex"]["yes"]["windows"]["no"]=breakpoint;
	//plex android
	support["plex"]["yes"]["android"]=[];
	support["plex"]["yes"]["android"][0]=question1+" "+alloptions;
	support["plex"]["yes"]["android"]["yes"]=[];
	support["plex"]["yes"]["android"]["yes"][0]=question2+" "+alloptions;
	support["plex"]["yes"]["android"]["yes"]["library"]=[];
	support["plex"]["yes"]["android"]["yes"]["library"][0]=libq1+" "+alloptions;
	support["plex"]["yes"]["android"]["yes"]["library"]["yes"]=breakpoint;
	support["plex"]["yes"]["android"]["yes"]["library"]["no"]=breakpoint;
	support["plex"]["yes"]["android"]["yes"]["video"]=breakpoint;
	support["plex"]["yes"]["android"]["yes"]["music"]=breakpoint;
	support["plex"]["yes"]["android"]["yes"]["pictures"]=breakpoint;
	support["plex"]["yes"]["android"]["no"]=breakpoint;
	//plex apple
	support["plex"]["yes"]["apple"]=[];
	support["plex"]["yes"]["apple"][0]=question1+" "+alloptions;
	support["plex"]["yes"]["apple"]["yes"]=[];
	support["plex"]["yes"]["apple"]["yes"][0]=question2+" "+alloptions;
	support["plex"]["yes"]["apple"]["yes"]["library"]=[];
	support["plex"]["yes"]["apple"]["yes"]["library"][0]=libq1+" "+alloptions;
	support["plex"]["yes"]["apple"]["yes"]["library"]["yes"]=breakpoint;
	support["plex"]["yes"]["apple"]["yes"]["library"]["no"]=breakpoint;
	support["plex"]["yes"]["apple"]["yes"]["video"]=breakpoint;
	support["plex"]["yes"]["apple"]["yes"]["music"]=breakpoint;
	support["plex"]["yes"]["apple"]["yes"]["pictures"]=breakpoint;
	support["plex"]["yes"]["apple"]["no"]=breakpoint;
	//plex Amazon
	support["plex"]["yes"]["amazon"]=[];
	support["plex"]["yes"]["amazon"][0]=question1+" "+alloptions;
	support["plex"]["yes"]["amazon"]["yes"]=[];
	support["plex"]["yes"]["amazon"]["yes"][0]=question2+" "+alloptions;
	support["plex"]["yes"]["amazon"]["yes"]["library"]=[];
	support["plex"]["yes"]["amazon"]["yes"]["library"][0]=libq1+" "+alloptions;
	support["plex"]["yes"]["amazon"]["yes"]["library"]["yes"]=breakpoint;
	support["plex"]["yes"]["amazon"]["yes"]["library"]["no"]=breakpoint;
	support["plex"]["yes"]["amazon"]["yes"]["video"]=breakpoint;
	support["plex"]["yes"]["amazon"]["yes"]["music"]=breakpoint;
	support["plex"]["yes"]["amazon"]["yes"]["pictures"]=breakpoint;
	support["plex"]["yes"]["amazon"]["no"]=breakpoint;
	//plex Console
	support["plex"]["yes"]["console"]=[];
	support["plex"]["yes"]["console"][0]=question1+" "+alloptions;
	support["plex"]["yes"]["console"]["yes"]=[];
	support["plex"]["yes"]["console"]["yes"][0]=question2+" "+alloptions;
	support["plex"]["yes"]["console"]["yes"]["library"]=[];
	support["plex"]["yes"]["console"]["yes"]["library"][0]=libq1+" "+alloptions;
	support["plex"]["yes"]["console"]["yes"]["library"]["yes"]=breakpoint;
	support["plex"]["yes"]["console"]["yes"]["library"]["no"]=breakpoint;
	support["plex"]["yes"]["console"]["yes"]["video"]=breakpoint;
	support["plex"]["yes"]["console"]["yes"]["music"]=breakpoint;
	support["plex"]["yes"]["console"]["yes"]["pictures"]=breakpoint;
	support["plex"]["yes"]["console"]["no"]=breakpoint;
// End support array