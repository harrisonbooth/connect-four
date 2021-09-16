class Cell {
  constructor(id) {
    this.id = id
    this.winning = false
    this.player = null
  }

  claim(player) {
    console.log("cell", this.id, "claimed by", player.colour)
    this.player = player
  }

  setWinning() {
    this.winning = true
  }
}

export default Cell
