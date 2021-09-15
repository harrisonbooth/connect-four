import Game from '../models/Game'
import Player from '../models/Player'
import { useReducer } from 'react'

function reducer(game, action) {
  switch (action.type) {
    case "TAKE_TURN":
      const { success } = game.takeTurn(action.column)
      if (!success) {
        throw new Error("Cannot make that move.")
      }
      return game.clone()
    case "RESET":
      game.cleanBoard()
      return game.clone()
    case "INIT":
      const initGame = action.game
      initGame.cleanBoard()
      return initGame.clone()
    default:
      return game.clone()
  }
}

export function useGame() {
  const [game, dispatch] = useReducer(reducer, null)

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
