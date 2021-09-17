import React, { useEffect, useState } from 'react'
import BoardComponent from '../components/Boards/BoardComponent'
import { useGame } from '../hooks/useGame'
import styled from 'styled-components'
import SetupComponent from '../components/Setup/SetupComponent'
import StyledButton from '../components/StyledComponents/StyledButton'
import StyledHeading from '../components/StyledComponents/StyledHeading'

const GameLayout = styled.main`
  position: relative;
  z-index: 10000;
  display: grid;
  grid-template-rows: 1fr auto;
  justify-items: center;
`

const GameHeading = styled(StyledHeading)`
  font-size: 4rem;
  color: #999;
  margin: 0;
`

const ControlsLayout = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export default function GameContainer() {
  const [settingUp, setSettingUp] = useState(false)
  const {game, takeTurn, resetBoard, initGame} = useGame()
  const [boardError, setBoardError] = useState(false)

  useEffect(() => {
    if (game.error === "INVALID_MOVE") {
      setBoardError(true)
    }
  }, [game])

  const handleErrorAnimationEnd = () => {
    setBoardError(false)
  }

  const handleCellClick = (cellId) => {
    try {
      takeTurn(cellId % game.boardSize.columns)
    } catch (error) {
      alert(error)
    }
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

  const boardMessage = (game.isWon) ? `${game.players[game.currentPlayer].name} has won!` : null

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
      <GameHeading>Connect Four</GameHeading>
      <GameLayout>
        {/* Add player legend */}
        <BoardComponent
          handleCellClick={handleCellClick}
          handleColumnClick={handleColumnClick}
          currentPlayer={game.players[game.currentPlayer]}
          board={[...game.board]}
          rows={game.boardSize.rows}
          columns={game.boardSize.columns}
          maxHeight={80}
          playable={!game.isFinished}
          boardError={boardError}
          onErrorAnimationEnd={handleErrorAnimationEnd}
          message={boardMessage}
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



