/**
 * Module: filtering and helper functions
 *
 * Purpose / "classes":
 * - This file provides UI controls for filtering the `movies` array created in
 *   `02-data.js` and a helper to pick a random unwatched movie.
 * - There are no ES6 `class` declarations here; the module manipulates the
 *   global `movies` array and updates the DOM.
 */

// Current filter state used when deciding which movies to display
let currentFilter = "all";

// Cached DOM elements for the filter controls and the "pick a movie" helper
const filterAllBtn = document.querySelector("#filter-all");
const filterUnwatchedBtn = document.querySelector("#filter-unwatched");
const filterWatchedBtn = document.querySelector("#filter-watched");
const pickBtn = document.querySelector("#pick-btn");
const pickResult = document.querySelector("#pick-result");

/**
 * applyFilter(filter)
 * - Reads `currentFilter` and derives `moviesToShow` accordingly, then calls
 *   `renderMovies` (from 02-data.js) to update the DOM.
 * - Note: the function accepts a `filter` argument in its signature but the
 *   implementation uses the `currentFilter` variable. That is intentional in
 *   this exercise (the UI updates `currentFilter` then calls `applyFilter`).
 */
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

    // Update button visual state to reflect the active filter
    updateFilterButtons();

}

/**
 * updateFilterButtons()
 * - Clears the "active" class on all filter buttons and adds it to the
 *   one matching the currently selected filter.
 * - IMPORTANT NOTE: the original implementation referenced an undefined
 *   `filter` variable. We rely on `currentFilter` here. If you see a bug where
 *   no button becomes active, check this value.
 */
function updateFilterButtons() {
        filterAllBtn.classList.remove("active");
        filterUnwatchedBtn.classList.remove("active");
        filterWatchedBtn.classList.remove("active");

        // Use `currentFilter` (the UI state) to decide which button to activate
        if (currentFilter === "all") {
            filterAllBtn.classList.add("active");
        }
        else if (currentFilter === "unwatched") {
            filterUnwatchedBtn.classList.add("active");
        }
        else if (currentFilter === "watched") {
            filterWatchedBtn.classList.add("active");
        }
}

// Register control event listeners once. Each listener updates the shared
// `currentFilter` state and calls `applyFilter()` to refresh the view.
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

/**
 * pickBtn click handler
 * - Finds all unwatched movies, picks a random one, and displays a suggestion
 *   to the user. If there are no unwatched movies, it shows a friendly message.
 */
pickBtn.addEventListener("click", () => {
    // Build a sub-array of only the unwatched movies
    const unwatched = movies.filter(movie => !movie.watched);

    if (unwatched.length === 0) {
        pickResult.textContent = "All movies have been watched!";
        return;
    }

    // Pick a random index within the unwatched array
    const randomIndex = Math.floor(Math.random() * unwatched.length);
    const picked  = unwatched[randomIndex];

    pickResult.textContent = `You should watch: ${picked.title}`;
});