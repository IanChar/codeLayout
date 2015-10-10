function getRaw(url){
	var user = url.split(".com/");
	user[1] = user[1].replace("blob/", "");
	var raw = "https://raw.githubusercontent.com/";
	var rawUrl = raw.concat(user[1]);

	return rawUrl;
}

var pr = getRaw("https://github.com/cata5492/ai3202/blob/master/Assignment2/assignment2-cata5492.py");

var http = require('https');
var fs = require('fs');

var name = pr.split("/");
fp = name[name.length-1];

var file = fs.createWriteStream(fp);
var request = http.get(pr, function(response) {
	 response.pipe(file);
});