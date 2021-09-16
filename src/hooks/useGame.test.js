import { reducer, defaultGame } from "./useGame"

const runActions = (game, actions) => {
  return actions.reduce(reducer, game)
}

describe("useGame reducer", () => {
  test("TAKE_TURN action with column 0 places correct token", () => {
    const finalGame = runActions(defaultGame, [{type: "TAKE_TURN", column: 0}])
    const claimedCell = finalGame.board[35]
    expect(claimedCell).toStrictEqual({
      id: 35,
      playerId: 0,
      isWinning: false,
      colour: "#FF0000"
    })
  })

  test("2 TAKE_TURN actions with column 0 places correct tokens", () => {
    const finalGame = runActions(defaultGame, [
      {type: "TAKE_TURN", column: 0},
      {type: "TAKE_TURN", column: 0}
    ])

    const claimedCell35 = finalGame.board[35]
    const claimedCell28 = finalGame.board[28]

    expect(claimedCell35).toStrictEqual({
      id: 35,
      playerId: 0,
      isWinning: false,
      colour: "#FF0000"
    })

    expect(claimedCell28).toStrictEqual({
      id: 28,
      playerId: 1,
      isWinning: false,
      colour: "#FFF000"
    })
  })

  test("3 TAKE_TURN actions with column 0 places correct tokens", () => {
    const finalGame = runActions(defaultGame, [
      {type: "TAKE_TURN", column: 0},
      {type: "TAKE_TURN", column: 0},
      {type: "TAKE_TURN", column: 0}
    ])

    const claimedCell35 = finalGame.board[35]
    const claimedCell28 = finalGame.board[28]
    const claimedCell21 = finalGame.board[21]

    expect(claimedCell35).toStrictEqual({
      id: 35,
      playerId: 0,
      isWinning: false,
      colour: "#FF0000"
    })

    expect(claimedCell28).toStrictEqual({
      id: 28,
      playerId: 1,
      isWinning: false,
      colour: "#FFF000"
    })

    expect(claimedCell21).toStrictEqual({
      id: 21,
      playerId: 0,
      isWinning: false,
      colour: "#FF0000"
    })
  })

  test("4 TAKE_TURN actions with column 0 places correct tokens and wins game", () => {
    const {board, isFinished, isWon} = runActions(defaultGame, [
      {type: "TAKE_TURN", column: 0},
      {type: "TAKE_TURN", column: 1},
      {type: "TAKE_TURN", column: 0},
      {type: "TAKE_TURN", column: 1},
      {type: "TAKE_TURN", column: 0},
      {type: "TAKE_TURN", column: 1},
      {type: "TAKE_TURN", column: 0}
    ])

    const winningCells = [board[35], board[28], board[21], board[14]]

    expect(winningCells.every(cell => cell.playerId === 0)).toBe(true)
    expect(isWon).toBe(true)
    expect(isFinished).toBe(true)
    expect(winningCells.every(cell => cell.isWinning)).toBe(true)
  })

  test("RESET action cleans board", () => {
    const {board} = runActions(defaultGame, [
      {type: "TAKE_TURN", column: 0},
      {type: "RESET"}
    ])

    expect(board[35].playerId).toBe(null)
    expect(board.length).toBe(42)
  })
})
