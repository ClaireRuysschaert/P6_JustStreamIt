const api_url = "http://localhost:8000/api/v1/titles/";
const sort_by_imdb_score = "?sort_by=+-imdb_score";

function displayDetailedMovieInfosModalContent(movie, containerId) {
  fetch(api_url + movie.id)
    .then((response) => response.json())
    .then((data) => {
      var modalContent = document.querySelector("#myModal .modal-content p");

      var titleElement = document.createElement("h2");
      titleElement.innerHTML = movie.title;
      modalContent.appendChild(titleElement);

      var imgElement = document.createElement("img");
      imgElement.src = movie.image_url;
      modalContent.appendChild(imgElement);

      var genreElement = document.createElement("p");
      genreElement.innerHTML = "<span>Genre(s):</span> " + data.genres;
      modalContent.appendChild(genreElement);

      var dateElement = document.createElement("p");
      var date = new Date(data.date_published);
      var formattedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      dateElement.innerHTML = "<span>Published date:</span> " + formattedDate;
      modalContent.appendChild(dateElement);

      var ratedElement = document.createElement("p");
      ratedElement.innerHTML =
        "<span>Rated:</span> " +
        (data.rated && data.rated !== "Not rated or unkown rating"
          ? data.rated
          : "-");
      modalContent.appendChild(ratedElement);

      var scoreElement = document.createElement("p");
      scoreElement.innerHTML = "<span>IMBD Score:</span> " + data.imdb_score;
      modalContent.appendChild(scoreElement);

      var directorsElement = document.createElement("p");
      directorsElement.innerHTML = "<span>Director(s):</span> " + data.directors;
      modalContent.appendChild(directorsElement);

      var actorsElement = document.createElement("p");
      actorsElement.innerHTML = "<span>Actor(s):</span> " + data.actors.join(", ");
      modalContent.appendChild(actorsElement);

      var durationElement = document.createElement("p");
      durationElement.innerHTML = "<span>Duration:</span> " + data.duration + " min";
      modalContent.appendChild(durationElement);

      var countriesElement = document.createElement("p");
      countriesElement.innerHTML = "<span>Country:</span> " + data.countries;
      modalContent.appendChild(countriesElement);

      var boxOfficeElement = document.createElement("p");
      boxOfficeElement.innerHTML =
        "<span>Box Office:</span> " +
        (data.worldwide_gross_income ? data.worldwide_gross_income : "-");
      modalContent.appendChild(boxOfficeElement);

      var resumeElement = document.createElement("p");
      resumeElement.innerHTML = "<span>Summary:</span> " + data.long_description;
      modalContent.appendChild(resumeElement);
    });
}

function handleModal(modalId, triggerId, closeClass) {
  var modal = document.getElementById(modalId);
  var trigger = document.getElementById(triggerId);
  var span = document.getElementsByClassName(closeClass)[0];

  trigger.onclick = function () {
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function displayBestMovie(movie, containerId) {
  const container = document.getElementById(containerId);
  title = document.createElement("h2");
  title.innerHTML = movie.title;
  container.appendChild(title);
  
  // fetch detail api to display description
  fetch(api_url + movie.id)
  .then((response) => response.json())
  .then((data) => {
  const description = document.createElement("p");
  description.innerHTML = data.description;
  container.appendChild(description);});
  
  const img = document.createElement("img");
  img.src = movie.image_url;
  container.appendChild(img);
  
  const playButton = document.createElement("button");
  playButton.innerHTML = "Play";
  container.appendChild(playButton);

  handleModal("myModal", "moreInfosButton", "close");

  const moreInfosButton = document.getElementById("moreInfosButton");
  moreInfosButton.onclick = function () {
    const modalContent = document.querySelector("#myModal .modal-content p");
    modalContent.innerHTML = "";
    displayDetailedMovieInfosModalContent(movie, "myModal");
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
}

function displayMovies(movies, containerId) {
  const container = document.getElementById(containerId);
  // If the containerId is 'BestRatedMovies', start from the second movie
  const moviesToDisplay =
    containerId === "BestRatedMovies" ? movies.slice(1) : movies;
  moviesToDisplay.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie");
    const img = document.createElement("img");
    img.alt = movie.title;
    img.src = movie.image_url;
    movieContainer.appendChild(img);
    container.appendChild(movieContainer);
    img.onclick = function () {
      const modalContent = document.querySelector("#myModal .modal-content p");
      modalContent.innerHTML = "";
      displayDetailedMovieInfosModalContent(movie, "myModal");
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
    }
  });
}

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

// Best Movie
fetchAndDisplayMovies(api_url + sort_by_imdb_score, "BestMovie", true);

// Best Rated Movies
fetchAndDisplayMovies(
  api_url + sort_by_imdb_score + "&page_size=8",
  "BestRatedMovies"
);

// Best Movies By Genre
const moviesGenres = ["Biography", "Comedy", "Sci-Fi"];
moviesGenres.forEach((genre) => {
  fetchAndDisplayMovies(
    api_url + sort_by_imdb_score + `&genre=${genre}&page_size=7`,
    `${genre}Movies`
  );
});

const scrollAmount = 1000;
document.querySelectorAll(".arrow.right").forEach((arrow) => {
  arrow.addEventListener("click", () => {
    arrow.parentNode.parentNode.querySelector(".movies").scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
});

document.querySelectorAll(".arrow.left").forEach((arrow) => {
  arrow.addEventListener("click", () => {
    arrow.parentNode.parentNode.querySelector(".movies").scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
});
