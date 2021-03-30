document.addEventListener('DOMContentLoaded', function() {
    const movie = document.querySelector('.movieInfo').id;
    const API_KEY = 'x';
    fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${API_KEY}`)
    .then(data => data.json())
    .then(data => {
        let movieCont = document.querySelector('.movieInfo');
        let title = data.title;
        let overview = data.overview;
        let poster = data.poster_path;
        let movieID = data.id;
        movieCont.innerHTML = `
                                <div class="container">
                                    <div class="poster"><img src="https://image.tmdb.org/t/p/original${poster}"></div>
                                    <div class="data">
                                        <div>
                                        <h2>${title} </h2> <br>
                                        <p> ${overview}</p> <br></div>
                                        <div>
                                        <p><i class="far fa-star"></i> Global Rating: ${data.vote_average}
                                        <p><i class="fas fa-calendar-day"></i> Release: ${data.release_date}</p>
                                        <button class="btn" id="similar">Similar Movies</button>
                                    </div>
                                </div>
                                `;
        const saveMovie = document.querySelector('#saveMovie');
        saveMovie.addEventListener('click', () => {
            save_movie(title, overview, poster, movieID);

        })
        const similarMovies = document.querySelector('#similar');
        similarMovies.addEventListener('click', () => {
            similar_movies(movieID, API_KEY);
        })

    })

    const deleteComment = document.querySelectorAll('.delete');
    const editComment = document.querySelectorAll('.edit');
    const rateSubmit = document.getElementById('rateSubmit');

    rateSubmit.addEventListener('click', rate_movie);

    editComment.forEach(element => {
        element.addEventListener('click', () => {
            edit_comment(element);
        })
    })

    deleteComment.forEach(element => {
        element.addEventListener('click', () => {
            delete_comment(element);
        })
    })

    const addMovie = document.querySelector('#addMovie');
        addMovie.addEventListener('click', () => {
            add_movie();
        })

})

function add_movie() {
    const selectlist = document.querySelector('#watchlists').value;
    const movie = document.querySelector('#watchlists').getAttribute('data-id');
    const watchlist = new FormData()
    console.log(movie)
    watchlist.append("movie", movie)
    watchlist.append("seleclist", selectlist)
    fetch("/add_movie/", {
        method: "POST",
        body: watchlist
    })
    .then(res => res.json())
    .then((res) => {
        document.querySelector('.added').innerText = res.message;
    })
}

function similar_movies(movieID, API_KEY) {
    fetch(`https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${API_KEY}&language=en-US&page=1`)
    .then(data => data.json())
    .then(data => {
        let movies = data.results;
        let movieContainer = document.querySelector('.movies');
        movieContainer.style.display = 'flex';
        const close = document.createElement('button');
        close.innerText = 'X';
        close.classList.add('closebtn');
        movieContainer.appendChild(close);
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
            movieContainer.appendChild(div);
        })
        close.addEventListener('click', () => {
            movieContainer.style.display = 'none';
        })
    })
}

function rate_movie() {
    const rating = document.getElementById("rating").value;
    const movie_id = document.getElementById("rating").getAttribute("data-id");
    const newRating = new FormData();
    let total = document.getElementById('totalRatings').innerText;
    newRating.append("rating", rating);
    newRating.append("movie_id", movie_id);

     fetch("/rate_movie/", {
        method: "POST",
        body: newRating,
    })
    .then(res => res.json())
    .then((res) => {
        if(res.message=='success'){
            window.location.reload();
        } else {
            document.getElementById('yourRating').innerHTML = res.message;
        }
        
    })

}

function edit_comment(element) {
    const id = element.getAttribute("data-id");
    const editView = document.getElementById(`editView-${id}`);
    const save = document.getElementById(`commentSave-${id}`);
    editView.style.display = 'block';
    save.addEventListener('click', () => {
        let newComment = document.getElementById(`textArea-${id}`).value;
        const edited = new FormData()
        edited.append("id", id);
        edited.append("newComment", newComment);
        fetch("/edit/", {
            method: "POST",
            body: edited,
        })
        .then((res) => {
            document.getElementById(`comment-${id}`).textContent = newComment;
            editView.style.display = 'none';
        })
    })
}

function delete_comment(element) {
    const id = element.getAttribute("data-id");
    const comment = document.querySelector(`.review-${id}`);
    const form = new FormData();
    form.append("id", id);

    fetch("/delete/", {
        method: "POST",
        body: form,
    })
    .then(res => {
        comment.style.display = 'none';
    })
}


function save_movie(title, overview, poster, movieID) {
    const newMovie = new FormData()
    newMovie.append("title", title)
    newMovie.append("overview", overview)
    newMovie.append("poster", poster)
    newMovie.append("movieID", movieID)

    fetch("/new_movie/", {
        method: "POST",
        body: newMovie,
    })
    .then(res => res.json())
    .then((res) => {
        let button = document.querySelector('#saveMovie');
        if(res.state === "save") { //cambiar el texto del botón en función de si añadimos o eliminamos la película
            button.innerHTML = res.state;
            window.location.reload(); //recargamos la página para que el usuario pueda dejar review si la pelicula está en su base de datos
        } else {
            button.innerHTML = res.state;
            window.location.reload(); 
        }
    })

}
