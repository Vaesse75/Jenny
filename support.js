//Support breakpoints
	pingwarn="hang on, while I check with carl...";
	cancelbreak="your ticket is closed. "+SupportRef+" will be with you soon.";
	fixedbreak="I'll close your ticket, and mark it as resolved. If you need more help, come see me again!";
	breakpoint="I can't help you with this just yet. "+SupportRef+", someone needs your assistance! (Ticket closed)"; 
	breakpoint2="the service is down, sorry. "+CastingRef+", service appears to be down! (Ticket closed)";

//Support questions
	service1="so head on over to <https://vaesse.jasoncollege24.com/> to see if the host is up.\r\nIs the Host up? You can say **yes**, or **no**.";
	service2="everything seems to be working here. What device are you using?\r\n";
	alloptions="You can also tell me to go **back**, **cancel** your ticket, or resolve your ticket by telling me it's **fixed**.";
	question1="what are you trying to do?\r\nView the **library**, watch a **video**, listen to **music**, or look at **pictures**?";
	libq1="is the library visible at all? You can say **yes**, or **no**.";

//support Array
	support=[];
    support[0]="the boss isn't here right now, but maybe I can help.\r\nIs your problem with **Plex**, **Calibre**, or **FTP**? You can also **cancel** your ticket, or tell me that it's **fixed** to close your trouble ticket.";

	//Calibre section
	support["calibre"]=[]; //!ping calibre, down=breakpoint2;
	support["calibre"][0]="the library is open, "+service1+" "+alloptions;
	support["calibre"]["no"]=breakpoint2;
	support["calibre"]["yes"]=breakpoint;

	// FTP section
	support["ftp"]=[];
	support["ftp"][0]="FTP is up, "+service1+" "+alloptions;
	support["ftp"]["yes"]=breakpoint;
	support["ftp"]["no"]=breakpoint;

	//Plex section
    support["plex"]=[]; //!ping plex, down=breakpoint2;
    support["plex"][0]="the theater is open, "+service1+" "+alloptions+"";
    support["plex"]["no"]=breakpoint;
	support["plex"]["yes"]=[];
    support["plex"]["yes"][0]=service2+"You can say **Windows**, **Web**, **Android**, **Apple** (for iPads, and iPhones), **Amazon** (for Fire Stick/TV), or **Console**. "+alloptions+"";
	//web
	support["plex"]["yes"]["web"]=[];
	support["plex"]["yes"]["web"][0]=question1+" "+alloptions;
	support["plex"]["yes"]["web"]["library"]=[];
	support["plex"]["yes"]["web"]["library"][0]=libq1+" "+alloptions;
	support["plex"]["yes"]["web"]["library"]["yes"]=breakpoint;
	support["plex"]["yes"]["web"]["library"]["no"]=breakpoint;
	support["plex"]["yes"]["web"]["video"]=breakpoint;
	support["plex"]["yes"]["web"]["music"]=breakpoint;
	support["plex"]["yes"]["web"]["pictures"]=breakpoint;
	//Windows
	support["plex"]["yes"]["windows"]=[];
	support["plex"]["yes"]["windows"][0]=question1+" "+alloptions;
	support["plex"]["yes"]["windows"]["library"]=[];
	support["plex"]["yes"]["windows"]["library"][0]=libq1+" "+alloptions;
	support["plex"]["yes"]["windows"]["library"]["yes"]=breakpoint;
	support["plex"]["yes"]["windows"]["library"]["no"]=breakpoint;
	support["plex"]["yes"]["windows"]["video"]=breakpoint;
	support["plex"]["yes"]["windows"]["music"]=breakpoint;
	support["plex"]["yes"]["windows"]["pictures"]=breakpoint;
	//android
	support["plex"]["yes"]["android"]=[];
	support["plex"]["yes"]["android"][0]=question1+" "+alloptions;
	support["plex"]["yes"]["android"]["library"]=[];
	support["plex"]["yes"]["android"]["library"][0]=libq1+" "+alloptions;
	support["plex"]["yes"]["android"]["library"]["yes"]=breakpoint;
	support["plex"]["yes"]["android"]["library"]["no"]=breakpoint;
	support["plex"]["yes"]["android"]["video"]=breakpoint;
	support["plex"]["yes"]["android"]["music"]=breakpoint;
	support["plex"]["yes"]["android"]["pictures"]=breakpoint;
	//apple
	support["plex"]["yes"]["apple"]=[];
	support["plex"]["yes"]["apple"][0]=question1+" "+alloptions;
	support["plex"]["yes"]["apple"]["library"]=[];
	support["plex"]["yes"]["apple"]["library"][0]=libq1+" "+alloptions;
	support["plex"]["yes"]["apple"]["library"]["yes"]=breakpoint;
	support["plex"]["yes"]["apple"]["library"]["no"]=breakpoint;
	support["plex"]["yes"]["apple"]["video"]=breakpoint;
	support["plex"]["yes"]["apple"]["music"]=breakpoint;
	support["plex"]["yes"]["apple"]["pictures"]=breakpoint;
	//Amazon
	support["plex"]["yes"]["amazon"]=[];
	support["plex"]["yes"]["amazon"][0]=question1+" "+alloptions;
	support["plex"]["yes"]["amazon"]["library"]=[];
	support["plex"]["yes"]["amazon"]["library"][0]=libq1+" "+alloptions;
	support["plex"]["yes"]["amazon"]["library"]["yes"]=breakpoint;
	support["plex"]["yes"]["amazon"]["library"]["no"]=breakpoint;
	support["plex"]["yes"]["amazon"]["video"]=breakpoint;
	support["plex"]["yes"]["amazon"]["pictures"]=breakpoint;
	support["plex"]["yes"]["amazon"]["music"]=breakpoint;
	//Console
	support["plex"]["yes"]["console"]=[];
	support["plex"]["yes"]["console"][0]=question1+" "+alloptions;
	support["plex"]["yes"]["console"]["library"]=[];
	support["plex"]["yes"]["console"]["library"][0]=libq1+" "+alloptions;
	support["plex"]["yes"]["console"]["library"]["yes"]=breakpoint;
	support["plex"]["yes"]["console"]["library"]["no"]=breakpoint;
	support["plex"]["yes"]["console"]["video"]=breakpoint;
	support["plex"]["yes"]["console"]["music"]=breakpoint;
	support["plex"]["yes"]["console"]["pictures"]=breakpoint;
// End support array