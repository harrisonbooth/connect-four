import Game from '../Game'
import Player from '../Player'
import Cell from '../Cell'

describe('Game', () => {
  let game
  let players
  beforeEach(() => {
    players = [new Player(0, "Harrison", "red"), new Player(1, "Scott", "yellow")]
    game = Game.newGame(players)
  })

  test('New game gives standard board', () => {
    expect(game.board.length).toBe(42)
  })

  test('Choose column places cells correctly', () => {
    game.chooseColumn(0)
    game.chooseColumn(0)
    expect(game.board[28].player.id).toBe(0)
    expect(game.board[35].player.id).toBe(0)
  })

  test('Playing turn cycles players and places token', () => {
    const turn1 = game.takeTurn(0)
    expect(turn1.win).toBe(false)
    expect(game.currentPlayer.id).toBe(1)
    expect(game.board[35].player.id).toBe(0)
  })

  test('Playing turn cycles players and places correct tokens', () => {
    const turn1 = game.takeTurn(0)
    const turn2 = game.takeTurn(1)
    expect(turn1.win).toBe(false)
    expect(turn2.win).toBe(false)
    expect(game.board[35].player.id).toBe(0)
    expect(game.board[36].player.id).toBe(1)
  })

  test('Detects win, vertical', () => {
    game.chooseColumn(0)
    game.chooseColumn(0)
    game.chooseColumn(0)
    game.chooseColumn(0)
    expect(game.checkWinner()).toStrictEqual([14, 21, 28, 35])
  })

  test('Detects win, horizontal', () => {
    game.chooseColumn(0)
    game.chooseColumn(1)
    game.chooseColumn(2)
    game.chooseColumn(3)
    expect(game.checkWinner()).toStrictEqual([35, 36, 37, 38])
  })

  test('Detects win, ascending', () => {
    game.chooseColumn(0)
    game.cyclePlayer()
    game.chooseColumn(1)
    game.cyclePlayer()
    game.chooseColumn(1)
    game.cyclePlayer()
    game.chooseColumn(2)
    game.chooseColumn(2)
    game.cyclePlayer()
    game.chooseColumn(2)
    game.cyclePlayer()
    game.chooseColumn(3)
    game.chooseColumn(3)
    game.chooseColumn(3)
    game.cyclePlayer()
    game.chooseColumn(3)
    expect(game.checkWinner()).toStrictEqual([35, 29, 23, 17])
  })

  test('Detects win, descending', () => {
    game.chooseColumn(3)
    game.cyclePlayer()
    game.chooseColumn(2)
    game.cyclePlayer()
    game.chooseColumn(2)
    game.cyclePlayer()
    game.chooseColumn(1)
    game.chooseColumn(1)
    game.cyclePlayer()
    game.chooseColumn(1)
    game.cyclePlayer()
    game.chooseColumn(0)
    game.chooseColumn(0)
    game.chooseColumn(0)
    game.cyclePlayer()
    game.chooseColumn(0)
    expect(game.checkWinner()).toStrictEqual([14, 22, 30, 38])
  })

  test('takeTurn returns correct results', () => {
    game.chooseColumn(0)
    game.chooseColumn(0)
    game.chooseColumn(0)
    const turn = game.takeTurn(0)
    expect(turn.win).toBe(true)
    expect(turn.player.id).toBe(0)
    expect(turn.board).toStrictEqual(game.board)
  })

  test('works on non-standard board', () => {
    const largeGame = new Game(players, [10, 8])
    largeGame.cleanBoard()
    expect(largeGame.board.length).toBe(80)
    largeGame.chooseColumn(4)
    largeGame.cyclePlayer()
    largeGame.chooseColumn(5)
    largeGame.cyclePlayer()
    largeGame.chooseColumn(5)
    largeGame.cyclePlayer()
    largeGame.chooseColumn(6)
    largeGame.chooseColumn(6)
    largeGame.cyclePlayer()
    largeGame.chooseColumn(6)
    largeGame.cyclePlayer()
    largeGame.chooseColumn(7)
    largeGame.chooseColumn(7)
    largeGame.chooseColumn(7)
    largeGame.cyclePlayer()
    largeGame.chooseColumn(7)
    expect(largeGame.checkWinner()).toStrictEqual([74, 65, 56, 47])
  })
})
