function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getRowsAndColumns = () => {
    return {
      rows,
      columns,
    };
  };
  const getBoard = () => board;

  const markToken = (row, column, player) => {
    // console.log("inside mark token", board, row, column, player);
    if (board[row][column].getValue() !== "") {
      alert("Please select an empty box!");
    } else {
      board[row][column].addToken(player);
    }
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    // console.log(boardWithCellValues);
  };

  return {
    getBoard,
    markToken,
    printBoard,
    getRowsAndColumns,
  };
}

function Cell() {
  let value = "";

  const addToken = (player) => {
    // console.log({ player });
    value = player;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

function GameController(players) {
  const board = GameBoard();
  const { rows, columns } = board.getRowsAndColumns();
  const boardArr = board.getBoard();
  // console.log("hmmm", boardArr, board.getBoard());

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const increasePlayerScore = (playerName) => {
    players.forEach((player) => {
      if (player.name === playerName) {
        player.score++;
      }
    });
  };

  const getPlayersInfo = () => players;

  const getActivePlayer = () => activePlayer;

  //   Update the board after player's input
  const printNewRound = () => {
    board.printBoard();
    // console.log(`${getActivePlayer()?.name}'s Turn!`);
  };

  const getResult = () => {
    // Get the values from the board
    let boardValues = [];
    boardArr.forEach((row, rowIndex) => {
      boardValues[rowIndex] = [];
      row.forEach((cell, cellIndex) => {
        boardValues[rowIndex].push(cell.getValue());
      });
    });
    // console.log({ boardValues });
    // for checking rows
    for (let i = 0; i < rows; i++) {
      const firstToken = boardValues[i][0];
      const secondToken = boardValues[i][1];
      const thirdToken = boardValues[i][2];
      if (
        firstToken != "" &&
        firstToken === secondToken &&
        secondToken === thirdToken
      ) {
        // console.log(`${activePlayer.name} won by row!`);
        return `${activePlayer.name} won!`;
      }
    }

    // for checking columns
    for (let j = 0; j < columns; j++) {
      const firstToken = boardValues[0][j];
      const secondToken = boardValues[1][j];
      const thirdToken = boardValues[2][j];
      if (
        firstToken != "" &&
        firstToken === secondToken &&
        secondToken === thirdToken
      ) {
        // console.log(`${activePlayer.name} won by column!`);
        return `${activePlayer.name} won!`;
      }
    }

    // for checking top-left to bottom-right diagonal (DLR - Diagonal Left to Right)
    const firstTokenDLR = boardValues[0][0];
    const secondTokenDLR = boardValues[1][1];
    const thirdTokenDLR = boardValues[2][2];
    if (
      firstTokenDLR != "" &&
      firstTokenDLR === secondTokenDLR &&
      secondTokenDLR === thirdTokenDLR
    ) {
      // console.log(
      //   `${activePlayer.name} won by diagonal Top Left to Bottom Right!`
      // );
      return `${activePlayer.name} won!`;
    }

    // for checking top-left to bottom-right diagonal (RLD -  Right to Left Diagonal)
    const firstTokenRLD = boardValues[0][2];
    const secondTokenRLD = boardValues[1][1];
    const thirdTokenRLD = boardValues[2][0];
    if (
      firstTokenRLD != "" &&
      firstTokenRLD === secondTokenRLD &&
      secondTokenRLD === thirdTokenRLD
    ) {
      // console.log(
      //   `${activePlayer.name} won by diagonal Top Right to Bottom Left!`
      // );
      return `${activePlayer.name} won!`;
    }

    // checking for draw
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const cellValue = boardValues[i][j];
        if (cellValue === "") return undefined;
      }
    }
    return "It's a draw!";
  };

  const playRound = (row, column) => {
    board.markToken(row, column, getActivePlayer().token);

    const result = getResult();
    if (!result) {
      switchPlayerTurn();
      printNewRound();
    }
  };

  console.log("Active Player", activePlayer);

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    getResult,
    increasePlayerScore,
    getPlayersInfo,
  };
}

