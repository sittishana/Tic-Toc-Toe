const X_CLASS = "x";
const O_CLASS = "o";
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const players = document.getElementById("players");
const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const winningMessageText = document.querySelector("[winning-text");
const restartButton = document.getElementById("restartButton");
const winningMessage = document.getElementById("winningMessage");
const playerTurn = document.querySelector("[player-turn]");
let oTurn;
var audio = new Audio("clapping.mp3");
var audio2 = new Audio("fail.mp3");

const placeMark = (cell, currentClass) => cell.classList.add(currentClass);
const setBoardHoverClass = () => {
  console.log("clicked");
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);

  if (oTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
};
const handleClick = (e) => {
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
    placeTurn();
  }
};
const startGame = () => {
  audio.pause();
  audio.currentTime = 0;
  audio2.pause();
  audio2.currentTime = 0;
  // oTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(O_CLASS);
    cell.classList.remove(X_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });

  setBoardHoverClass();
  winningMessage.classList.remove("show");
};

// const _xx = {
//     s:1,
//     g:3,
//     h:4
// }

// const [x, ...rest] = winning_combinations

// const { s, h } = _xx

// console.log(h)

startGame();

// const cat = () => {

//     const scratch = () => {
//         console.log("Scratch")
//     }

//     const walk = () => {
//         console.log("walking")
//     }

//     return {
//         scratch,
//         walk
//     }
// }

// cat().walk()

restartButton.addEventListener("click", startGame);

const endGame = (draw) => {
  if (draw) {
    winningMessageText.innerText = "Draw!";
    audio2.play();
  } else {
    winningMessageText.innerText = `${oTurn ? " Player 2" : "Player 1"} Wins!`;
    audio.play();
  }

  console.log("winner", oTurn);
  winningMessage.classList.add("show");
};
const isDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
};

const swapTurns = () => (oTurn = !oTurn);

const placeTurn = () => {
  if (oTurn) {
    playerTurn.innerText = "Player 2's Turn";
  } else {
    playerTurn.innerText = "Player 1's Turn";
  }
  playerTurn.classList.add("show");
};

const checkWin = (currentClass) => {
  return winning_combinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
};
