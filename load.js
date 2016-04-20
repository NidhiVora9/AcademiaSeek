var playerArr=[];
function LoadVideos(response)
{
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	var Searchitems=response.result.items;  
	$.each(Searchitems, function(index, item){
		playerArr.push(item);
	});	
	
}
function onYouTubeIframeAPIReady() {
	
	if(typeof playerArr === 'undefined')
           return; 

	for(var i = 0; i < playerArr.length;i++) {
		  var div = document.createElement('div');
		  document.body.appendChild(div);
		  div.id = "player"+i;
		  div.class="player";
		  playerId=div.id;
		  var curplayer = createPlayer(playerArr[i],playerId);
        } 
}

function createPlayer(playerArr,playerId) {
          return new YT.Player(playerId, {
             height: playerArr.snippet.thumbnails.medium.height,
             width: playerArr.snippet.thumbnails.medium.width,
			 playerVars: 
			{
            listType:'playlist',
            list: playerArr.id.playlistId
			},
			events: {
            'onReady': onPlayerReady
          }            
          });
      }
	  
	  function onPlayerReady(event) {
       /*  event.target.playVideo(); */
		
      }
