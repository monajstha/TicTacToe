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

const gameboard = GameBoard();
gameboard.markToken(0, 2, {
  name: "Manoj",
  token: "X",
});
gameboard.printBoard();
