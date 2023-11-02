// Display the 7 better animation movies
// Fetch the first page of results
fetch(
  "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Animation&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="
)
  .then((response) => response.json())
  .then((data) => {
    const animationMovies = data.results.slice(0, 5);
    const animationMoviesContainer = document.getElementById("animationMovies");
    displayMovies(animationMovies, animationMoviesContainer);

    // Fetch the second page of results
    return fetch(
      "http://localhost:8000/api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&genre=Animation&genre_contains=&imdb_score=&imdb_score_max=&imdb_score_min=&lang=&lang_contains=&max_year=&min_year=&page=2&rating=&rating_contains=&sort_by=-imdb_score&title=&title_contains=&writer=&writer_contains=&year="
    );
  })
  .then((response) => response.json())
  .then((data) => {
    const animationMovies = data.results.slice(0, 2);
    const animationMoviesContainer = document.getElementById("animationMovies");
    displayMovies(animationMovies, animationMoviesContainer);
  });

function displayMovies(movies, container) {
  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie");
    const movieImage = document.createElement("img");
    movieImage.alt = movie.title;
    movieImage.src = movie.image_url;
    movieImage.onerror = function () {
      movieImage.src = `https://placehold.co/182x268/black/white?font=oswald&text=${movie.title}`;
    };
    movieContainer.appendChild(movieImage);
    container.appendChild(movieContainer);
  });
}
