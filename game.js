const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const exitButton = document.querySelector('.exit-button');
const levelButtons = document.querySelector('.level-buttons');
const storyButton = document.querySelector('.story-button');
const readStory = document.getElementById('read-story');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2 + 50;
const radius = 20;      // Radius of each dot 
const spacing = 20;     // Spacing between dots
// Array to store the random number assigned to each circle
let circleData = [];

let guessLimit;
let guessCount = 0;        // Number of guesses 
let aiGuessCount = 0;       // Number of guesses for AI
let score = 1;          // Player's score
let selectedMode = "Fun";       // Default mode
let timerInterval;
let aiScore = 1;        // AI score
let aiGuesses = [];     // To store AI's guessed circles
let playerGuesses = [];     // To store Player's guessed circles

// Confetti settings
const confettiCanvas = document.getElementById('confettiCanvas');
const confettiCtx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

// Array to hold confetti pieces
let confettiPieces = [];
const confettiCount = 300;      // Number of confetti pieces
const gravity = 0.5;            // Gravity that affects falling confetti 
const terminalVelocity = 5;     // Max falling speed for confetti
const drag = 0.075;             // Air resistance 

// Random helper function 
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Confetti piece class
class ConfettiPiece {
    constructor() {
        this.x = randomRange(0, confettiCanvas.width);
        this.y = randomRange(-confettiCanvas.height, 0);
        this.size = randomRange(5, 10);
        this.velocityX = randomRange(-2, 2);
        this.velocityY = randomRange(2, 5);
        this.color = `hsl(${randomRange(0, 360)}, 100%, 50%)`;  // Random color
        this.rotation = randomRange(0, Math.PI * 2);
        this.rotationSpeed = randomRange(0.02, 0.05);
    }

    // Draw the confetti piece
    draw() {
        confettiCtx.save();
        confettiCtx.translate(this.x, this.y);
        confettiCtx.rotate(this.rotation);
        confettiCtx.fillStyle = this.color;
        confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        confettiCtx.restore();
    }

    // Update position and rotation
    update() {
        // Apply gravity and drag (resistance)
        this.velocityX += gravity;
        this.velocityY = Math.min(this.velocityY, terminalVelocity);        // Cap falling speed
        this.velocityX *= (1 - drag);

        // Move confetti
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.rotation += this.rotationSpeed;

        // Bounce off screen edges
        if (this.x >= confettiCanvas.width || this.x <= 0) {
            this.velocityX *= -1;
        }

        // Reset confetti piece if it falls out of view
        if (this.y > confettiCanvas.height) {
            this.x = randomRange(0, confettiCanvas.width);
            this.y = randomRange(-confettiCanvas.height, 0);
            this.velocityX = randomRange(-2, 2);
            this.velocityY = randomRange(2, 5);
        }
    }
}

// Create confetti pieces
for (let i = 0; i < confettiCount; i++) {
    confettiPieces.push(new ConfettiPiece());
}

// Animate the confetti
function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces.forEach(confetti => {
        confetti.update();
        confetti.draw();
    });
    requestAnimationFrame(animateConfetti);
}

// Start the confetti animation
function startConfetti() {
    confettiCanvas.style.display = 'block';
    animateConfetti();
}

// Stop the confetti animation after a timeout (optional) 
function stopConfetti() {
    setTimeout(() => {
        confettiCanvas.style.display = 'none';
    }, 5000);       // Stop after 5 seconds
}

// Function to draw a circle
function drawCircle(circle, fillStyle, strokeStyle, textColor) {
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // If the number is visible, show it inside the circle
    if (circle.visible) {
        ctx.fillStyle = textColor;
        ctx.fillText(circle.number, circle.x, circle.y);
    }
}

