const fetchData = JSON.parse(window.localStorage.getItem('fetchData'));

export function getMovieHTML(movie) {

	const movieInfo = `
	<div class="movie__info">
		<div class="movie__poster">
			<img class="movie__poster-image" alt="Постер фильма"
				src=${movie.film_poster}>
		</div>
		<div class="movie__description">
			<h2 class="movie__title">${movie.film_name}</h2>
			<p class="movie__synopsis">${movie.film_description}</p>
			<p class="movie__data">
				<span class="movie__data-duration">${movie.film_duration} минут</span>
				<span class="movie__data-origin">${movie.film_origin}</span>
			</p>
		</div>
	</div>`;


	let filteredArraySeances = fetchData.seances.result.filter(item => item.seance_filmid === movie.film_id);
	let seances = ``;


	fetchData.halls.result.forEach((hall) => {
		if (hall.hall_open != 0) {
			let filteredArrayHalls = filteredArraySeances.filter(item => item.seance_hallid === hall.hall_id);
			if (filteredArrayHalls.length != 0) {

				let a1 = `<div class="movie-seances__hall"><h3 class="movie-seances__hall-title">${hall.hall_name}</h3><ul class="movie-seances__list">`
				let a2 = ``;
				filteredArrayHalls.forEach(item => {
					a2 += `<li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">${item.seance_time}</a></li>`
				})
				let a3 = `</ul></div>`;

				seances += a1 + a2 + a3;
				//console.log(hall.hall_id, filteredArrayHalls)
			}
		}
	})

	return `<section class="movie">${movieInfo}${seances}</section>`;
}




