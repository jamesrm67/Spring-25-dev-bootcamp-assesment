let intervalId; // To store the interval ID
let initialSpeed = 20; // Initial speed in pixels per interval
let slowingRate = 0.95; // Rate at which speed slows (must be less than 1)
let minSpeed = 1; // Minimum speed before stopping

function moveBoxRandomly() {
    const box = document.getElementById("box");
    const containerWidth = window.innerWidth; // Screen width
    const containerHeight = window.innerHeight; // Screen height
    const boxWidth = box.offsetWidth;
    const boxHeight = box.offsetHeight;

    let speed = initialSpeed; // Reset speed each time the button is clicked
    let currentX = parseInt(box.style.left, 10) || 50; // Starting horizontal position, default to 50px
    let currentY = parseInt(box.style.top, 10) || 150; // Starting vertical position, default to 150px

    // Randomize direction (-1 or 1 for both X and Y)
    let directionX = Math.random() < 0.5 ? -1 : 1;
    let directionY = Math.random() < 0.5 ? -1 : 1;

    // Clear any existing interval to avoid overlapping animations
    clearInterval(intervalId);

    // Start a new interval to move the box
    intervalId = setInterval(() => {
        // Calculate new positions
        currentX += speed * directionX;
        currentY += speed * directionY;

        // Check boundaries and reverse direction if necessary
        if (currentX <= 0 || currentX + boxWidth >= containerWidth) {
            directionX *= -1;
            currentX = Math.max(0, Math.min(currentX, containerWidth - boxWidth));
        }
        if (currentY <= 0 || currentY + boxHeight >= containerHeight) {
            directionY *= -1;
            currentY = Math.max(0, Math.min(currentY, containerHeight - boxHeight));
        }

        // Update box position
        box.style.left = currentX + "px";
        box.style.top = currentY + "px";

        // Reduce speed over time
        speed *= slowingRate;
        if (speed < minSpeed) {
            clearInterval(intervalId); // Stop animation when speed is very low
        }
    }, 50); // Interval frequency in milliseconds
}