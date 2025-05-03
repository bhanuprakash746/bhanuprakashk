const board = document.getElementById("board");
const statusText = document.getElementById("status");
const modeSelect = document.getElementById("mode");

let cells;
let currentPlayer = "X";
let gameActive = true;
let gameMode = "ai"; // default

modeSelect.addEventListener("change", () => {
  gameMode = modeSelect.value;
  resetGame();
});

function createBoard() {
  board.innerHTML = "";
  cells = Array(9).fill(null);

  for (let i = 0; i < 9; i++) {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.dataset.index = i;
    cellDiv.addEventListener("click", handleCellClick);
    board.appendChild(cellDiv);
  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || cells[index]) return;

  makeMove(index, currentPlayer);

  if (checkWinner(currentPlayer)) {
    endGame(`${currentPlayer} wins!`);
  } else if (cells.every(cell => cell)) {
    endGame("Draw!");
  } else {
    switchPlayer();
    if (gameMode === "ai" && currentPlayer === "O") {
      setTimeout(aiMove, 500); // slight delay
    }
  }
}

function makeMove(index, player) {
  cells[index] = player;
  board.children[index].textContent = player;
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => cells[index] === player)
  );
}

function endGame(message) {
  gameActive = false;
  statusText.textContent = message;
}

function resetGame() {
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "";
  createBoard();
}

function aiMove() {
  const emptyIndices = cells.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
  if (emptyIndices.length === 0) return;

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex, "O");

  if (checkWinner("O")) {
    endGame("O wins!");
  } else if (cells.every(cell => cell)) {
    endGame("Draw!");
  } else {
    switchPlayer();
  }
}

// Init
createBoard();