function drawCenteredSquare(numCircles, maxNum, fill, stroke) {
    const circlePositions = [];
    const usedNumbers = new Set();      // Set to keep track of used numbers
    circleData = [];     // Reset the circleData array
    
    // Determine positions based on the number of circles
    switch(numCircles) {
        // case 1:
        //     // fill: "#F1F08A";
        //     // stroke: "#C6CD78";
        //     circlePositions.push({ x: centerX, y: centerY, fill: "#F1F08A", stroke: "#C6CD78" });
        //     break;
        // case 5:
        //     // fill = "#FECEA8";
        //     // stroke = "#FF847C";
        //     circlePositions.push(
        //         { x: centerX, y: centerY, fill: "#F1F08A", stroke: "#C6CD78" },

        //         { x: centerX, y: centerY - 100, fill: "#FECEA8", stroke: "#FF847C" },
        //         { x: centerX + 50, y: centerY, fill: "#FECEA8", stroke: "#FF847C" },
        //         { x: centerX, y: centerY + 100, fill: "#FECEA8", stroke: "#FF847C" },
        //         { x: centerX - 50, y: centerY, fill: "#FECEA8", stroke: "#FF847C" }
        //     );
        //     break;
        case 13:
            // fill = "#F4E557";
            // stroke = "#F5A855";
            circlePositions.push(
                { x: centerX, y: centerY, fill: "#F1F08A", stroke: "#C6CD78" },

                { x: centerX, y: centerY - 50, fill: "#FECEA8", stroke: "#FF847C" },
                { x: centerX + 50, y: centerY, fill: "#FECEA8", stroke: "#FF847C" },
                { x: centerX, y: centerY + 50, fill: "#FECEA8", stroke: "#FF847C" },
                { x: centerX - 50, y: centerY, fill: "#FECEA8", stroke: "#FF847C" },

                { x: centerX, y: centerY - 100, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX + 50, y: centerY - 50, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX + 100, y: centerY, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX + 50, y: centerY + 50, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX, y: centerY + 100, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX - 50, y: centerY + 50, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX - 100, y: centerY, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX - 50, y: centerY - 50, fill: "#F4E557", stroke: "#F5A855" }
            );
            break;
        case 25:
            fill = "#EEC89F";
            stroke = "#EA5FF2D";
            circlePositions.push(
                { x: centerX, y: centerY, fill: "#F1F08A", stroke: "#C6CD78" },

                { x: centerX, y: centerY - 50, fill: "#FECEA8", stroke: "#FF847C" },
                { x: centerX + 50, y: centerY, fill: "#FECEA8", stroke: "#FF847C" },
                { x: centerX, y: centerY + 50, fill: "#FECEA8", stroke: "#FF847C" },
                { x: centerX - 50, y: centerY, fill: "#FECEA8", stroke: "#FF847C" },

                { x: centerX, y: centerY - 100, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX + 50, y: centerY - 50, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX + 100, y: centerY, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX + 50, y: centerY + 50, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX, y: centerY + 100, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX - 50, y: centerY + 50, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX - 100, y: centerY, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX - 50, y: centerY - 50, fill: "#F4E557", stroke: "#F5A855" },

                { x: centerX, y: centerY - 150, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX + 50, y: centerY - 100, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX + 100, y: centerY - 50, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX + 150, y: centerY, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX + 100, y: centerY + 50, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX + 50, y: centerY + 100, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX, y: centerY + 150, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX - 50, y: centerY + 100, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX - 100, y: centerY + 50, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX - 150, y: centerY, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX - 100, y: centerY - 50, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX - 50, y: centerY - 100, fill: "#EEC89F", stroke: "#EA5FF2D" }
            );
            break;
        case 41:
            fill = "#FFCCCC";
            stroke = "#FB7777";
            circlePositions.push(
                { x: centerX, y: centerY, fill: "#F1F08A", stroke: "#C6CD78" },

                { x: centerX, y: centerY - 50, fill: "#FECEA8", stroke: "#FF847C" },
                { x: centerX + 50, y: centerY, fill: "#FECEA8", stroke: "#FF847C" },
                { x: centerX, y: centerY + 50, fill: "#FECEA8", stroke: "#FF847C" },
                { x: centerX - 50, y: centerY, fill: "#FECEA8", stroke: "#FF847C" },

                { x: centerX, y: centerY - 100, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX + 50, y: centerY - 50, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX + 100, y: centerY, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX + 50, y: centerY + 50, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX, y: centerY + 100, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX - 50, y: centerY + 50, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX - 100, y: centerY, fill: "#F4E557", stroke: "#F5A855" },
                { x: centerX - 50, y: centerY - 50, fill: "#F4E557", stroke: "#F5A855" },
                
                { x: centerX, y: centerY - 150, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX + 50, y: centerY - 100, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX + 100, y: centerY - 50, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX + 150, y: centerY, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX + 100, y: centerY + 50, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX + 50, y: centerY + 100, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX, y: centerY + 150, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX - 50, y: centerY + 100, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX - 100, y: centerY + 50, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX - 150, y: centerY, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX - 100, y: centerY - 50, fill: "#EEC89F", stroke: "#EA5FF2D" },
                { x: centerX - 50, y: centerY - 100, fill: "#EEC89F", stroke: "#EA5FF2D" },

                { x: centerX, y: centerY - 200, fill: "#FFCCCC", stroke: "#FB7777" },
                { x: centerX + 50, y: centerY - 150, fill: "#FFCCCC", stroke: "#FB7777" },
                { x: centerX + 100, y: centerY - 100, fill: "#FFCCCC", stroke: "#FB7777" },
                { x: centerX + 150, y: centerY - 50, fill: "#FFCCCC", stroke: "#FB7777" },
                { x: centerX + 200, y: centerY, fill: "#FFCCCC", stroke: "#FB7777" },
                { x: centerX + 150, y: centerY + 50, fill: "#FFCCCC", stroke: "#FB7777" },
                { x: centerX + 100, y: centerY + 100, fill: "#FFCCCC", stroke: "#FB7777" },
                { x: centerX + 50, y: centerY + 150, fill: "#FFCCCC", stroke: "#FB7777" },
                { x: centerX, y: centerY + 200, fill: "#FFCCCC", stroke: "#FB7777" },
                { x: centerX - 50, y: centerY + 150, fill: "#FFCCCC", stroke: "#FB7777" },
                { x: centerX - 100, y: centerY + 100, fill: "#FFCCCC", stroke: "#FB7777" },
                { x: centerX - 150, y: centerY + 50, fill: "#FFCCCC", stroke: "#FB7777" },
                { x: centerX - 200, y: centerY, fill: "#FFCCCC", stroke: "#FB7777" },
                { x: centerX - 150, y: centerY - 50, fill: "#FFCCCC", stroke: "#FB7777" },
                { x: centerX - 100, y: centerY - 100, fill: "#FFCCCC", stroke: "#FB7777" },
                { x: centerX - 50, y: centerY - 150, fill: "#FFCCCC", stroke: "#FB7777" }
            );
            break;
        default:
            console.error("Unsupported number of circles");
            return;
    }

    // Validate that the range of numbers is sufficient 
    const minNum = 1;
    if (maxNum - minNum + 1 < numCircles) {
        console.error("The range of numbers is too small to ensure unique values.");
        return;
    }
    
    // Set the styles 
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "20px Arial";

    // Draw the circles and unique random numbers inside them 
    circlePositions.forEach((pos) => {
        // Generate a random number within the specified range 
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        }
        while (usedNumbers.has(randomNumber));
        
        // Add the number to the set of used numbers
        usedNumbers.add(randomNumber);

        circleData.push({
            x: pos.x,
            y: pos.y,
            radius: radius,
            number: randomNumber,
            visible: false      // Initially the number is hidden
        });
        
        // Draw the circle (number is hidden initially)
        drawCircle(circleData[circleData.length - 1], pos.fill, pos.stroke);
    });

    // Display initial score and guesses
    updateScore();

    if (selectedMode === "Competitive") {
        updateAIScore();
    }
}