function ScreenController() {
  let currentRound = 0;
  const numOfRounds = 3;

  // const playerOneName =
  //   prompt(`Please enter first player's name`) || "Player 1";
  // const playerTwoName =
  //   prompt(`Please enter second player's name`) || "Player 2";

  const players = [
    {
      name: "Ram",
      token: "O",
      score: 0,
    },
    {
      name: "Sita",
      token: "X",
      score: 0,
    },
  ];

  const introContainerDiv = document.querySelector(".introContainer");

  const replayDiv = document.querySelector(".replayDiv");
  const replayButton = document.createElement("button");
  const boardDiv = document.querySelector(".board");
  const playerTurnDiv = document.querySelector(".turn");

  // initialize the game
  let game = GameController(players);

  const updatePlayerInfo = () => {
    // Display player's name and initial score
    const playerInfoDiv = document.querySelector(".playersInfo");
    const player1 = document.createElement("h4");
    const player2 = document.createElement("h4");
    const currentPlayers = game.getPlayersInfo();
    player1.textContent = `${currentPlayers[0].name}'s Score: ${currentPlayers[0].score}`;
    player2.textContent = `${currentPlayers[1].name}'s Score: ${currentPlayers[1].score}`;
    playerInfoDiv.textContent = "";
    playerInfoDiv.append(player1, player2);
  };

  updatePlayerInfo();

  const updateScreen = () => {
    console.log("Clearing the board...");
    boardDiv.textContent = "";
    introContainerDiv.textContent = "";
    const result = game.getResult();
    console.log({ result });
    let activePlayer = game.getActivePlayer();

    console.log({ activePlayer });
    if (result) {
      // console.log({ currentRound });
      currentRound++;
      if (result !== `It's a draw!`) {
        game.increasePlayerScore(activePlayer.name);
      }
      // Update the player's score after result
      updatePlayerInfo();

      if (currentRound < numOfRounds) {
        console.log("Game Reset...");
        resetBoard();
      } else {
        console.log("3 rounds completed");
        const currentPlayers = game.getPlayersInfo();

        const player1 = currentPlayers[0];
        const player2 = currentPlayers[1];
        // Display winner
        if (player1.score > player2.score) {
          playerTurnDiv.textContent = `${player1.name} Won!`;
        } else if (player2.score > player1.score) {
          playerTurnDiv.textContent = `${player2.name} Won!`;
        } else {
          playerTurnDiv.textContent = `It's a draw!`;
        }
        replayDiv.textContent = "Would you like to replay the game?";

        replayButton.className = "replayBtn";
        replayButton.textContent = "Replay";
        replayDiv.appendChild(replayButton);
      }
    } else {
      // Display player's turn
      console.log("whose turn?");
      playerTurnDiv.textContent = `${activePlayer?.name}'s turn`;
    }
    console.log("line 281");

    renderBoard();
  };

  const renderBoard = () => {
    // Render Board Squares
    const board = game.getBoard();
    console.log({ board });
    board.forEach((row, rowIndex) =>
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;
        cellButton.textContent = cell?.getValue();
        cellButton.style.fontWeight = "medium";
        cellButton.style.fontSize = "4em";
        boardDiv.appendChild(cellButton);
      })
    );
  };

  function clickHandlerBoard(e) {
    const result = game.getResult();
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;
    if (!selectedColumn || !selectedRow || result) return;
    game.playRound(selectedRow, selectedColumn);
    console.log("handlerr");
    updateScreen();
  }

  function replay() {
    // empty reply div
    replayDiv.textContent = "";
    playGame();
  }

  function resetBoard() {
    game = GameController(players);
    updateScreen();
  }

  replayButton.addEventListener("click", () => {
    replay();
  });

  boardDiv.addEventListener("click", clickHandlerBoard);
  // initial render
  updateScreen();
}

function playGame() {
  ScreenController();
}
