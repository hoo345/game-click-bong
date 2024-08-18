document.addEventListener('DOMContentLoaded', () => {
    const scoreElem = document.getElementById('score');
    const timerElem = document.getElementById('timer');
    const ballsContainer = document.getElementById('balls-container');
    const scaryImage = document.getElementById('scary-image');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');

    let score = 0;
    let clickCount = 0;
    let timer = 30; // Changed from 20 to 30 seconds
    let ballCount = 0;
    const totalBalls = 30;
    let ballInterval;
    let timerInterval;
    let gameRunning = false; // Track game state

    // Hide the scary image and restart button initially
    scaryImage.style.display = 'none';
    restartButton.classList.add('hidden');

    // Function to update the score
    function updateScore() {
        scoreElem.textContent = `Điểm: ${score}`;
    }

    // Function to handle ball clicks
    function handleBallClick(event) {
        if (event.target.classList.contains('ball')) {
            clickCount++;
            if (clickCount === 29) {
                scaryImage.style.display = 'flex'; // Show scary image when clicking the 29th ball
                setTimeout(() => {
                    scaryImage.style.display = 'none'; // Hide the scary image after 5 seconds
                }, 5000); // 5000 milliseconds = 5 seconds
            }
            score++;
            updateScore();
            event.target.remove();
            createBall(); // Create a new ball immediately when the current one is clicked
        }
    }

    // Function to create a ball
    function createBall() {
        if (ballCount >= totalBalls) return; // Prevent creating more than 30 balls

        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.style.top = `${Math.random() * 80}%`;
        ball.style.left = `${Math.random() * 80}%`;
        ball.addEventListener('click', handleBallClick);
        ballsContainer.appendChild(ball);
        ballCount++;
    }

    // Function to start the game
    function startGame() {
        if (gameRunning) return; // Prevent starting a new game if one is already running

        gameRunning = true; // Set game as running
        // Reset game state
        score = 0;
        clickCount = 0;
        timer = 30; // Reset timer to 30 seconds
        ballCount = 0;
        scoreElem.textContent = `Điểm: ${score}`;
        timerElem.textContent = `Thời gian: ${timer}`;
        ballsContainer.innerHTML = ''; // Clear existing balls
        scaryImage.style.display = 'none'; // Hide scary image

        // Create the initial ball
        createBall();

        // Timer for the game
        timerInterval = setInterval(() => {
            timer--;
            timerElem.textContent = `Thời gian: ${timer}`;
            if (timer <= 0) {
                clearInterval(timerInterval);
                gameRunning = false; // Set game as not running
                alert(`Thời gian hết! Điểm của bạn là ${score}`);
                restartButton.classList.remove('hidden'); // Show restart button when time is up
            }
        }, 1000);

        // Hide start button and show restart button
        startButton.classList.add('hidden');
        restartButton.classList.add('hidden');
    }

    // Function to restart the game
    function restartGame() {
        startGame();
    }

    // Event listeners
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);
});
