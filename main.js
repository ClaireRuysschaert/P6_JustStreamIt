const api_url = "http://localhost:8000/api/v1/titles/";
const sort_by_imdb_score = "?sort_by=+-imdb_score";

function fetchAndDisplayMovies(url, containerId, isBestMovie = false) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (isBestMovie) {
        displayBestMovie(data.results[0], containerId);
      } else {
        displayMovies(data.results, containerId);
      }
    });
}

function displayBestMovie(movie, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = movie.title;
  container.appendChild(document.createElement("br"));
  const img = document.createElement("img");
  img.src = movie.image_url;
  container.appendChild(img);
  const playButton = document.createElement("button");
  playButton.innerHTML = "Play";
  container.appendChild(playButton);
  const moreInfosButton = document.createElement("button");
  moreInfosButton.innerHTML = "More Infos";
  container.appendChild(moreInfosButton);
  fetch(api_url + movie.id)
    .then((response) => response.json())
    .then((data) => {
      const description = document.createElement("p");
      description.innerHTML = data.description;
      container.appendChild(description);
    });
}

function displayMovies(movies, containerId) {
  const container = document.getElementById(containerId);
  // If the containerId is 'BestRatedMovies', start from the second movie
  const moviesToDisplay = containerId === "BestRatedMovies" ? movies.slice(1) : movies;
  moviesToDisplay.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie");
    const img = document.createElement("img");
    img.alt = movie.title;
    img.src = movie.image_url;
    img.onerror = function () {
      img.src = `https://placehold.co/182x268/black/white?font=oswald&text=${movie.title}`;
    };
    movieContainer.appendChild(img);
    container.appendChild(movieContainer);
  });
}

// Best Movie
fetchAndDisplayMovies(api_url + sort_by_imdb_score, "BestMovie", true);

// Best Rated Movies
fetchAndDisplayMovies(api_url + sort_by_imdb_score + "&page_size=8", "BestRatedMovies");

// Best Movies By Genre
const moviesGenres = ["Biography", "Comedy", "Sci-Fi"];
moviesGenres.forEach((genre) => {
  fetchAndDisplayMovies(api_url + sort_by_imdb_score + `&genre=${genre}&page_size=7`, `${genre}Movies`);
});
