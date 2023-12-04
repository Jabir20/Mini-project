// Banner Slider
const slider = document.querySelector('.slider');
const sliderWidth = slider.clientWidth;
let currentSlide = 1;

function scrollToNextSlide() {
    currentSlide++;
    if (currentSlide > 6) {
        currentSlide = 1;
    }
    const scrollAmount = (currentSlide - 1) * sliderWidth;
    slider.scroll({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

setInterval(scrollToNextSlide, 2000); // Scroll every 2 seconds

// Image change on edit location when new image is updated

function viewImage(event) {
    document.getElementById('imgView').src = URL.createObjectURL(event.target.files[0])
}




// Search Box related
// └─> code written in the user-header file
// script for search box
const searchBox = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const searchBtn = document.getElementById("search-btn");

searchBox.addEventListener("input", () => {
    const searchTerm = searchBox.value.trim();
    if (searchTerm) {
        // Send an AJAX request to your server with the searchTerm
        // You can use fetch or jQuery.ajax to make the request
        // Example using fetch:
        fetch(`/search?term=${searchTerm}`)
            .then((response) => response.json())
            .then((data) => {
                // Process the data and display matching results
                displayResults(data);
            });
    } else {
        // Clear the results container if the search box is empty
        searchResults.innerHTML = "";
    }
    document.addEventListener("click", (event) => {
        if (!searchBox.contains(event.target) && !searchResults.contains(event.target)) {
            // Click occurred outside the search box and results container
            searchResults.style.display = "none";
            searchBox.value = "";
        }
    });

});




// feedback popup
function submitFeedback() {
    alert("Feedback sent successfully")
    setTimeout(function () {
        location.reload();
    }, 10);
}

// suggestion popup
function submitSuggestion() {
    alert("Suggestion sent successfully")
    setTimeout(function () {
        location.reload();
    }, 10);
}

