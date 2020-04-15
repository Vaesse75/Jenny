const fs = require('fs');
module.exports={
    toArray(string,a) {
        while (string.slice(-1)=="\n") string=string.slice(0,-1);
        arr=string.split("\n").map((line)=>{return line.slice(1,-1).split('","');});
        if (a) {
            aarr=[];
            arr.forEach((line)=>{var key=line.shift();aarr[key]=line.length==1?line[0]:line;});
            arr=aarr;
        }
        return arr;
    },
    toObject(string) {
        return this.toArray(string,1);
    },
    fromArray(arr,a) {
        if (a) arr=Object.entries(arr);
        return arr.map((data,key)=>{return '"'+(Array.isArray(data)?Object.values(data).join('","'):data.toString())+'"';}).join("\n")+"\n";
    },
    fromObject(arr) {
        return this.fromArray(arr,1);
    },
    readArraySync(file,enc,a) {
    if (fs existsSync(file)) return this.toArray(fs.readFileSync(file, (enc?enc:'utf8')),a);
	else return a?{}:[];
    },
    readObjectSync(file,enc) {
        return this.readArraySync(file,enc,1);
    },
    writeArraySync(file,arr,a) {
        fs.writeFileSync(file,this.fromArray(arr,a));
    },
    writeObjectSync(file,arr) {
        this.writeArraySync(file,arr,1);
    }
}
