import React, { useEffect } from 'react'
import PlayableBoardComponent from '../components/Boards/PlayableBoardComponent'
import { useGame } from '../hooks/useGame'
import Game from '../models/Game'
import Player from '../models/Player'

export default function GameContainer() {
  const [game, takeTurn, resetBoard, initGame] = useGame(null)

  useEffect(() => {
    const players = [new Player(0, "Harrison", "red"), new Player(0, "Scott", "yellow")]
    const game = new Game(players, [7, 6])

    initGame(game)
  }, [])

  if (!game) return null

  return (
    <PlayableBoardComponent board={game.board} rows={game.rowCount} columns={game.columnCount} height={80} />
  )
}



