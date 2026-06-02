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

const movieInput = undefined;
const addBtn = undefined;
const movieList = undefined;
const emptyState = undefined;

function renderMovies(moviesToShow) {
    if(moviesToShow === undefined) {
        moviesToShow = movies;
    }

    if(moviesToShow.length === 0) {
        emptyState.classList.remove("hidden");
        movieList.innerHTML = "";
        return;
    } else {
        emptyState.classList.add("hidden");
    }

    moviesToShow.map(function(movie){});
}

renderMovies([]);

function addMovie() {

}
