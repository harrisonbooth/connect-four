import React, { useState } from 'react'
import BoardComponent from '../components/Boards/BoardComponent'
import { useGame } from '../hooks/useGame'
import Game from '../models/Game'
import Player from '../models/Player'
import styled from 'styled-components'
import SetupComponent from '../components/Setup/SetupComponent'
import StyledButton from '../components/StyledComponents/StyledButton'
import StyledHeading from '../components/StyledComponents/StyledHeading'

const GameLayout = styled.main`
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  justify-items: center;
`

const ControlsLayout = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export default function GameContainer() {
  const [settingUp, setSettingUp] = useState(false)
  const {game, takeTurn, resetBoard, initGame} = useGame()

  const handleCellClick = (cellId) => {
    takeTurn(cellId % game.columnCount)
  }

  const handleColumnClick = (column) => {
    takeTurn(column)
  }

  const handleSetupOpen = () => {
    setSettingUp(true)
  }

  const handleSetupSubmit = (gameData) => {
    initGame(gameData)
    setSettingUp(false)
  }

  const handleSetupCancel = () => {
    setSettingUp(false)
  }

  const playerObjects = game.players.map(player => ({...player}))
  const setupForm = (settingUp) ? (
    <SetupComponent
      previousPlayers={playerObjects}
      boardColumns={game.columnCount}
      boardRows={game.rowCount}
      onSetupSubmit={handleSetupSubmit}
      onSetupCancel={handleSetupCancel}
    />
  ) : null

  return (
    <>
      {setupForm}
      <GameLayout>
        <StyledHeading>Connect Four</StyledHeading>
        {/* Add player legend */}
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
        <ControlsLayout>
          <StyledButton fontSize="3rem" onClick={resetBoard}>
            Reset
          </StyledButton>
          <StyledButton fontSize="3rem" onClick={handleSetupOpen}>
            Settings
          </StyledButton>
        </ControlsLayout>
      </GameLayout>
    </>
  )
}



