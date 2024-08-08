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
    rows, columns;
  };
  const getBoard = () => board;

  const markToken = (row, column, player) => {
    if (board[row][column].getValue() !== "") {
      alert("Please select an empty box!");
    } else {
      console.log({ row, column, player });
      board[row][column].addToken(player);
      console.log(board[row][column].getValue());
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
    console.log({ player });
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
    activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  //   Update the board after player's input
  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer()?.name}'s Turn!`);
  };

  const playRound = (row, column) => {
    console.log(`Marking into ${row} ${column}`);
    board.markToken(row, column, getActivePlayer().token);

    const checkResult = () => {
      // for checking rows
      for (let i = 0; i < row; i++) {
        const firstToken = board[i][0];
        const secondToken = board[i][1];
        const thirdToken = board[i][2];
        if (
          firstToken != "" &&
          firstToken === secondToken &&
          secondToken === thirdToken
        ) {
          console.log("Win by row!");
        }
      }

      // for checking columns
      for (let j = 0; j < columns; j++) {
        const firstToken = board[0][j];
        const secondToken = board[1][j];
        const thirdToken = board[2][j];
        if (
          firstToken != "" &&
          firstToken === secondToken &&
          secondToken === thirdToken
        ) {
          console.log("Win by column!");
        }
      }

      // for checking top-left to bottom-right diagonal (DLR - Diagonal Left to Right)
      const firstTokenDLR = board[0][0];
      const secondTokenDLR = board[1][1];
      const thirdTokenDLR = board[2][2];
      if (
        firstTokenDLR != "" &&
        firstTokenDLR === secondTokenDLR &&
        secondTokenDLR === thirdTokenDLR
      ) {
        console.log("Win by diagonal Top Left to Bottom Right!");
      }

      // for checking top-left to bottom-right diagonal (RLD -  Right to Left Diagonal)
      const firstTokenRLD = board[0][2];
      const secondTokenRLD = board[1][1];
      const thirdTokenRLD = board[2][0];
      if (
        firstTokenRLD != "" &&
        firstTokenRLD === secondTokenRLD &&
        secondTokenRLD === thirdTokenRLD
      ) {
        console.log("Win by diagonal Top Right to Bottom Left!");
      }
    };

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (board[i][j].getValue() !== "") {
          checkResult();
        } else {
          switchPlayerTurn();
          printNewRound();
        }
      }
    }

    printNewRound();
  };
  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}

const gameboard = GameBoard();
gameboard.markToken(0, 2, {
  name: "Manoj",
  token: "X",
});
gameboard.printBoard();
