import React, { useEffect, useState } from "react"
import styled from "styled-components"
import StyledButton from "../StyledComponents/StyledButton"

const StyledPlayerSetup = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
`

export default function PlayerSetupComponent({ player, onPlayerChange, onPlayerDelete }) {
  const [name, setName] = useState(player.name)
  const [colour, setColour] = useState(player.colour)

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleColourChange = (event) => {
    setColour(event.target.value)
  }

  const handleDeleteClick = () => {
    onPlayerDelete(player.id)
  }

  useEffect(() => {
    setName(player.name)
    setColour(player.colour)
  }, [player])

  useEffect(() => {
    onPlayerChange({
      id: player.id,
      name,
      colour
    })
  }, [name, colour])

  return (
    <StyledPlayerSetup>
      <input type="text" name="" value={name} onChange={handleNameChange}  />
      <input type="color" name="" value={colour} onChange={handleColourChange} />
      <StyledButton onClick={handleDeleteClick} type="button" fontSize="1rem">X</StyledButton>
    </StyledPlayerSetup>
  )
}
