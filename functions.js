
// Underlay function for support, and tips
underlay=function(say,cat) {
	var Color='#000000';
	if (!say) {
		var say=sayerr;
		console.log("Oops! There's no say!");
	}
	else if (cat == "tips") {
		Color='#C70039';
	}
	else if (cat == "support") {
		Color='#FFC300';
	}
	return new Discord.RichEmbed()
	.setColor(Color)
	.setDescription(say);
}

// Walk the support tree
function walkSupport(arr) {
    var level=support;
    for (var a in arr) {
        var keys="";
        for (var key in level) {
            if (keys != "") keys+=",";
            keys+=key;
        }
        if (keys.indexOf(arr[a]) >= 0) {
            level=level[arr[a]];
        }
        else {
            console.log(a+" is invalid.");
            return level;
        }
    }
    return level;
}
