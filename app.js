window.onload = () => {
    game();
};

const MOVES = {
    1: { name: "Rock", beats: 3 },
    2: { name: "Paper", beats: 1 },
    3: { name: "Scissors", beats: 2 },
};

const game = () => {
    let playerScore = 0;
    let computerScore = 0;
    while (playerScore < 5 && computerScore < 5) {
        const result = playRound();
        if (result > 0) playerScore++;
        else if (result < 0) computerScore++;
        console.log(`Score is ${playerScore} - ${computerScore}`);
    }
    console.log(playerScore === 5 ? "You won the game of 5!" : "You lost the game of 5!");
}

const playRound = () => {
    const playerSelection = getPlayerSelection();
    const computerSelection = getComputerSelection();
    const playerWon = checkPlayerWon(playerSelection, computerSelection);
    const message = getMessage(playerSelection, computerSelection, playerWon);
    console.log(message);
    return playerWon;
}

const getComputerSelection = () => {
    const possibleMoves = Object.keys(MOVES).length;
    return Math.floor(Math.random() * possibleMoves) + 1;
}

const getPlayerSelection = () => {
    let move = 0;
    do {
        const str = window.prompt("Rock Paper or Scissors?").trim().toLowerCase();
        move = Object.keys(MOVES).reduce((prev, moveIndex) => {
            if (MOVES[moveIndex].name.toLowerCase() === str) return moveIndex;
            return prev;
        }, move);
    } while (move == 0);
    return move;
}

const checkPlayerWon = (playerSelection, computerSelection) => {
    if (playerSelection === computerSelection) return 0; // Tie
    else if (MOVES?.[playerSelection]?.beats === computerSelection) return 1; // Player Wins
    else return -1; // Player loses
}

const getMessage = (playerSelection, computerSelection, playerWon) => {
    let msg = "";
    switch (playerWon) {
        case 0: 
            msg = "Its a tie!";
            break;
        case 1:
            msg = "You Won!";
            break;
        case -1:
            msg = "You Lost!";
            break;
    }
    msg += ` You Played ${MOVES[playerSelection].name} and computer played ${MOVES[computerSelection].name}`;
    return msg;
}