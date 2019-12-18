/* SLIDESHOW FOR THE MAINPAGE */
/* Vi trenger bilder */

var slideIndex = 1;
showSlides(slideIndex);

// Previous or next slide controls
function otherSlide(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// The function for displaying slides
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slides");
    var dots = document.getElementsByClassName("dot");
    //slideIndex++
    if (n > slides.length) {slideIndex = 1}
    else if (n < 1) {slideIndex = slides.length}
    else {slideIndex = n}

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "")
    }
    slides[slideIndex-1].style.display = "block"
    setTimeout(() => otherSlide(1), 5000) // change image every 5 seconds
    dots[slideIndex-1].className += " active"
}


