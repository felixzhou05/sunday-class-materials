/**
 * Module: movies data + UI rendering helpers
 *
 * Purpose / "classes":
 * - Movie (plain object): represents a single movie with keys {id, title, watched}.
 * - This file holds an in-memory collection of `movies`, renders them into the DOM,
 *   and wires up UI event handlers to add, remove, and toggle watched state.
 *
 * Note: There are no ES6 `class` declarations here — movie is a simple POJO (plain object).
 */

// Example movie object shape for reference:
// { id: 1, title: "Inception", watched: false }

// In-memory store of movies used by the UI. Each entry follows the Movie shape above.
let movies = [
    { id: 1, title: "Inception", watched: false },
    { id: 2, title: "The Matrix", watched: true },
    { id: 3, title: "Interstellar", watched: false },
    { id: 4, title: "The Dark Knight", watched: true }
];

let nextId = 5;

// Cached DOM nodes used by the UI (single query per element for performance)
const movieInput = document.getElementById("movie-input");
const addBtn = document.getElementById("add-btn");
const movieList = document.getElementById("movie-list");
const emptyState = document.getElementById("empty-state");

/**
 * renderMovies(moviesToShow)
 * - Renders a list of movie objects into the `movieList` element.
 * - If `moviesToShow` is omitted, it defaults to rendering the full `movies` array.
 * - Handles an "empty state" by showing/hiding UI cues.
 */
function renderMovies(moviesToShow) {
    // Default to the full set when no filtered list is provided
    if(moviesToShow === undefined) {
        moviesToShow = movies;
    }

    // When list is empty, show a friendly message and clear the rendered list
    if(moviesToShow.length === 0) {
        emptyState.classList.remove("hidden");
        movieList.innerHTML = "";
        return;
    } else {
        emptyState.classList.add("hidden");
    }

    // Use .map to transform each movie object into an HTML string for that item
    const htmlParts  = moviesToShow.map(function(movie){
      // Determine CSS class and checkmark based on `watched` flag
      const itemClass = movie.watched ? "movie-item watched" : "movie-item"
      const checkMark = movie.watched ? "✓" : "";
      // Return an HTML list item string for each movie
      return ` 
        <li class="${itemClass}" data-id="${movie.id}">
        <div class="movie-check">${checkMark}</div>
        <span class="movie-title">${movie.title}</span>
        <button class="movie-delete" data-id="${movie.id}" title="Remove">🗑️</button>
        </li>
        `;
    });
    
    // Join all parts into one HTML blob and write to the container
    movieList.innerHTML = htmlParts.join("");
}

/**
 * addMovie()
 * - Reads the input, validates it, creates a new Movie object, appends it to the
 *   `movies` array, then re-renders the list and resets the input field.
 */
function addMovie() {
    const title = movieInput.value.trim();

    // Guard: empty input -> no-op
    if(title === "") return;

    const newMovie = {
        id: nextId,
        title: title,
        watched: false
    };

    movies.push(newMovie);
    nextId++;

    // Re-render to show the newly added movie
    renderMovies();

    // Clear and focus the input for convenience
    movieInput.value = "";
    movieInput.focus();
}

// Wire up basic controls: click the add button or press Enter to add a movie
addBtn.addEventListener("click", addMovie);
movieInput.addEventListener("keydown", function(event){
    if(event.key === "Enter") {
        addMovie();
    }
});

/**
 * movieList click handler (delegated)
 * - Uses event delegation to handle both delete button clicks and toggling the
 *   watched state when a movie item is clicked.
 */
movieList.addEventListener("click", function(event){
    const target = event.target;

    // Find closest delete button or list item (works even if a child element was clicked)
    const deleteBtn = target.closest(".movie-delete");
    const listItem  = event.target.closest(".movie-item");

    // Delete flow: filter out the movie with the matching id
    if(deleteBtn) {
        const id = Number(deleteBtn.dataset.id);
        movies = movies.filter (function(movie){
            return movie.id !== id;
        });

        renderMovies();
        return;
    }   

    // Toggle watched flow: find the movie and flip its `watched` boolean
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

// Initial render when the script loads
renderMovies();