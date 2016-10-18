// could install 'fetch' to handle requests rather than this pure Javascript way


function request(url, method, body, callback){
	var http = new XMLHttpRequest();
	http.open(method, url, true);
	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/json");
	http.onreadystatechange = function() {//Call a function when the state changes.
	    if(http.readyState == 4 && http.status == 200) {
	        callback(JSON.parse(http.responseText));
	    }
	}
	http.send(JSON.stringify(body));
}

function formRequest(url, method, body, callback){
	var http = new XMLHttpRequest();
	http.open(method, url, true);
	var params = []
	for (var key in body){
		params.push(key + '=' + body[key])
	}
	params = params.join('&')
	console.log('params', params)
	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function() {//Call a function when the state changes.
	    if(http.readyState == 4 && http.status == 200) {
	        callback(JSON.parse(http.responseText));
	    }
	}
	http.send(params);
}

module.exports = {
					request,
					formRequest
				 }