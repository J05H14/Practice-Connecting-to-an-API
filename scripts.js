
//variable representing the html body
const app = document.getElementById('root');

//getting the logo for the page
const logo = document.createElement('img');
logo.src = 'images/logo.png';

//conatiner for the page
const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

//Create a Request Variable to assign a new XMLHttpRequest object to it
let request = new XMLHttpRequest();

//Open a new connection using GET request on URL
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

//can now access JOSN data
request.onload = function(){
	//parsing the JSON into JavaScript Objects
	const data = JSON.parse(this.response);
	if(request.status >= 200 && request.status < 400){
		//print out the title of each movie
		data.forEach(movie => {
			//div with card class
			const card = document.createElement('div');
			card.setAttribute('class', 'card');

			//h1 for each film's title
			const h1 = document.createElement('h1');
			h1.textContent = movie.title;

			//p with description for each film
			const p = document.createElement('p');
			movie.description = movie.description.substring(0, 300); //set the limit shown to be 300
			p.textContent = `${movie.description}...`; //end with an elipses

			//append to the container
			container.appendChild(card);

			//append both the title and description to the card
			card.appendChild(h1);
			card.appendChild(p);
		});
	}
	else{
		const errorMessage = document.createElement('error');
		errorMessage.textContent = "Gah, it's not working!";
		app.appendChild(errorMessage);
	}
}

//send the request
request.send();