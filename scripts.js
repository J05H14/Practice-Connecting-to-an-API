
//variable representing the html body
const app = document.getElementById('root');

//getting the logo for the page
const logo = document.createElement('img');
logo.src = 'images/logo.png';

//conatiner for the page
const container = document.createElement('div');
container.setAttribute('class', 'container');

//Create a Request Variable to assign a new XMLHttpRequest object to it
let request = new XMLHttpRequest();

//function to return the film information searched
let film = function(search){
	//Open a new connection using GET request on URL
	request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
	console.log(search + '')
	//can now access JOSN data
	request.onload = function(){

		//parsing the JSON into JavaScript Objects
		const data = JSON.parse(this.response);
		if(request.status >= 200 && request.status < 400){
			//print out the title of each movie
			data.forEach(movie => {
				if(search != undefined && movie.title.toUpperCase().includes(search.toUpperCase())){
					//div with card class
					const card = document.createElement('div');
					card.setAttribute('class', 'card');

					//h1 for each film's title
					const h1 = document.createElement('h1');
					h1.textContent = movie.title;

					//p with description for each film
					const pDesc = document.createElement('p');
					//movie.description = movie.description.substring(0, 300); //set the limit shown to be 300
					pDesc.textContent = `${movie.description}`; //end with an elipses

					//p with director of each film
					//make a div, append a p to it
					const pDir = document.createElement('p');
					pDir.innerHTML = `Director: ${movie.director}`;


					//p with producer of each film
					const pPro = document.createElement('p');
					pPro.textContent = `Producer: ${movie.producer}`;

					//p with release year of each film
					const pRel = document.createElement('p');
					pRel.textContent = `Release Year: ${movie.release_date}`;

					//append the card to the container
					container.appendChild(card);

					//append both the title and description to the card
					card.appendChild(h1);
					card.appendChild(pDesc);
					card.appendChild(pDir);
					card.appendChild(pPro);
					card.appendChild(pRel);
				}
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
}

//function to get the querystring parameters
function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

//Message of what to do
const desc = document.createElement('h3');
desc.setAttribute('id', 'intro');
desc.textContent = "Search for Your Favorite Studio Ghibli Movie";

//form for query search
const form = document.createElement('FORM');
form.setAttribute('id', 'searchForm');
form.setAttribute('action', '/API_Test/index.html');
let input = document.createElement('INPUT');
input.setAttribute('id', 'query');
input.setAttribute('name', 'query');
input.setAttribute('type', 'text');
input.setAttribute('value', '');
const submit = document.createElement('button');
const submitText = document.createTextNode('Search');

//UI
app.appendChild(logo);
app.appendChild(desc);
app.appendChild(form);
app.appendChild(container);

//getting the search to appear and be centered
document.getElementById('intro').style.textAlign = 'center';
document.getElementById('searchForm').appendChild(input);
document.getElementById('searchForm').style.textAlign = 'center';
document.getElementById('searchForm').appendChild(submit);

console.log(getUrlVars()['query']);

//submit request for the search
submit.addEventListener('click', film(getUrlVars()['query']));
submit.appendChild(submitText);