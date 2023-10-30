// Banner Slider
const slider = document.querySelector('.slider');
const sliderWidth = slider.clientWidth;
let currentSlide = 1;

function scrollToNextSlide() {
    currentSlide++;
    if (currentSlide > 4) {
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

// Weather API related code
const apiKey = "65c7cf2933d703385c935e271566f6b7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)

    if (response.status == 404) {
        document.querySelector(".weather").style.display = "none"
        document.querySelector(".error").style.display = "block"
    }
    else {
        var data = await response.json();
        document.querySelector(".error").style.display = "none"

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + "km/hr";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }
        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block"
    }

}

