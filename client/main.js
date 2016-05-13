var playerArr=[];

if(Meteor.isClient) {
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	Template.header_search.events = {
    'click .videos' : function () {
    	var q =document.getElementById('query').value;	
		Meteor.call('searchVideos',q,function(err, response) {
			loadVideos(response);
		});
    },
    'click .books':function(){
    	console.log("clicked books");
    	var q =document.getElementById('query').value;	
    	Meteor.call('searchBooks',q,function(err, response) {
			loadBooks(response);
		});
    }
  };
  	onYouTubeIframeAPIReady = function () {
  		playerArrlength=playerArr.length;
  	 	if(typeof playerArr === 'undefined')
           return; 
       	for(var i = 0; i < playerArrlength;i++) {
       	  var div = document.createElement('div');
		  $('#displayData').append(div);
		  div.class="player";
		  div.id = "player"+i;
		  div.style.width="350px"
		  div.style.height="350px"
		  div.style.display="block"
		  div.style.padding="2%"
		  playerId=div.id;
		  var curplayer = createPlayer(playerArr[i],playerId); 
       	  tr = $('<tr/>');
       	  tr.append("<td>"+curplayer+"</td>");
       	  tr.append("<td><h3>"+playerArr[i].snippet.title+"</h3></td>");
       	  tr.append("<td><p>"+playerArr[i].snippet.description+"</p></td>");  
       	  $('#displayData').append(tr);
        } 
  	 };

}
function createPlayer(playerArr,playerId) {
          return new YT.Player(playerId, {
             height: playerArr.snippet.thumbnails.medium.height,
             width: playerArr.snippet.thumbnails.medium.width,
			 playerVars: 
			{
            listType:'playlist',
            list: playerArr.id.playlistId
			}          
          });
      }

function loadVideos(response)
{
	var Searchitems=response.items;  
	$.each(Searchitems, function(index, item){
		playerArr.push(item);
	});	
	onYouTubeIframeAPIReady();
}

function loadBooks(response)
{
	console.log(response);
	var books=response.GoodreadsResponse.search[0].results[0].work;
	books.sort(function(obj1,obj2){
		return obj2.average_rating - obj1.average_rating;
	});
	if(typeof books!=='undefined')
	{
	trh= $('<tr/>');
	trh.append("<th></th>");
	trh.append("<th>Book Name</th>");
	trh.append("<th>Average Ratings</th>");
	$('#displayData').append(trh);
  	$.each(books,function(index,item){
  		 tr = $('<tr/>');
  		 tr.append("<td><img src='" +item.best_book[0].small_image_url[0]+"'/></td>");	
  		 tr.append("<td><h4>" +item.best_book[0].title[0] + "</h4><br>by "+item.best_book[0].author[0].name[0]+"</td>");
  		 tr.append("<td><h5>" +item.average_rating/* + "</h5><br>published in "
  		 	+item.original_publication_year[0]._*/+"</h5></td>");
  		 $('#displayData').append(tr);
   		 console.log(item.best_book[0].title[0]);
  	});
 	}
  	else
	{
		tr = $('<tr/>');
		tr.append("<td><h3 align='center'>" +"Books not found"+ "</h3></td>");
		$("#displayData").append(tr);
	}

}