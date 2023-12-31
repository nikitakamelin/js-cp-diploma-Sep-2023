//! -- функция формирует HTML код по каждому фильму

// -- извлечем полученные данные для дальнейшего использования (setItem был в rendermain.js)
const fetchData = JSON.parse(window.localStorage.getItem('fetchData'));
const currentDate = new Date();

export function getMovieHTML(movie, targetDate) {

	// -- сформируем первую статичную часть блока movie-info
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

	// -- отфильтруем только нужные нам сеансы по фильму
	const filteredArraySeances = fetchData.seances.result.filter(item => item.seance_filmid === movie.film_id);
	let seances = ``;

	// -- сформируем HTML код по каждому залу
	fetchData.halls.result.forEach((hall) => {
		// -- работаем только с открытыми залами по флагу hall_open
		if (hall.hall_open != 0) {
			// -- отфильтруем по залу
			let filteredArrayHalls = filteredArraySeances.filter(item => item.seance_hallid === hall.hall_id);
			// -- если в данном зале есть сеансы, формируем html код
			if (filteredArrayHalls.length != 0) {

				// 1я (статичная) часть, используется только название зала
				let a1 = `<div class="movie-seances__hall"><h3 class="movie-seances__hall-title">${hall.hall_name}</h3><ul class="movie-seances__list">`
				// 2я (динамическая) часть, код формируем в зависимости от времени окончания сеанса
				let a2 = ``;
				filteredArrayHalls.forEach(item => {
					const absoluteSeanceEnd = targetDate.getTime() + Number(item.seance_end*60*1000);
					// если текущее время меньше абсолютного времени окончания сеанса, оставляем ссылку активной
					if (currentDate.getTime() < absoluteSeanceEnd) {
						a2 += `<li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">${item.seance_time}</a></li>`;
					} else {
						// формируем ссылку неактивной, если сеанс окончен
						a2 += `<li class="movie-seances__time-block"><a class="movie-seances__time acceptin-button-disabled" href="hall.html">${item.seance_time}</a></li>`;
					}
				})
				// 3я часть - закроем теги
				let a3 = `</ul></div>`;
				//
				seances += a1 + a2 + a3;
			}
		}
	})
	//
	return `<section class="movie">${movieInfo}${seances}</section>`;
}




