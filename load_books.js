$('#books').click(function(event)
{
	event.preventDefault();
	var q =document.getElementById('query').value;
	$.ajax({
		url:'https://www.goodreads.com/search/index?key=FhfGLrRdNHYW9K6oQsD3Q&q='+q,
		// url:'https://www.goodreads.com/book/title?key=FhfGLrRdNHYW9K6oQsD3Q&title='+q,
		data:{
			format:'xml'
		},
		error:function(){
			$('#error').text('Error occurred');
		},
		dataType:'xml',
		success:function(data){
			// var $reviewscount = $('<h1>').text(data.book.reviews_counts);
			console.log(data)
			// console.log(data.reviews_widget)
			// console.log(data[0].reviews_count)
			// $('#info').append(data.reviews_widget)
		},
		type:'GET'
	});
	console.log("clicked");
});