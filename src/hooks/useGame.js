import { useReducer } from 'react'
import Game from '../models/Game'
import Player from '../models/Player'

function reducer(game, action) {
  switch (action.type) {
    case "TAKE_TURN":
      const { success } = game.takeTurn(action.column)
      if (!success) {
        alert("Invalid move.")
      }
      return game.clone()
    case "RESET":
      game.cleanBoard()
      return game.clone()
    case "INIT":
      const gameData = action.game
      const players = gameData.players.map(({id, name, colour}) => new Player(id, name, colour))
      const initGame = new Game(players, gameData.boardSize)
      initGame.cleanBoard()
      return initGame.clone()
    default:
      return game.clone()
  }
}

export function useGame(initialGame) {
  const [game, dispatch] = useReducer(reducer, initialGame)

  const resetBoard = () => {
    dispatch({ type: "RESET" })
  }

  const takeTurn = (column) => {
    dispatch({ type: "TAKE_TURN", column })
  }

  const initGame = (game) => {
    dispatch({ type: "INIT", game })
  }

  return [game, takeTurn, resetBoard, initGame]
}
