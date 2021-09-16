import React, { useState } from "react"
import styled from "styled-components"
import {StyledFullscreenWrapper, StyledPopup} from "../StyledComponents/StyledPopup"
import StyledHeading from "../StyledComponents/StyledHeading"
import PlayerSetupComponent from "./PlayerSetupComponent"
import StyledButton from "../StyledComponents/StyledButton"

const StyledSetupForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;

  > .input-group {
    display: grid;
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1rem;

    &.spaced {
      margin-top: 15px;
    }

    &.cols-2 {
      grid-template-columns: 1fr 1fr;
    }
  }

  span {
    margin: 0 5px;
  }
`

const randomColour = () => {
  return `#${Math.floor(Math.random()*16777215).toString(16)}`
}

export default function SetupComponent({ onSetupSubmit, onSetupCancel, previousPlayers, boardColumns, boardRows }) {
  const [columns, setColumns] = useState(boardColumns)
  const [rows, setRows] = useState(boardRows)
  const [players, setPlayers] = useState(previousPlayers)

  const handleColumnsChange = (event) => {
    setColumns(event.target.value)
  }

  const handleRowsChange = (event) => {
    setRows(event.target.value)
  }

  const handlePlayerChange= ({id, name, colour}) => {
    setPlayers(
      [
        {id, name, colour},
        ...players.filter(player => player.id !== id)
      ].sort((a, b) => a.id - b.id)
    )
  }

  const handlePlayerDelete = (id) => {
    setPlayers(
      players
        .filter(player => player.id !== id)
        .map((player, i) => ({...player, id: i}))
    )
  }

  const handleNewPlayer = () => {
    setPlayers([...players, {id: players.length, name: `Player ${players.length + 1}`, colour: randomColour()}])
  }

  const handleCancel = () => {
    onSetupCancel()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const gameData = {
      players,
      boardSize: [columns, rows]
    }

    onSetupSubmit(gameData)
  }

  const playerNodes = players.map(player => {
    console.log(player)
    return (
    <PlayerSetupComponent player={player} onPlayerChange={handlePlayerChange} onPlayerDelete={handlePlayerDelete} />
  )})

  return (
    <StyledFullscreenWrapper>
      <StyledPopup>
        <StyledHeading>New Game</StyledHeading>
        <StyledSetupForm>
          <label htmlFor="dimensions">Board size:</label>
          <div className="input-group cols-2" id="dimensions">
            <label htmlFor="board-columns">Columns:</label>
            <input type="number" id="board-columns" name="columns" min="0" value={columns} onChange={handleColumnsChange} />
            <label htmlFor="board-rows">Rows:</label>
            <input type="number" id="board-rows" name="rows" min="0" value={rows} onChange={handleRowsChange} />
          </div>
          <label htmlFor="players">Players:</label>
          <div className="input-group" id="players">
            {playerNodes}
          </div>
          <StyledButton type="button" fontSize="1rem" onClick={handleNewPlayer}>New player</StyledButton>
          <div className="input-group cols-2 spaced">
            <StyledButton fontSize="1rem" onClick={handleCancel} type="button">Cancel</StyledButton>
            <StyledButton fontSize="1rem" onClick={handleSubmit} type="submit">Submit</StyledButton>
          </div>
        </StyledSetupForm>
      </StyledPopup>
    </StyledFullscreenWrapper>
  )
}
