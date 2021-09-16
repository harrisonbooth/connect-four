import React, { useState } from 'react'
import BoardComponent from '../components/Boards/BoardComponent'
import { useGame } from '../hooks/useGame'
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
    takeTurn(cellId % game.boardSize.columns)
  }

  const handleColumnClick = (column) => {
    takeTurn(column)
  }

  const handleSetupOpen = () => {
    setSettingUp(true)
  }

  const handleSetupSubmit = (settings) => {
    initGame(settings)
    setSettingUp(false)
  }

  const handleSetupCancel = () => {
    setSettingUp(false)
  }

  const setupForm = (settingUp) ? (
    <SetupComponent
      previousPlayers={game.players}
      boardColumns={game.boardSize.columns}
      boardRows={game.boardSize.rows}
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
          currentPlayer={game.players[game.currentPlayer]}
          board={[...game.board]}
          rows={game.boardSize.rows}
          columns={game.boardSize.columns}
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



