// Get the first movie when data is sorted by imdb_score
fetch(
  "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=+-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="
)
  .then((response) => response.json())
  .then((data) => {
    const firstElement = data.results[0];
    // Display the title of the movie
    const bestMovie = document.getElementById("bestMovie");
    bestMovie.innerHTML = firstElement.title;
    // Add a line break
    const br = document.createElement("br");
    bestMovie.appendChild(br);
    // Display the image of the movie
    const bestMovieImage = document.createElement("img");
    bestMovieImage.src = firstElement.image_url;
    bestMovie.appendChild(bestMovieImage);
    // store in cst the id of the movie
    const id = firstElement.id;
    // Create a button "play" to play the trailer of the movie
    const bestMovieButton = document.createElement("button");
    bestMovieButton.innerHTML = "Play";
    bestMovie.appendChild(bestMovieButton);
    // Create a new request to get the detail of the movie with the id
    return fetch("http://localhost:8000/api/v1/titles/" + id);
  })
  .then((response) => response.json())
  .then((data) => {
    // Display the description of the movie
    const bestMovie = document.getElementById("bestMovie");
    const bestMovieDescription = document.createElement("p");
    bestMovieDescription.innerHTML = data.description;
    bestMovie.appendChild(bestMovieDescription);
    console.log(data);
  });
