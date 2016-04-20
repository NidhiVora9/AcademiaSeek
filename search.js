function showResponse(response) {
	var responseString = JSON.stringify(response, '', 2);
    /* var data=document.getElementById('response').innerHTML += responseString; */
	LoadVideos(response);
}

function onClientLoad() {
	gapi.client.load('youtube','v3',onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
	gapi.client.setApiKey('AIzaSyD58-_hrH8Dl8s8gDc5Gh_H7BqCVfiMavI');
}

function search() {
	var q =document.getElementById('query').value;	
	var request=gapi.client.youtube.search.list({
		part:'snippet',
		q:q,
		order:'viewCount',
		relevanceLanguage:'en',
		type:'playlist',
		maxResults:'10'
	});
	request.execute(onSearchResponse);
}

function onSearchResponse(response) {
	showResponse(response);
}
