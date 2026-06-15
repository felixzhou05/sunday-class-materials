// {
//    id: 1,
//    title: "Inception",
//    watched: false
//}


let movies = [
    { id: 1, title: "Inception", watched: false },
    { id: 2, title: "The Matrix", watched: true },
    { id: 3, title: "Interstellar", watched: false },
    { id: 4, title: "The Dark Knight", watched: true }
];

let nextId = 5;

const movieInput = document.getElementById("movie-input");
const addBtn = document.getElementById("add-btn");
const movieList = document.getElementById("movie-list");
const emptyState = document.getElementById("empty-state");

function renderMovies(moviesToShow) {
    //Base case - if moviesToShow is undefined, we want to show all movies
    if(moviesToShow === undefined) {
        moviesToShow = movies;
    }

    // If there are no movies to show, we want to show the empty state and hide the movie list
    if(moviesToShow.length === 0) {
        emptyState.classList.remove("hidden");
        movieList.innerHTML = "";
        return;
    } else {
        emptyState.classList.add("hidden");
    }

    // .map - takes an array and transforms it into a new array by applying a function to each element of the original array
    const htmlParts  = moviesToShow.map(function(movie){
      const itemClass = movie.watched ? "movie-item watched" : "movie-item"
      const checkMark = movie.watched ? "✓" : "";
      return ` 
        <li class="${itemClass}" data-id="${movie.id}">
        <div class="movie-check">${checkMark}</div>
        <span class="movie-title">${movie.title}</span>
        <button class="movie-delete" data-id="${movie.id}" title="Remove">🗑️</button>
        </li>
        `;
    });
    
    movieList.innerHTML = htmlParts.join("");
}

function addMovie() {
    const title = movieInput.value.trim();

    if(title === "") return;

    const newMovie = {
        id: nextId,
        title: title,
        watched: false
    };

    movies.push(newMovie);
    nextId++;

    renderMovies();

    movieInput.value = "";
    movieInput.focus();
}

addBtn.addEventListener("click", addMovie);
movieInput.addEventListener("keydown", function(event){
    if(event.key === "Enter") {
        addMovie();
    }
});

movieList.addEventListener("click", function(event){
    const target = event.target;

    const deleteBtn = target.closest(".movie-delete");
    const listItem  = event.target.closest(".movie-item");

    if(deleteBtn) {
        const id = Number(deleteBtn.dataset.id);
        movies = movies.filter (function(movie){
            return movie.id !== id;
        });

        renderMovies();
        return;
    }   

    if(listItem) {
        const id = Number(listItem.dataset.id);
        const movie = movies.find(function(movie){
            return movie.id === id;
        });

        if (movie) {
            movie.watched = !movie.watched;
            renderMovies();
        }   
    }
});

renderMovies();