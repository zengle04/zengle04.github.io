document.addEventListener("DOMContentLoaded", function () {
    const starsContainer = document.getElementById("stars-container");

    function createStar() {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        starsContainer.appendChild(star);
    }

    // Create initial stars
    for (let i = 0; i < 100; i++) {
        createStar();
    }
});

var offsetStart = 0;
var offsetEnd = 0;

window.addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--scroll', (
    window.scrollY - offsetStart) / (document.body.offsetHeight - 
    offsetStart - offsetEnd - window.innerHeight));
}, false);