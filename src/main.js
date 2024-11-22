const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

// Resize the canvas to fit the window
canvas.width = window.outerWidth;
canvas.height = window.outerHeight;

let snowflakes = [];

// Create a Snowflake class
class Snowflake {
    constructor() {
        this.x = Math.random() * canvas.width; // Random x position
        this.y = Math.random() * canvas.height; // Random y position
        this.radius = Math.random() * 3 + 1; // Random size between 1 and 4
        this.speed = Math.random() * 2 + 1; // Random speed between 1 and 3
        this.wind = Math.random() * 0.5 - 0.25; // Random horizontal movement
    }

    update() {
        this.y += this.speed;
        this.x += this.wind;

        // Reset snowflake when it goes out of bounds
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }

        if (this.x > canvas.width || this.x < 0) {
            this.x = Math.random() * canvas.width;
            this.y = 0;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}

// Initialize snowflakes
function initSnowflakes(count) {
    snowflakes = [];
    for (let i = 0; i < count; i++) {
        snowflakes.push(new Snowflake());
    }
}

// Animate the snowflakes
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach(snowflake => {
        snowflake.update();
        snowflake.draw();
    });

    requestAnimationFrame(animate);
}

// Adjust canvas size when window resizes
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initSnowflakes(300); // Reinitialize snowflakes on resize
});

// Initialize and start the animation
initSnowflakes(300);
animate();
