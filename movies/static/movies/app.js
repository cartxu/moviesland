document.addEventListener('DOMContentLoaded', function() {
    let page = 1; 
    // primero comprobamos en qué página estamos para inhabilitar el 'search' fuera de index
    if (window.location.href !== 'http://127.0.0.1:8000/') {
        document.getElementById('search').setAttribute("disabled", "true");
        document.getElementById('search').setAttribute("placeholder", "Search from Index...");
        document.getElementById('search').style.background = '#81DAD0';
    } else { 
        document.getElementById('trending').addEventListener('click', load_moviestop);
        document.getElementById('topRating').addEventListener('click', load_ratingtop);
        document.getElementById('playing').addEventListener('click', () => now_playing(page));
        document.getElementById('search').addEventListener('keypress', function(e) {
            if(e.key == 'Enter') {
                search_movie()
            }
        })
        now_playing(page);
    }

    
    
});



function search_movie() {
    document.querySelector('#trendingMovies').style.display = 'none';
    document.querySelector('#bestRated').style.display = 'none';
    document.querySelector('#playingMovies').style.display = 'none';
    document.querySelector('#more').style.display = 'none';
    const query = document.getElementById('search').value;
    const API_KEY = 'e5e4db3dbc304d099091bfe9536607fa';
    console.log(query);
    const queryMovies = document.querySelector('#queryMovies');
    queryMovies.innerHTML = ' ';

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
    .then(data => data.json())
    .then(data => {
        let movies = data.results;
        movies.map(function(movie) {
            let div = document.createElement('a');
            div.classList.add('movieContainer');
            let movieID = `${movie.id}`;
            div.href = `/movie/${movieID}`;
            div.id = movieID;
            div.innerHTML = `<strong>${movie.title} </strong> <br>
                            <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
                            <p> ${movie.overview.substr(0,100)} (...)</p> <br>
                            <p><i class="far fa-star"></i> Rating: ${movie.vote_average}`;
            queryMovies.appendChild(div);
        })
    })   
}


function now_playing(page) {
    const API_KEY = 'e5e4db3dbc304d099091bfe9536607fa';
    
    document.querySelector('#trendingMovies').style.display = 'none';
    document.querySelector('#bestRated').style.display = 'none';
    const nowPlaying = document.querySelector('#playingMovies');
    const more = document.querySelector('#more');
    nowPlaying.style.display = 'flex';
    more.style.display = 'block';

    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`)
    .then(data => data.json())
    .then(data => {
        let movies = data.results;
        movies.map(function(movie) {
            let div = document.createElement('a');
            div.classList.add('movieContainer');
            let movieID = `${movie.id}`;
            div.href = `/movie/${movieID}`;
            div.id = movieID;
            div.innerHTML = `<strong>${movie.title} </strong> <br>
                            <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
                            <p> ${movie.overview.substr(0,100)} (...)</p> <br>
                            <p><i class="far fa-star"></i> Rating: ${movie.vote_average}`;
            nowPlaying.appendChild(div);
    
        })

        
    })

    more.addEventListener('click', () => {
        page = page +1;
        now_playing(page);
    })


}


function load_moviestop(){
    const API_KEY = 'e5e4db3dbc304d099091bfe9536607fa';
    const moviesContainer = document.querySelector('#trendingMovies');
    document.querySelector('#queryMovies').style.display = 'none';
    document.querySelector('#bestRated').style.display = 'none';
    document.querySelector('#more').style.display = 'none';
    document.querySelector('#playingMovies').style.display = 'none';

    moviesContainer.style.display = 'flex';

    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
    .then(data => data.json())
    .then(data => {
        let movies = data.results;
        movies.map(function(movie) {
            let div = document.createElement('a');
            div.classList.add('movieContainer');
            let movieID = `${movie.id}`;
            div.href = `/movie/${movieID}`;
            div.id = movieID;
            div.innerHTML = `<strong>${movie.title} </strong> <br>
                            <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
                            <p> ${movie.overview.substr(0,100)} (...)</p> <br>
                            <p><i class="far fa-star"></i> Rating: ${movie.vote_average}`;
            moviesContainer.appendChild(div);
        })
        
    })
   
}

function load_ratingtop() {
    const API_KEY = 'e5e4db3dbc304d099091bfe9536607fa';
    const moviesContainer = document.querySelector('#bestRated');
    moviesContainer.style.display = 'flex';
    document.querySelector('#queryMovies').style.display = 'none';
    document.querySelector('#more').style.display = 'none';
    document.querySelector('#playingMovies').style.display = 'none';
    document.querySelector('#trendingMovies').style.display = 'none';

    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
    .then(data => data.json())
    .then(data => {
        let movies = data.results;
        movies.map(function(movie) {
            let div = document.createElement('a');
            div.classList.add('movieContainer');
            let movieID = `${movie.id}`;
            div.href = `/movie/${movieID}`;
            div.id = movieID;
            div.innerHTML = `<strong>${movie.title} </strong> <br>
                            <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
                            <p> ${movie.overview.substr(0,100)} (...)</p> <br>
                            <p><i class="far fa-star"></i> Rating: ${movie.vote_average}`;
            moviesContainer.appendChild(div);
        })
        
    })
}

