let currentFilter = "all";

const filterAllBtn = document.querySelector("#filter-all");
const filterUnwatchedBtn = document.querySelector("#filter-unwatched");
const filterWatchedBtn = document.querySelector("#filter-watched");
const pickBtn = document.querySelector("#pick-btn");
const pickResult = document.querySelector("#pick-result");

function applyFilter(filter) {
    let moviesToShow;
    if (currentFilter === "all") {
        moviesToShow = movies;
    }
    else if (currentFilter === "unwatched") {
        moviesToShow = movies.filter(movie => !movie.watched);
    }
    else if (currentFilter === "watched") {
        moviesToShow = movies.filter(movie => movie.watched);
    }
    renderMovies(moviesToShow);

    updateFilterButtons();

}

function updateFilterButtons() {
        filterAllBtn.classList.remove("active");
        filterUnwatchedBtn.classList.remove("active");
        filterWatchedBtn.classList.remove("active");

        if (filter === "all") {
            filterAllBtn.classList.add("active");
        }
        else if (filter === "unwatched") {
            filterUnwatchedBtn.classList.add("active");
        }
        else if (filter === "watched") {
            filterWatchedBtn.classList.add("active");
        }
}

// Register control event listeners once
filterAllBtn.addEventListener("click", () => {
    currentFilter = "all";
    applyFilter();
});
filterUnwatchedBtn.addEventListener("click", () => {
    currentFilter = "unwatched";
    applyFilter();
});
filterWatchedBtn.addEventListener("click", () => {
    currentFilter = "watched";
    applyFilter();
});

pickBtn.addEventListener("click", () => {
    const unwatched = movies.filter(movie => !movie.watched);

    if (unwatched.length === 0) {
        pickResult.textContent = "All movies have been watched!";
        return;
    }

    const randomIndex = Math.floor(Math.random() * unwatched.length);
    const picked  = unwatched[randomIndex];

    pickResult.textContent = `You should watch: ${picked.title}`;
});