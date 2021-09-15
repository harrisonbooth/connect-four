import Cell from "./Cell"

class Game {
  constructor(players, boardSize = [7, 6], board = [], currentPlayer = players[0]) {
    this.players = players
    this.board = board
    this.boardSize = boardSize
    this.currentPlayer = currentPlayer
  }

  get columnCount() {
    return this.boardSize[0]
  }

  get rowCount() {
    return this.boardSize[1]
  }

  chooseColumn(columnNumber) {
    const target = this.board
      .filter(cell => cell.id % this.columnCount === columnNumber && !cell.player)
      .sort((a, b) => b.id - a.id)[0]
    if (!target) {
      return false
    }
    target.claim(this.currentPlayer)
    return true
  }

  takeTurn(column) {
    const success = this.chooseColumn(column)
    if (!success) {
      return {
        win: false,
        player: this.currentPlayer,
        board: this.board,
        success: false
      }
    }
    const winningCellIds = this.checkWinner()
    if (winningCellIds.length) {
      this.board.filter(cell => winningCellIds.includes(cell.id)).forEach(cell => cell.setWinning())
      return {
        win: true,
        player: this.currentPlayer,
        board: this.board,
        success: true
      }
    }
    this.cyclePlayer()
    return {
      win: false,
      player: this.currentPlayer,
      board: this.board,
      success: true
    }
  }

  cyclePlayer() {
    this.players.unshift(this.players.pop())
    this.currentPlayer = this.players[0]
  }

  claimCell(targetId) {
    this.board.filter(({ id }) => id === targetId)[0].claim()
  }

  boardMatrix() {
    const boardMatrix = []
    const board = [...this.board]
    while (board.length) {
      boardMatrix.push(board.splice(0, this.columnCount))
    }
    return boardMatrix
  }

  checkLine(a, b, c, d) {
    return (!([a, b, c, d].map(cell => cell.player).includes(null)) && (a.player.id === b.player.id && b.player.id === c.player.id && c.player.id === d.player.id));
  }

  checkWinner() {
    const boardMatrix = this.boardMatrix()
    // Vertical
    for (let row = 0; row < this.rowCount - 3; row++) {
      for (let column = 0; column < this.columnCount; column++) {
        const cells = [boardMatrix[row][column], boardMatrix[row + 1][column], boardMatrix[row + 2][column], boardMatrix[row + 3][column]]
        if (this.checkLine(...cells)) {
          return cells.map(cell => cell.id)
        }
      }
    }

    // Horizontal
    for (let row = 0; row < this.rowCount; row++) {
      for (let column = 0; column < this.columnCount - 3; column++) {
        const cells = [boardMatrix[row][column], boardMatrix[row][column + 1], boardMatrix[row][column + 2], boardMatrix[row][column + 3]]
        if (this.checkLine(...cells)) {
          return cells.map(cell => cell.id)
        }
      }
    }

    // Descending
    for (let row = 0; row < this.rowCount - 3; row++) {
      for (let column = 0; column < this.columnCount - 3; column++) {
        const cells = [boardMatrix[row][column], boardMatrix[row + 1][column + 1], boardMatrix[row + 2][column + 2], boardMatrix[row + 3][column + 3]]
        if (this.checkLine(...cells)) {
          return cells.map(cell => cell.id)
        }
      }
    }

    // Ascending
    for (let row = 3; row < this.rowCount; row++) {
      for (let column = 0; column < this.columnCount - 3; column++) {
        const cells = [boardMatrix[row][column], boardMatrix[row - 1][column + 1], boardMatrix[row - 2][column + 2], boardMatrix[row - 3][column + 3]]
        if (this.checkLine(...cells))
          return cells.map(cell => cell.id);
      }
    }

    return []
  }

  clone() {
    return new Game(this.players, this.boardSize, this.board, this.currentPlayer)
  }

  static newGame(players) {
    const board = []
    for (let i = 0; i < 42; i++) {
      const cell = new Cell(i);
      board.push(cell)
    }
    return new Game(players, [7, 6], board)
  }

  cleanBoard() {
    this.board = []
    for (let i = 0; i < this.columnCount * this.rowCount; i++) {
      const cell = new Cell(i);
      this.board.push(cell)
    }
  }
}

export default Game
