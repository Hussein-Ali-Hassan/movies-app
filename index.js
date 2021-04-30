const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6799ccc608d5283281cb2f4a756dd24c&page=3';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=6799ccc608d5283281cb2f4a756dd24c&query="';

let form = document.getElementById('form');
let search = document.getElementById('search');
let main = document.querySelector('.main');


getMovies(API_URL);

async function getMovies(URL) {
    const response = await fetch(URL);
    const data = await response.json();
    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie
        
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        main.appendChild(movieEl)
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassColorByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
    })
}


function getClassColorByRate(vote) {
    if (vote >= 8)
        return 'green'
    else if (vote >= 5)
        return 'orange'
    else
        return 'red'
}

form.addEventListener('submit', (event) => { 
    event.preventDefault()

    let searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API
            + searchTerm)
        search.value = ''
    }
    else
        window.location.reload()
}
)