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


// API Related