// Update Player Score and Guess count
function updateScore() {
    ctx.clearRect(0, 0, canvas.width, 50);      // Clear the area where score  and guesses are displayed
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    if (selectedMode === "Competitive") {
        ctx.fillText(`[PLAYER] Score: ${score}`, 100, 20);
    } else {
        ctx.fillText(`Score: ${score}`, 100, 20);
    }
    ctx.fillText(`Guess Count: ${guessCount}`, canvas.width - 150, 20);
}

// Function to handle user clicks on the canvas
function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if the click was inside the circle
    circleData.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (distance < circle.radius) {
            // Reveal the number for the clicked circle
            if (!circle.visible) {
                circle.visible = true;

                drawCircle(circle, '#F1F08A', '#C6CD78', '#000');

                // Increment guesses
                guessCount++;

                // Check if the revealed number is 13
                if (circle.number === 13) {
                    if (score > 130) {
                        score = score * 13 - guessCount;
                    } else {
                        score = score * 13;        // Award currentScore * 13 for finding the number 13
                    }
                    winAlert();
                    // alert("You found the number 13!");
                } else {
                    // Deduct points for incorrect guesses
                    if (score > 130) {
                        score -= 10;
                    }
                }
            }

            // Update score and guesses display
            updateScore();

            // After player's turn, make AI guess
            if (selectedMode === "Competitive") {
                aiGuess();
            }
        }
    });
}

