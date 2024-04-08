
document.addEventListener("DOMContentLoaded", function () {
    const starsContainer = document.getElementById("stars-container");
   const totalHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
    );
 
   starsContainer.style.height = `${totalHeight}px`;
    function createStar() {
        const star = document.createElement("div");
        star.className = "star";
        var g = Math.random();
        if(g > .9){
        	star.style.background = "red";
        }else if (g > .8){
        	star.style.background = "darkred";
        }
      
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
      const starsContainer = document.getElementById("stars-container");
    const totalHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
    );
 
   starsContainer.style.height = `${totalHeight}px`;
    
    
    
    const scrollY = window.scrollY;

    // Adjust the stretching based on the scroll position
    const stretchFactor = 1 + scrollY / 50;

    // Apply the stretching effect to each star
    const stars = document.querySelectorAll(".star");
    stars.forEach((star) => {
    		if(scrollY == 0){
        	star.style.height = `${2}px`;
        }else{
        	star.style.height = `${2 * stretchFactor}px`;
        }

    });
    
}, false);