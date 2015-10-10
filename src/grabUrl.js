var http = require('https');
var fs = require('fs');

function getCurrentTab(){
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	    var url = tabs[0].url;
	});
	return url;
}

function getRaw(url){
	var user = url.split(".com/");
	user[1] = user[1].replace("blob/", "");
	var raw = "https://raw.githubusercontent.com/";
	var rawUrl = raw.concat(user[1]);

	return rawUrl;
}

function getFile(raw){
	var name = raw.split("/");
	fp = name[name.length-1];

	var file = fs.createWriteStream(fp);
	var request = http.get(raw, function(response) {
		 response.pipe(file);
	});
}

var test = getRaw("https://github.com/cata5492/ai3202/blob/master/Assignment2/assignment2-cata5492.py");
getFile(test);

//var currentUrl = getCurrentTab();
//var rawUrl = getRaw(currentUrl);
//getFile(rawUrl)