function winAlert() {
    canvas.style.display = "block";
    readStory.style.display = "none";
    exitButton.style.display = "block";
    levelButtons.style.display = "none";
    storyButton.style.display = "none";
    
    ctx.fillStyle = "#EBC49F";
    ctx.strokeStyle = "#D37676";
    ctx.fillRect(centerX - 200, centerY - 100, 350, 100);
    ctx.strokeRect(centerX - 200, centerY - 100, 350, 100);
    
    ctx.fillStyle = "#FF6868";
    ctx.font = "24px Arial";
    ctx.fillText("YOU WIN \u{1F3C6}!!", centerX - 20, centerY - 80);
    ctx.fillText("You found the number 13 \u{1F3C5}!", centerX - 20, centerY - 50);
    ctx.fillText(`Within ${guessCount} guesses!`, centerX - 20, centerY - 20);
    
    canvas.removeEventListener('click', handleClick, false);   

    if (selectedMode === "Challenge") {
        clearInterval(timerInterval);
    }
    
    // Call startConfetti() when the player wins
    if (selectedMode === "Competitive" || selectedMode === "Challenge") {
        startConfetti();
        stopConfetti();     // Optional: stop after a while
    }
}

function gameOverAlert(guessBool, timerBool, aiBool) {
    canvas.style.display = "block";
    readStory.style.display = "none";
    exitButton.style.display = "block";
    levelButtons.style.display = "none";
    storyButton.style.display = "none";

    ctx.fillStyle = "#EBC49F";
    ctx.strokeStyle = "D37676";
    ctx.fillRect(centerX - 200, centerY - 100, 350, 100);
    ctx.strokeRect(centerX - 200, centerY - 100, 350, 100);

    ctx.fillStyle = "#FF6868";
    ctx.font = "24px Arial";
    ctx.fillText("GAME OVER \u{1F340}!", centerX - 20, centerY - 50);
    if (guessBool) {
        ctx.font = "20px Arial";
        ctx.fillText("You've used all your guesses!", centerX - 20, centerY - 20);
    } else if (timerBool) {
        ctx.font = "20px Arial";
        ctx.fillText("Time's up!", centerX - 20, centerY - 20);
    } else if (aiBool) {
        ctx.font = "20px Arial";
        ctx.fillText("AI Wins! Better luck next time.", centerX - 20, centerY - 20);
    }

    canvas.removeEventListener("click", handleClick, false);
}

// Show the game and hide the level buttons
function startGame(levelNumber) {
    canvas.style.display = "block";
    readStory.style.display = "none";
    exitButton.style.display = "none";
    levelButtons.style.display = "none";
    storyButton.style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Reset the number of guesses
    guessCount = 0;
    
    // Set game mode-specific rules
    if (selectedMode === "Challenge") {
        handleChallengeMode(levelNumber);
    } else if (selectedMode === "Fun") {
        drawGameBoard(levelNumber);     // No restrictions in Fun Mode 
    } else if (selectedMode === "Competitive") {
        aiGuessCount = 0;
        handleCompetitiveMode(levelNumber);
    }

    // Add an event listener for clicks on the canvas
    canvas.addEventListener("click", handleClick);
}

