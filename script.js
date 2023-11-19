const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
// Fixing the strech
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = []; // For the animation of particles

// Event Listener
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    /*
    // Rectangle
    ctx.fillStyle = "#F1EBDF";
    ctx.fillRect(10, 10, 150, 50);
    */
});


// For testing in the browser
// console.log(canvas);
// console.log(ctx);

// Working with Canvas
// Draw a Rectangle
/*
ctx.fillStyle = "White";
ctx.fillRect(10, 10, 150, 50);
*/

// Event Mouse
const mouse = {
    x: null,
    y: null,
}

/*
// For Drawing Continous circle
const lastMove = {
    x: undefined,
    y: undefined,
}
*/

// Event mause listener
canvas.addEventListener("click", event => {
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(event); // To see what is happening
    drawCircle();
})

// Drawing Througth the Canvas
canvas.addEventListener("mousemove", event => {
    /*
    lastMove.x = mouse.x;
    lastMove.y = mouse.y;
    */
    mouse.x = event.x;
    mouse.y = event.y;
    drawCircle();
});

// // Draw a Single Circle
// ctx.fillStyle = "orange";
// ctx.strokeStyle = "green"; // <-- to fill with a line the circle
// ctx.lineWidth = 5; // <-- to fill with a line the circle
// ctx.beginPath();
// ctx.arc(100, 100, 50, 0, /* For the whole Circunference */ Math.PI * 2);
// // ctx.fill(); // Fill with Color, this case orange
// ctx.stroke(); // <-- to fill with a line the circle
// console.log(ctx); // Checking the reference

// // Draw Multiple Cirlces
// const drawCircle = () =>  {
//     ctx.fillStyle = "red";
//     ctx.strokeStyle = "yellow"; // <-- to fill with a line the circle
//     ctx.lineWidth = 5; // <-- to fill with a line the circle
//     ctx.beginPath();
//     ctx.arc(mouse.x, mouse.y, 50, 0, /* For the whole Circunference */ Math.PI * 2);
//     ctx.fill(); // Fill with Color, this case orange
//     ctx.stroke(); // <-- to fill with a line the circle
// }

// Create the Particle Animation
class Particle {
    constructor() {
        // Initial values
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width; // For random Values
        // this.y = Math.random() * canvas.height; // For random Values

        // Random Values
        this.size = Math.random() * 5 + 1;

        // Random Values for speed
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    // Methods
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.strokeStyle = "yellow"; // <-- to fill with a line the circle
        ctx.lineWidth = 5; // <-- to fill with a line the circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, 50, 0, /* For the whole Circunference */ Math.PI * 2);
        ctx.fill(); // Fill with Color, this case orange
        ctx.stroke(); // <-- to fill with a line the circle
    }
}

const init = () => {
    for(let i = 0; i < 100; i++) {
        particleArray.push(new Particle());
    }
}

// Caling the Function to see what happens
init();
// console.log(particleArray);

// Drawing the Objects
const handleParticles = () => {
    for(let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }
}

// Animate 1 Circle
const animate = () => {
    // Clear the Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawCircle();
    handleParticles();
    requestAnimationFrame(animate); // Call itself
}

// Callint the Animation we just madre
animate();