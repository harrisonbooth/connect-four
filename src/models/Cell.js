class Cell {
  constructor(id) {
    this.id = id
    this.winning = false
    this.player = null
  }

  claim(player) {
    this.player = player
  }

  setWinning() {
    this.winning = true
  }
}

export default Cell