function viewStory() {
    canvas.style.display = "none";
    readStory.style.display = "block";
    exitButton.style.display = "block";
    levelButtons.style.display = "none";
    storyButton.style.display = "none";
    readStory.innerHTML = "";

    const paraStory1 = document.createElement("p");
    
    paraStory1.innerHTML += "The number \"13\" is the third centered square number.  In elementary number theory, a centered square number is a centered <a href='https://en.wikipedia.org/wiki/Figurate_number' class='link-3d-perspective'>figurate number</a> that gives the number of dots in a square with a dot in the center and all other dots surrounding the center dot in successive square layers.";
    
    paraStory1.innerHTML += "<span style='font-style: italic;'><a href='https://en.wikipedia.org/wiki/Centered_square_number' class='link-3d-push'>&laquo; Wikipedia &raquo;</a>";

    readStory.appendChild(paraStory1);

    const paraStory2 = document.createElement("p");

    paraStory2.innerHTML += "There is another part to this game I wish to continue with.  The number \"13\" is the second star number, still a centered <a href='https://en.wikipedia.org/wiki/Figurate_number' class='link-3d-perspective'>figurate number</a>, but a centered hexagram, which is a 6-pointed star, such as the Star of David, or the board <a href='https://en.wikipedia.org/wiki/Chinese_checkers' class='link-3d-perspective'>Chinese checkers</a>.";

    paraStory2.innerHTML += "<span style='font-style: italic;'><a href='https://en.wikipedia.org/wiki/Star_number' class='link-3d-push'>&laquo; Wikipedia &raquo;</a>"

    readStory.appendChild(paraStory2);
}

// Challenge Mode logic
function handleChallengeMode(levelNumber) {
    // let guessLimit;
    let timer;     // Set timer for ?? seconds based on the difficulty of level
    
    if (levelNumber === 13) {
        timer = 10;
        guessLimit = 6;
    } else if (levelNumber === 25) {
        timer = 10;
        guessLimit = 12;
    } else if (levelNumber === 41) {
        timer = 30;
        guessLimit = 20;
    }

    timerInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
            updateTimerDisplay(timer);
        } else {
            clearInterval(timerInterval);
            gameOverAlert(false, true, false);     // Display the "GAME OVER" message
        }
    }, 1000);

    // Draw the game board
    drawGameBoard(levelNumber);

    console.log(levelNumber, guessLimit);
    // Check if player runs out of guesses
    canvas.addEventListener("click", function handleClick() {
        // guesses++;
        if (guessCount >= guessLimit) {
            clearInterval(timerInterval);
            gameOverAlert(true, false, false);     // Display the "GAME OVER" message 
        }
    });
}

// Competitive Mode logic
function handleCompetitiveMode(levelNumber) {

    drawGameBoard(levelNumber);
    
    // Player makes their guess
    canvas.addEventListener("click", handlePlayerGuess);
}

// Function to handle the player's guess
function handlePlayerGuess(event) {
    const clickedCircle = getClickedCircle(event);

    // If the player clicks on a valid circle that has not been guessed
    if (clickedCircle && !clickedCircle.visible) {
        playerGuesses.push(clickedCircle);
        guessCount++;

        // Reveal the player's guess
        clickedCircle.visible = true;
        drawCircle(clickedCircle, "#F1F08A", "#C6CD78", "#000");

        // Check if the player found the number 13
        if (clickedCircle.number === 13) {
            canvas.removeEventListener("click", handlePlayerGuess);     // Disable player clicks
            if (score > 130) {
                score = score * 13 - guessCount;
            } else {
                score *= 13;
            }
            winAlert();
        } else {
            if (score > 130)
                score -= 10;
        }
        updateScore();
    }
}

