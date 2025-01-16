let intervalId;
let initialSpeed = 20;
let slowingRate = 0.95;
let minSpeed = 1;

function moveBoxRandomly() {
    const box = document.getElementById("box");
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const boxWidth = box.offsetWidth;
    const boxHeight = box.offsetHeight;

    let speed = initialSpeed;
    let currentX = parseInt(box.style.left, 10) || 50;
    let currentY = parseInt(box.style.top, 10) || 150;

    let directionX = Math.random() < 0.5 ? -1 : 1;
    let directionY = Math.random() < 0.5 ? -1 : 1;

    clearInterval(intervalId);

    intervalId = setInterval(() => {
        currentX += speed * directionX;
        currentY += speed * directionY;

        if (currentX <= 0 || currentX + boxWidth >= containerWidth) {
            directionX *= -1;
            currentX = Math.max(0, Math.min(currentX, containerWidth - boxWidth));
        }
        if (currentY <= 0 || currentY + boxHeight >= containerHeight) {
            directionY *= -1;
            currentY = Math.max(0, Math.min(currentY, containerHeight - boxHeight));
        }

        box.style.left = currentX + "px";
        box.style.top = currentY + "px";

        speed *= slowingRate;
        if (speed < minSpeed) {
            clearInterval(intervalId);
        }
    }, 50);
}