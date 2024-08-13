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
    console.log("inside mark token", board, row, column, player);
    if (board[row][column].getValue() !== "") {
      alert("Please select an empty box!");
    } else {
      // console.log({ row, column, player });
      board[row][column].addToken(player);
      // console.log(board[row][column].getValue());
    }
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
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

function GameController(playerOneName = "Ram", playerTwoName = "Sita") {
  const board = GameBoard();
  const { rows, columns } = board.getRowsAndColumns();
  const boardArr = board.getBoard();
  console.log("hmmm", boardArr, board.getBoard());

  const players = [
    {
      name: playerOneName,
      token: "O",
    },
    {
      name: playerTwoName,
      token: "X",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  //   Update the board after player's input
  const printNewRound = () => {
    board.printBoard();
    // console.log(`${getActivePlayer()?.name}'s Turn!`);
  };

  const getResult = () => {
    // Get the values from the board
    let resultText = "";
    let boardValues = [];
    boardArr.forEach((row, rowIndex) => {
      boardValues[rowIndex] = [];
      row.forEach((cell, cellIndex) => {
        boardValues[rowIndex].push(cell.getValue());
      });
    });
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
        resultText = `${activePlayer.name} won by row!`;

        console.log(`${activePlayer.name} won by row!`);
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
        resultText = `${activePlayer.name} won by column!`;
        console.log(`${activePlayer.name} won by column!`);
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
      resultText = `${activePlayer.name} won by diagonal Top Left to Bottom Right!`;
      console.log(
        `${activePlayer.name} won by diagonal Top Left to Bottom Right!`
      );
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
      resultText = `${activePlayer.name} won by diagonal Top Right to Bottom Left!`;
      console.log(
        `${activePlayer.name} won by diagonal Top Right to Bottom Left!`
      );
    }
    return resultText;
  };

  const playRound = (row, column) => {
    console.log(`Marking into ${row} ${column}`);
    board.markToken(row, column, getActivePlayer().token);

    // const checkResult = () => {
    //   // for checking rows
    //   for (let i = 0; i < rows; i++) {
    //     const firstToken = boardArr.getValue();
    //     const secondToken = boardArr[i][1];
    //     const thirdToken = boardArr[i][2];
    //     console.log(
    //       "checking by row!",
    //       boardArr,
    //       firstToken,
    //       secondToken,
    //       thirdToken
    //     );
    //     if (
    //       firstToken != "" &&
    //       firstToken === secondToken &&
    //       secondToken === thirdToken
    //     ) {
    //       console.log("Win by row!");
    //     }
    //   }

    //   // for checking columns
    //   for (let j = 0; j < columns; j++) {
    //     const firstToken = boardArr[0][j];
    //     const secondToken = boardArr[1][j];
    //     const thirdToken = boardArr[2][j];
    //     if (
    //       firstToken != "" &&
    //       firstToken === secondToken &&
    //       secondToken === thirdToken
    //     ) {
    //       console.log("Win by column!");
    //     }
    //   }

    //   // for checking top-left to bottom-right diagonal (DLR - Diagonal Left to Right)
    //   const firstTokenDLR = boardArr[0][0];
    //   const secondTokenDLR = boardArr[1][1];
    //   const thirdTokenDLR = boardArr[2][2];
    //   if (
    //     firstTokenDLR != "" &&
    //     firstTokenDLR === secondTokenDLR &&
    //     secondTokenDLR === thirdTokenDLR
    //   ) {
    //     console.log("Win by diagonal Top Left to Bottom Right!");
    //   }

    //   // for checking top-left to bottom-right diagonal (RLD -  Right to Left Diagonal)
    //   const firstTokenRLD = boardArr[0][2];
    //   const secondTokenRLD = boardArr[1][1];
    //   const thirdTokenRLD = boardArr[2][0];
    //   if (
    //     firstTokenRLD != "" &&
    //     firstTokenRLD === secondTokenRLD &&
    //     secondTokenRLD === thirdTokenRLD
    //   ) {
    //     console.log("Win by diagonal Top Right to Bottom Left!");
    //   }
    // };

    const result = getResult();
    console.log("result inside playRound", result);
    if (!result) {
      switchPlayerTurn();
      printNewRound();
    }
  };
  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    getResult,
  };
}

function ScreenController() {
  const game = GameController();

  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = () => {
    boardDiv.textContent = "";
    const result = game.getResult();
    console.log("result inside screen controller", result);
    const activePlayer = game.getActivePlayer();

    if (result) {
      // Display winner
      playerTurnDiv.textContent = result;
    } else {
      // Display player's turn
      playerTurnDiv.textContent = `${activePlayer?.name}'s turn`;
    }

    // Render Board Squares
    const board = game.getBoard();
    board.forEach((row, rowIndex) =>
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;
        cellButton.textContent = cell?.getValue();
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
    updateScreen();
  }

  boardDiv.addEventListener("click", clickHandlerBoard);

  // initial render
  updateScreen();
}

ScreenController();
