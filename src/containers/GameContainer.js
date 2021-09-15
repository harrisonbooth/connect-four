import React, { useEffect } from 'react'
import BoardComponent from '../components/Boards/BoardComponent'
import { useGame } from '../hooks/useGame'
import Game from '../models/Game'
import Player from '../models/Player'
import styled from 'styled-components'

const GameLayout = styled.main`
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  justify-items: center;
`

export default function GameContainer() {
  const [game, takeTurn, resetBoard, initGame] = useGame(null)

  useEffect(() => {
    const players = [new Player(0, "Harrison", "red"), new Player(1, "Scott", "yellow")]
    const game = new Game(players, [7, 6])

    initGame(game)
  }, [])

  const handleCellClick = (cellId) => {
    takeTurn(cellId % game.columnCount)
  }

  const handleColumnClick = (column) => {
    takeTurn(column)
  }

  if (!game) return null

  return (
    <GameLayout>
      <h1>Header</h1>
      <BoardComponent
        handleCellClick={handleCellClick}
        handleColumnClick={handleColumnClick}
        currentPlayer={game.currentPlayer}
        board={[...game.board]}
        rows={game.rowCount}
        columns={game.columnCount}
        maxHeight={80}
        playable
      />
      <h1>Footer</h1>
    </GameLayout>
  )
}



