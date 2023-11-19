const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
// Fixing the strech
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = []; // For the animation of particles
let hue = 0;

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
    // drawCircle();
    // Particle creation with a click
    for(let i = 0; i < 100; i++) {
        particleArray.push(new Particle());
    }
});

// Drawing Througth the Canvas
canvas.addEventListener("mousemove", event => {
    /*
    lastMove.x = mouse.x;
    lastMove.y = mouse.y;
    */
    mouse.x = event.x;
    mouse.y = event.y;
    // drawCircle();
    for(let i = 0; i < 5; i++) {
        particleArray.push(new Particle());
    }
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
        this.size = Math.random() * 15 + 1;

        // Random Values for speed
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = "hsl(" + hue + ", 100%, 50%";
    }
    // Methods
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2) this.size -= 0.1; // Shrinking the particles. Pay attention in not go below zero since raduys cannot be negative number
    }
    draw() {
        ctx.fillStyle = this.color;
        // ctx.strokeStyle = "yellow"; // <-- to fill with a line the circle
        ctx.lineWidth = 5; // <-- to fill with a line the circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, /* Changed 50 to this.size*/ this.size, 0, /* For the whole Circunference */ Math.PI * 2);
        ctx.fill(); // Fill with Color, this case orange
        ctx.stroke(); // <-- to fill with a line the circle
    }
}

/*
const init = () => {
    for(let i = 0; i < 100; i++) {
        particleArray.push(new Particle());
    }
}


// Caling the Function to see what happens
init();
// console.log(particleArray);
*/

// Drawing the Objects
/* version 1
const handleParticles = () => {
    for(let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();

        // If particle is less ot equal than 0.3
        if(particleArray[i].size <= 0.3) {    
            particleArray.splice(i, 1);
            i--; // The -1 is to avoid skip the next element.
        }
    }
}
*/

const handleParticles = () => {
    for(let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();

        // Drawing like Quadratic (Pythagorean Theorem)
        for(let j = i; j < particleArray.length; j++) {
            const dx = particleArray[i].x - particleArray[j].x; // Bottom vetical Line of the triangle
            const dy = particleArray[i].y - particleArray[j].y; // Side horizontal Line of the triangle
            const distance = Math.sqrt(dx * dx + dy * dy); // Hyphotenus
            if(distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particleArray[i].color;
                ctx.lineWidth = 0.2; // particlesArray[i].size; / particlesArray[i].size / 3; / particlesArray[i].size / 10;
                ctx.moveTo(particleArray[i].x, particleArray[i].y);
                ctx.lineTo(particleArray[j].x, particleArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }

        // If particle is less ot equal than 0.3
        if(particleArray[i].size <= 0.3) {    
            particleArray.splice(i, 1);
            console.log(particleArray.length);
            i--; // The -1 is to avoid skip the next element.
        }
    }
}


// Animate 1 Circle
const animate = () => {
    // Clear the Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "rgba(0,0,0,0.02)"; // Transparent
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // drawCircle();
    handleParticles();
    hue+=2; // Increasing the color to change it. hue++ increments by 1, hue+=5 change the speed faster but hue+=0.5 change slowly
    requestAnimationFrame(animate); // Call itself
}

// Callint the Animation we just madre
animate();