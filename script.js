// Preloader Animation
window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    preloader.style.opacity = "0";
    setTimeout(() => {
        preloader.style.display = "none";
    }, 1000);
});

// Skills Progress Rings
document.querySelectorAll(".progress-ring").forEach((ring) => {
    const percent = ring.getAttribute("data-percent");
    const circumference = 2 * Math.PI * 75; // Radius = 75px
    const offset = circumference - (percent / 100) * circumference;
    ring.style.background = `conic-gradient(cyan ${percent}%, transparent ${percent}%)`;
});

// Typewriter Effect (Already handled in CSS)

// 3D Cube Rotation (Already handled in CSS)

// Game Logic
const gameContainer = document.querySelector(".game-container");
const spaceship = document.getElementById("spaceship");
const scoreBoard = document.getElementById("score-board");
const gameOverScreen = document.getElementById("game-over");
const restartBtn = document.getElementById("restart-btn");

let score = 0;
let isGameOver = false;
let spaceshipPosition = { x: 50, y: 80 }; // Percentage-based positioning
let crystals = [];
let blackHoles = [];

// Spaceship Movement
document.addEventListener("keydown", (e) => {
    if (isGameOver) return;

    const step = 5; // Movement speed
    const containerRect = gameContainer.getBoundingClientRect();

    if (e.key === "ArrowUp" && spaceshipPosition.y > 10) {
        spaceshipPosition.y -= step;
    } else if (e.key === "ArrowDown" && spaceshipPosition.y < 90) {
        spaceshipPosition.y += step;
    } else if (e.key === "ArrowLeft" && spaceshipPosition.x > 10) {
        spaceshipPosition.x -= step;
    } else if (e.key === "ArrowRight" && spaceshipPosition.x < 90) {
        spaceshipPosition.x += step;
    }

    spaceship.style.left = `${spaceshipPosition.x}%`;
    spaceship.style.top = `${spaceshipPosition.y}%`;
});

// Spawn Crystals and Black Holes
function spawnCrystal() {
    const crystal = document.createElement("div");
    crystal.classList.add("crystal");
    crystal.style.left = `${Math.random() * 90}%`;
    crystal.style.top = `${Math.random() * 90}%`;
    gameContainer.appendChild(crystal);
    crystals.push(crystal);

    // Remove crystal after 10 seconds
    setTimeout(() => {
        crystal.remove();
        crystals = crystals.filter((c) => c !== crystal);
    }, 10000);
}

function spawnBlackHole() {
    const blackHole = document.createElement("div");
    blackHole.classList.add("black-hole");
    blackHole.style.left = `${Math.random() * 90}%`;
    blackHole.style.top = `${Math.random() * 90}%`;
    gameContainer.appendChild(blackHole);
    blackHoles.push(blackHole);

    // Remove black hole after 15 seconds
    setTimeout(() => {
        blackHole.remove();
        blackHoles = blackHoles.filter((b) => b !== blackHole);
    }, 15000);
}

// Collision Detection
function checkCollisions() {
    const spaceshipRect = spaceship.getBoundingClientRect();

    // Check crystal collisions
    crystals.forEach((crystal, index) => {
        const crystalRect = crystal.getBoundingClientRect();
        if (
            spaceshipRect.left < crystalRect.right &&
            spaceshipRect.right > crystalRect.left &&
            spaceshipRect.top < crystalRect.bottom &&
            spaceshipRect.bottom > crystalRect.top
        ) {
            score++;
            scoreBoard.textContent = `Score: ${score}`;
            crystal.remove();
            crystals.splice(index, 1);
        }
    });

    // Check black hole collisions
    blackHoles.forEach((blackHole, index) => {
        const blackHoleRect = blackHole.getBoundingClientRect();
        if (
            spaceshipRect.left < blackHoleRect.right &&
            spaceshipRect.right > blackHoleRect.left &&
            spaceshipRect.top < blackHoleRect.bottom &&
            spaceshipRect.bottom > blackHoleRect.top
        ) {
            endGame();
        }
    });
}

// End Game
function endGame() {
    isGameOver = true;
    gameOverScreen.classList.remove("hidden");
    clearInterval(gameInterval);
    clearInterval(spawnCrystalInterval);
    clearInterval(spawnBlackHoleInterval);
}

// Restart Game
restartBtn.addEventListener("click", () => {
    isGameOver = false;
    score = 0;
    scoreBoard.textContent = `Score: ${score}`;
    gameOverScreen.classList.add("hidden");

    // Clear existing elements
    crystals.forEach((crystal) => crystal.remove());
    blackHoles.forEach((blackHole) => blackHole.remove());
    crystals = [];
    blackHoles = [];

    // Reset spaceship position
    spaceshipPosition = { x: 50, y: 80 };
    spaceship.style.left = `${spaceshipPosition.x}%`;
    spaceship.style.top = `${spaceshipPosition.y}%`;

    // Restart intervals
    gameInterval = setInterval(checkCollisions, 50);
    spawnCrystalInterval = setInterval(spawnCrystal, 2000);
    spawnBlackHoleInterval = setInterval(spawnBlackHole, 5000);
});

// Game Intervals
let gameInterval = setInterval(checkCollisions, 50);
let spawnCrystalInterval = setInterval(spawnCrystal, 2000);
let spawnBlackHoleInterval = setInterval(spawnBlackHole, 5000);