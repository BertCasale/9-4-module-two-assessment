





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    // Add code you want to run on page load here
    
    //base url
    const BASE_URL = "https://resource-ghibli-api.onrender.com/"

    //fetch the api
    fetch(`${BASE_URL}films/`)
    .then(res => res.json())
    .then(res => {

    //get the dropdown box
    const titles = document.getElementById("titles");

    //create an empty object to store the movie data
    const moviesObj = {};

    //loop through the movies
    res.forEach(movie => {
        //create an option
        let movieOption = document.createElement("option");
        //set the value and text of the option to the movie title
        movieOption.text = movie.title;
        movieOption.value = movie.id;
        //append the option to the titles selection box
        titles.append(movieOption);
        
        //assign the movie to the opject using the movie id as key
        moviesObj[movie.id] = movie;
    });

    
    //get the display div
    const displayDiv = document.getElementById("display-info");
    //what happens when the movie changes
    titles.addEventListener("change", (event) => {

        //clear the display div
        displayDiv.innerHTML = "";

        //check if theres a value 
        if (event.target.value) {
            //create an h3, and 2 p tags
            let movieTitle = document.createElement("h3");
            let releaseYear = document.createElement("p");
            let movieDesc = document.createElement("p");

            //assign value to the new elements
            movieTitle.textContent = moviesObj[event.target.value].title
            releaseYear.textContent = moviesObj[event.target.value]['release_date']
            movieDesc.textContent = moviesObj[event.target.value].description
            movieDesc.style.width = "450px";

            //append to the div
            displayDiv.append(movieTitle);
            displayDiv.append(releaseYear);
            displayDiv.append(movieDesc);
        }
    })

    //get the reviews section list
    const reviewsList = document.querySelector("ul") 

    //what to do when form is submitted
    document.querySelector("form").addEventListener("submit", (event) => {
        //prevent page from refreshing
        event.preventDefault();

        //check if the titles box has no movie selected
        if (!titles.value) {
            //send an alert
            window.alert("Please select a movie first");

            //check if the review text box has a value
        } else if (!event.target.review.value) {
            //send an alert
            window.alert("Please enter a review")

        } else {
            //get the value from the textbox
            let review = event.target.review.value;
            //create a list item
            let latestReview = document.createElement("li");
            //set the inner html of the list item
            latestReview.innerHTML = `<strong>${moviesObj[titles.value].title}:<strong> ${review}`
            //append the list item to the list
            reviewsList.append(latestReview);

            //clear the text box
            event.target.review.value = "";
        }
    })

    //what the reset button does when clicked
    document.getElementById("reset-reviews").addEventListener("click", () => {
        //empty the reviews list html
        reviewsList.innerHTML = "";
    })





    //.then ends here
    })

    
















//function ends here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
