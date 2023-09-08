import './css/normalize.css';
import './css/styles.css';
import { fetchData } from './js/fetch';
import { renderMain } from './js/renderMain';

console.log('started')

// fetch('http://jsonplaceholder.typicode.com/posts')
// 	.then((response) => response.json())
// 	.then((data) => console.log(data[1]))

// let fetchData = fetch('event=update');

fetchData('event=update').then(data => {
	renderMain(data);
})

const days = [...document.querySelectorAll('.page-nav__day')];


console.log(days)

