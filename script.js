
document.addEventListener("DOMContentLoaded", function () {
    const starsContainer = document.getElementById("stars-container");
    function createStar() {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        starsContainer.appendChild(star);
    }
    // Add scroll event listener
    // Create initial stars
    for (let i = 0; i < 100; i++) {
        createStar();
    }
});

window.addEventListener('scroll', function(){
    console.log("Test");
    const scrollY = window.scrollY;

    // Adjust the stretching based on the scroll position
    const stretchFactor = 1 + scrollY / 500;

    // Apply the stretching effect to each star
    const stars = document.querySelectorAll(".star");
    stars.forEach((star) => {
        star.style.height = `${20 * stretchFactor}px`;
    });
    
}, false);