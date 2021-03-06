import { useReducer } from 'react'

export function reducer(game, action) {
  switch (action.type) {
    case "TAKE_TURN":
      if (game.isFinished) {
        return {...game}
      }

      const freeCell = findFreeCellFromColumn(game, action.column)
      if(!freeCell) {
        return {
          ...game,
          error: "INVALID_MOVE"
        }
      }

      const currentPlayer = game.players[game.currentPlayer]

      const claimedCell = {...freeCell, playerId: currentPlayer.id, colour: currentPlayer.colour}

      const newBoard = [
        ...game.board.slice(0, freeCell.id),
        claimedCell,
        ...game.board.slice(freeCell.id + 1)
      ]

      const winningCellIds = checkWinner(newBoard, game.boardSize)
      if(winningCellIds.length) {
        const winningBoard = newBoard.map(cell => {
          return (winningCellIds.includes(cell.id)) ? {...cell, isWinning: true} : cell;
        })

        return {
          ...game,
          board: winningBoard,
          isWon: true,
          isFinished: true,
          error: null
        }
      }

      let nextPlayer = game.currentPlayer + 1
      nextPlayer = (nextPlayer >= game.players.length) ? 0 : nextPlayer

      return {...game, board: newBoard, currentPlayer: nextPlayer, error: null }
    case "RESET":
      return {
        ...game,
        board: generateBoard(game.boardSize),
        currentPlayer: 0,
        isFinished: false,
        isWon: false,
        error: null
      }
    case "NEW":
      return {
        players: action.settings.players,
        board: generateBoard(action.settings.boardSize),
        boardSize: action.settings.boardSize,
        currentPlayer: 0,
        isFinished: false,
        isWon: false,
        error: null
      }
    default:
      return {...game, error: null}
  }
}

export const defaultGame = {
  players: [{name: "Player One", id: 0, colour: "#FF0000"}, {name: "Player Two", id: 1, colour: "#FFF000"}],
  board: [...Array(42)].map((_, i) => ({id: i, playerId: null, colour: "#FFFFFF", isWinning: false})),
  boardSize: {
    columns: 7,
    rows: 6
  },
  currentPlayer: 0,
  isFinished: false,
  isWon: false,
  error: null
}

function findFreeCellFromColumn(game, column) {
  return game.board
    .filter(cell => cell.id % game.boardSize.columns === column && cell.playerId === null)
    .sort((a, b) => b.id - a.id)[0];
}

function generateBoard({columns, rows}) {
  return [...Array(columns * rows)].map((_, i) => ({id: i, playerId: null, colour: "#FFFFFF", isWinning: false}))
}

function checkLine(a, b, c, d) {
  return (!([a, b, c, d].map(cell => cell.playerId).includes(null)) && (a.playerId === b.playerId && b.playerId === c.playerId && c.playerId === d.playerId));
}

function makeBoardMatrix(board, columns) {
  const boardMatrix = []
  const newBoard = [...board]
  while (newBoard.length) {
    boardMatrix.push(newBoard.splice(0, columns))
  }
  return boardMatrix
}

function checkWinner(board, boardSize) {
  const boardMatrix = makeBoardMatrix(board, boardSize.columns)
  // Vertical
  for (let row = 0; row < boardSize.rows - 3; row++) {
    for (let column = 0; column < boardSize.columns; column++) {
      const cells = [boardMatrix[row][column], boardMatrix[row + 1][column], boardMatrix[row + 2][column], boardMatrix[row + 3][column]]
      if (checkLine(...cells)) {
        return cells.map(cell => cell.id)
      }
    }
  }

  // Horizontal
  for (let row = 0; row < boardSize.rows; row++) {
    for (let column = 0; column < boardSize.columns - 3; column++) {
      const cells = [boardMatrix[row][column], boardMatrix[row][column + 1], boardMatrix[row][column + 2], boardMatrix[row][column + 3]]
      if (checkLine(...cells)) {
        return cells.map(cell => cell.id)
      }
    }
  }

  // Descending
  for (let row = 0; row < boardSize.rows - 3; row++) {
    for (let column = 0; column < boardSize.columns - 3; column++) {
      const cells = [boardMatrix[row][column], boardMatrix[row + 1][column + 1], boardMatrix[row + 2][column + 2], boardMatrix[row + 3][column + 3]]
      if (checkLine(...cells)) {
        return cells.map(cell => cell.id)
      }
    }
  }

  // Ascending
  for (let row = 3; row < boardSize.rows; row++) {
    for (let column = 0; column < boardSize.columns - 3; column++) {
      const cells = [boardMatrix[row][column], boardMatrix[row - 1][column + 1], boardMatrix[row - 2][column + 2], boardMatrix[row - 3][column + 3]]
      if (checkLine(...cells))
        return cells.map(cell => cell.id);
    }
  }

  return []
}

export function useGame() {
  const [game, dispatch] = useReducer(reducer, defaultGame)

  const resetBoard = () => {
    dispatch({ type: "RESET" })
  }

  const takeTurn = (column) => {
    dispatch({ type: "TAKE_TURN", column })
  }

  const initGame = (settings) => {
    dispatch({ type: "NEW", settings })
  }

  return {game, takeTurn, resetBoard, initGame}
}
