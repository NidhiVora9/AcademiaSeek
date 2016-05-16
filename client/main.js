var playerArr=[];
Session.setDefault('searching', false);

if(Meteor.isClient) {
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	Template.header_search.events = {
	'click .search':function(){
		var q =document.getElementById('query').value;	
		Meteor.call('searchBooks',q,function(err, response) {
			loadBooks(response);
		});
		Meteor.call('searchVideos',q,function(err, response) {
			loadVideos(response);
		});	
	}
  };
  	onYouTubeIframeAPIReady = function () {
  		try{
  			playerArrlength=playerArr.length;
  	 	if(typeof playerArr === 'undefined')
           return; 
       	for(var i = 0; i < playerArrlength;i++) {
		  playerId="player"+i;	  
       	  tr = $('<tr/>');
       	  tr.append("<td ><div id='"+playerId+"'></div></td>");
       	  tr.append("<td><h4>"+playerArr[i].snippet.title+"</h4><br>"+playerArr[i].snippet.channelTitle+"</td>");
       	  tr.append("<td><p>"+playerArr[i].snippet.description+"</p></td>"); 
       	  $('#displayvideosData').append(tr);
       	  var curplayer = createPlayer(playerArr[i],playerId); 
        } 
  		}
  		catch(e){
  			throw e;
  		}
  		
  	 };

}
function createPlayer(playerArr,playerId) {
          return new YT.Player(playerId, {
             height: playerArr.snippet.thumbnails.medium.height,
             width: playerArr.snippet.thumbnails.medium.width,
             videoId:playerArr.id.videoId       
          });
      }

function loadVideos(response)
{
	playerArr=[];
	$("#displayvideosData tr").remove();
	var Searchitems=response.items;  
	if(typeof Searchitems!=='undefined')
	{
	$.each(Searchitems, function(index, item){
		playerArr.push(item);
	});	
	onYouTubeIframeAPIReady();
	}
	else{
		tr = $('<tr/>');
		tr.append("<td><h3 align='center'>" +"Videos not found"+ "</h3></td>");
		$("#displayvideosData").append(tr);
	}
}

function loadBooks(response)
{
	$("#displaybooksData tr").remove();
	var books=response.GoodreadsResponse.search[0].results[0].work;
	console.log(books);
	if(typeof books!=='undefined')
	{
	books.sort(function(obj1,obj2){
		return obj2.average_rating - obj1.average_rating;
	});
	trh= $('<tr/>');
	trh.append("<th></th>");
	trh.append("<th>Book Name</th>");
	trh.append("<th>Average Ratings</th>");
	$('#displaybooksData').append(trh);
  	$.each(books,function(index,item){
  		 var average_rating=0.0;
  		 if(item.average_rating>0.0)
  		 {
  		 	average_rating=item.average_rating;
  		 }
  		 tr = $('<tr/>');
  		 tr.append("<td><img src='" +item.best_book[0].small_image_url[0]+"'/></td>");	
  		 tr.append("<td><h4>" +item.best_book[0].title[0] + "</h4><br>by "+item.best_book[0].author[0].name[0]+"</td>");
  		 tr.append("<td><h5>" +average_rating/* + "</h5><br>published in "
  		 	+item.original_publication_year[0]._*/+"</h5></td>");
  		 $('#displaybooksData').append(tr);
  	});
 	}
  	else
	{
		tr = $('<tr/>');
		tr.append("<td><h3 align='center'>" +"Books not found"+ "</h3></td>");
		$("#displaybooksData").append(tr);
	}

}