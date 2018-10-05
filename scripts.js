//Create a Request Variable to assign a new XMLHttpRequest object to it
var request = new XMLHttpRequest();

//Open a new connection using GET request on URL
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

//can now access JOSN data
request.onload = function(){
	//parsing the JSON into JavaScript Objects
	var data = JSON.parse(this.response);

	//print out the title of each movie
	data.forEach(movie => {
		console.log(movie.title);
	});

}

//send the request
request.send();