function aiGuess() {
    // Filter out already guessed circles
    const availableCircles = circleData.filter(circle => !circle.visible && !aiGuesses.includes(circle));

    // If there are available circles, make the AI guess
    if (availableCircles.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCircles.length);        // AI picks a random circle
        const aiChosenCircle = availableCircles[randomIndex];
        
        aiGuesses.push(aiChosenCircle.number);
        // Increment AI's guesses 
        aiGuessCount++;

        // Reveal the AI's guess
        aiChosenCircle.visible = true;      // Mark the AI's guess as visible

        // Draw the AI's guess in a distinct color (e.g., red) 
        drawCircle(aiChosenCircle, '#FFAD60', '#D9534F', '#FFF');
        
        // Check if the AI found the number 13 (AI wins)
        if (aiChosenCircle.number === 13) {
            canvas.removeEventListener("click", handlePlayerGuess);     // Disable player clicks
            if (aiScore > 130) {
                aiScore = aiScore * 13 - aiGuessCount;
            } else {
                aiScore *= 13;
            }
            setTimeout(() => {
                gameOverAlert(false, false, true);      // AI wins alert
            }, 200);        // Delay before showing the alert
        } else {
            if (aiScore > 130)
                aiScore -= 10;
        }
        updateAIScore();
    }
}

// Timer display update
function updateTimerDisplay(time) {
    ctx.clearRect(0, 50, canvas.width, 50);
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(`Timer: ${time}`, 70, 60);
}

// Update AI Score and Guesses
function updateAIScore() {
    ctx.clearRect(0, 50, canvas.width, 50);      // Clear the area where score  and guesses are displayed
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(`[AI] Score: ${aiScore}`, 100, 60);
    ctx.fillText(`Guess Count: ${aiGuessCount}`, canvas.width - 150, 60);
}

// Helper function to get the clicked circle based on mouse position
function getClickedCircle(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if the click was inside a circle
    for (const circle of circleData) {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (distance < circle.radius) {
            return circle;      // Return the clicked circle
        }
    }
    return null;        // Return null if no circle was clicked
}

// Function to draw the game board
function drawGameBoard(levelNumber) {
    // Depending on the case number, draw the appropriate number of circles
    switch (levelNumber) {
        case 13:
            drawCenteredSquare(13, 13);
            break;
        case 25:
            drawCenteredSquare(25, 25);
            break;
        case 41:
            drawCenteredSquare(41, 41);
            break;
        default:
            console.error("Unsupported level!");
            return;
    }
}

// Hide the game and show the level buttons again
function exitGame() {
    canvas.style.display = "none";
    readStory.style.display = "none";
    exitButton.style.display = "none";
    levelButtons.style.display = "block";
    storyButton.style.display = "block";

    if (selectedMode === "Challenge") {
        guessLimit = null;
    }
}

// Display the mode menu on button click
document.getElementById("selectMode").addEventListener("click", () => {
    const modeMenu = document.getElementById("modeMenu");
    modeMenu.style.display = modeMenu.style.display === "none" ? "block" : "none";
});

// Selecting Challenge Mode
document.getElementById("modeChallenge").addEventListener("click", () => {
    selectedMode = "Challenge";
    document.getElementById("selectMode").textContent = "Mode: Challenge";
    document.getElementById("modeMenu").style.display = "none";
})

// Select Fun Mode
document.getElementById("modeFun").addEventListener("click", () => {
    selectedMode = "Fun";
    document.getElementById("selectMode").textContent = "Mode: Fun";
    document.getElementById("modeMenu").style.display = "none";
});

// Select Competitive Mode
document.getElementById("modeCompetitive").addEventListener("click", () => {
    selectedMode = "Competitive";
    document.getElementById("selectMode").textContent = "Mode: Competitive";
    document.getElementById("modeMenu").style.display = "none";
});

// Add event listeners for the level buttons
document.getElementById('level1').addEventListener('click', () => startGame(13));
document.getElementById('level2').addEventListener('click', () => startGame(25));
document.getElementById('level3').addEventListener('click', () => startGame(41));
// Add event listener for the story button
document.getElementById('story').addEventListener('click', viewStory);
// Add event listener for the exit button
document.getElementById('exit').addEventListener('click', exitGame);