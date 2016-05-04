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
		  var header=document.createElement('h3');
		  header.innerHTML=playerArr[i].snippet.title;
		  document.body.appendChild(header);
		  var paragraph=document.createElement('p');
		  paragraph.innerHTML=playerArr[i].snippet.description;
		  document.body.appendChild(paragraph);
		  var div = document.createElement('div');
		  document.body.appendChild(div);
		  div.id = "player"+i;
		  div.class="player";
		  div.style.width="350px"
		  div.style.height="350px"
		  div.style.display="block"
		  div.style.padding="2%"
		  playerId=div.id;
		  console.log("width:"+div.style.width+" height:"+div.style.height)
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
