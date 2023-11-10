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
  title = document.createElement("h1");
  title.innerHTML = movie.title;

  container.appendChild(title);
  const img = document.createElement("img");
  
  img.src = movie.image_url;
  container.appendChild(img);
  const playButton = document.createElement("button");
  playButton.innerHTML = "Play";
  container.appendChild(playButton);
  fetch(api_url + movie.id)
    .then((response) => response.json())
    .then((data) => {
      const description = document.createElement("p");
      description.innerHTML = data.description;
      container.appendChild(description);

      var modalContent = document.querySelector("#myModal .modal-content p");
      
      var imgElement = document.createElement("img");
      imgElement.src = movie.image_url;
      modalContent.appendChild(imgElement);

      var titleElement = document.createElement("h1");
      titleElement.innerHTML = movie.title;
      modalContent.appendChild(titleElement);

      var genreElement = document.createElement("p");
      genreElement.innerHTML = "Genre(s): " + data.genres;
      modalContent.appendChild(genreElement);

      var dateElement = document.createElement("p");
      var date = new Date(data.date_published);
      var formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      dateElement.innerHTML = "Published date: " + formattedDate;
      modalContent.appendChild(dateElement);

      var ratedElement = document.createElement("p");
      ratedElement.innerHTML = "Rated: " + (data.rated && data.rated !== "Not rated or unkown rating" ? data.rated : "_");
      modalContent.appendChild(ratedElement);

      var scoreElement = document.createElement("p");
      scoreElement.innerHTML = "IMBD Score: " + data.imdb_score;
      modalContent.appendChild(scoreElement);

      var directorsElement = document.createElement("p");
      directorsElement.innerHTML = "Director(s): " + data.directors;
      modalContent.appendChild(directorsElement);

      var actorsElement = document.createElement("p");
      actorsElement.innerHTML = "Actor(s): " + data.actors.join(", ");
      modalContent.appendChild(actorsElement);

      var durationElement = document.createElement("p");
      durationElement.innerHTML = "Duration: " + data.duration + " min";
      modalContent.appendChild(durationElement);

      var countriesElement = document.createElement("p");
      countriesElement.innerHTML = "Country: " + data.countries;
      modalContent.appendChild(countriesElement);

      var boxOfficeElement = document.createElement("p");
      boxOfficeElement.innerHTML = "Box Office: " + (data.worldwide_gross_income ? data.worldwide_gross_income : "_");
      modalContent.appendChild(boxOfficeElement);

      var resumeElement = document.createElement("p");
      resumeElement.innerHTML = "Summary: " + data.long_description;
      modalContent.appendChild(resumeElement);
    });


    
  handleModal("myModal", "moreInfosButton", "close");
}

function handleModal(modalId, triggerId, closeClass) {
  var modal = document.getElementById(modalId);
  var trigger = document.getElementById(triggerId);

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName(closeClass)[0];

  // When the user clicks the button, open the modal 
  trigger.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
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

