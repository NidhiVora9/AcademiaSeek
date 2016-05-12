import { Meteor } from 'meteor/meteor';
Meteor.startup(function() {
    var key=Meteor.settings.public.YouTubeApikey;
	YoutubeApi.authenticate({
    type: 'key',
    key: key
	});
});

Meteor.methods({
    searchVideos: function(search) {
        Future = Npm.require('fibers/future');
        var fut = new Future();
        YoutubeApi.search.list({
           part:'snippet',
           q: search,
           order:'viewCount',
           relevanceLanguage:'en',
           type:'playlist',
           maxResults:'10'
        }, function (err, data) {
            var responseString = JSON.stringify(data, '', 2);
            fut.return(data);
            return data; 
        });
        return fut.wait();
    },
    searchBooks:function(search){
        var key=Meteor.settings.public.GoodReadsApikey;
        var apiUrl = 'https://www.goodreads.com/search/index';
        var result =Meteor.http.get(apiUrl,
        {params:{
            "key":key,
            "q":search,
            "search[field]":"title",
            "search-type":"lists"
        }}
    );
        if(result.statusCode==200) {
                var res = xml2js.parseStringSync(result.content);
                return res;
            } else {
                console.log("Response issue: ", result.statusCode);
                throw new Meteor.Error(result.statusCode, errorJson.error);
            }
    }
});
