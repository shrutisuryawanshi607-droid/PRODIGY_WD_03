const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restartBtn");
const xPlayerDisplay = document.getElementById("xPlayerDisplay");
const oPlayerDisplay = document.getElementById("oPlayerDisplay");
const titleHeader = document.getElementById("titleHeader");

let currentPlayer = "";
let board = Array(9).fill("");
let isGameActive = false;
let humanPlayer = "";
let computerPlayer = "";

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Choose player
function choosePlayer(player) {
  humanPlayer = player;
  computerPlayer = player === "X" ? "O" : "X";
  currentPlayer = "X"; // X always starts
  titleHeader.textContent = Turn: ${currentPlayer};
  isGameActive = true;

  xPlayerDisplay.classList.remove("player-active");
  oPlayerDisplay.classList.remove("player-active");
  if (humanPlayer === "X") {
    xPlayerDisplay.classList.add("player-active");
  } else {
    oPlayerDisplay.classList.add("player-active");
  }

  if (currentPlayer === computerPlayer) {
    computerMove();
  }
}

// Handle click
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!isGameActive || board[index] !== "" || currentPlayer !== humanPlayer) return;

    makeMove(index, humanPlayer);

    if (checkWinner(humanPlayer)) {
      endGame(${humanPlayer} wins!);
    } else if (isDraw()) {
      endGame("Draw!");
    } else {
      currentPlayer = computerPlayer;
      titleHeader.textContent = Turn: ${currentPlayer};
      setTimeout(computerMove, 500); // Delay for natural play
    }
  });
});

// Make move
function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
}



