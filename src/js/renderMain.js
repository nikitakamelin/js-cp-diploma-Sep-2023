import { getMovieHTML } from "./getMovieHTML";

export function renderMain(data) {
	//console.log(data);
	window.localStorage.setItem('fetchData', JSON.stringify(data));
	
	data.films.result.forEach(element => {
		//console.log(document.querySelector('main'))
		document.querySelector('main').insertAdjacentHTML('beforeend', getMovieHTML(element));
	});
}