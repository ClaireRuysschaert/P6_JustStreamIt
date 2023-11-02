// Display the 7 better movies when data is sorted by imdb_score

// Fetch the first page of results
fetch("http://localhost:8000/api/v1/titles/?sort_by=+-imdb_score&page=1")
  .then((response) => response.json())
  .then((data) => {
    const bestMovies = data.results.slice(0, 5);
    const bestMoviesContainer = document.getElementById("bestRatedMovies");
    displayMovies(bestMovies, bestMoviesContainer);

    // Fetch the second page of results
    return fetch(
      "http://localhost:8000/api/v1/titles/?sort_by=+-imdb_score&page=2"
    );
  })
  .then((response) => response.json())
  .then((data) => {
    const bestMovies = data.results.slice(0, 2);
    const bestMoviesContainer = document.getElementById("bestRatedMovies");
    displayMovies(bestMovies, bestMoviesContainer);
  });

function displayMovies(movies, container) {
  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie");
    const movieImage = document.createElement("img");
    movieImage.src = movie.image_url;
    movieContainer.appendChild(movieImage);
    container.appendChild(movieContainer);
  });
}
