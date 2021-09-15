import React from "react"
import styled from "styled-components"

const StyledColumnControl = styled.div`
  color: ${props => (props.isHighlighted) ? props.playerColour : "#666"};
  font-weight: bold;
  font-size: 3rem;
  cursor: pointer;
  text-align: center;
`

export default function ColumnControlComponent({ number, onColumnMouseEnter, onColumnMouseLeave, isHighlighted, currentPlayer, onColumnClick }) {
  const handleMouseEnter = () => {
    onColumnMouseEnter(number)
  }

  const handleMouseLeave = () => {
    onColumnMouseLeave()
  }

  const handleClick = () => {
    onColumnClick(number)
  }

  return (
    <StyledColumnControl
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      isHighlighted={isHighlighted}
      playerColour={currentPlayer.colour}
      onClick={handleClick}
    >{number + 1}</StyledColumnControl>
  )
}
