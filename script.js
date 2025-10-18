let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const message_div = document.getElementById('message');
const playerHand_div = document.getElementById('player-hand');
const computerHand_div = document.getElementById('computer-hand');
const choice_buttons = document.querySelectorAll('.choice-button');

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function convertToEmoji(word) {
    if (word === "rock") return "✊";
    if (word === "paper") return "✋";
    return "✌";
}

function updateDisplay(userChoice, computerChoice, result) {
    const userEmoji = convertToEmoji(userChoice);
    const compEmoji = convertToEmoji(computerChoice);
    
    // 1. Update Hand Displays
    playerHand_div.textContent = userEmoji;
    computerHand_div.textContent = compEmoji;

    // 2. Determine Message and Glow Class
    let messageText, glowClass;
    if (result === 'win') {
        userScore++;
        messageText = "VICTORY! Your attack penetrates the defense. +1 score.";
        glowClass = 'win-glow';
    } else if (result === 'lose') {
        computerScore++;
        messageText = "DEFEAT! A.I. countermeasures successful. -1 score.";
        glowClass = 'lose-glow';
    } else {
        messageText = "STANDOFF! Systems match. No score change.";
        glowClass = 'draw-glow';
    }

    // 3. Update Scoreboard and Message
    userScore_span.textContent = userScore;
    computerScore_span.textContent = computerScore;
    message_div.textContent = messageText;

    // 4. Apply Glow Animation
    const userChoiceElement = document.querySelector(`[data-choice="${userChoice}"]`);
    userChoiceElement.classList.add(glowClass);
    playerHand_div.classList.add(glowClass);
    computerHand_div.classList.add(glowClass); // Apply glow to both hands for effect
    
    // Remove Glow after a short delay
    setTimeout(() => {
        userChoiceElement.classList.remove(glowClass);
        playerHand_div.classList.remove(glowClass);
        computerHand_div.classList.remove(glowClass);
    }, 800);
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    let result = '';

    if (userChoice === computerChoice) {
        result = 'draw';
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'win';
    } else {
        result = 'lose';
    }

    updateDisplay(userChoice, computerChoice, result);
}

function main() {
    choice_buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove pulsing animation once the game starts
            choice_buttons.forEach(btn => btn.classList.remove('pulse'));
            
            // Get the choice from the data-attribute
            game(button.dataset.choice); 
        });
    });
}

main();