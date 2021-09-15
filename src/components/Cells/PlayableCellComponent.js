import React from "react"
import CellComponent from "./CellComponent"
import styled from 'styled-components'

const StyledPlayableCell = styled.div`
  box-shadow: ${props => (props.isHighlighted) ? `${props.playerColour} 0 0 6px 6px` : ""};
  height: 100%;
  width: 100%;
  cursor: pointer;
  border-radius: 100%;
`

export default function PlayableCellComponent ({ cell, onCellMouseEnter, onCellMouseLeave, isHighlighted, currentPlayer, onCellClick }) {

  const handleMouseEnter = () => {
    onCellMouseEnter(cell.id)
  }

  const handleMouseLeave = () => {
    onCellMouseLeave()
  }

  const handleClick = () => {
    onCellClick(cell.id)
  }

  return (
    <StyledPlayableCell
      playerColour={currentPlayer.colour}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      isHighlighted={isHighlighted}
      onClick={handleClick}
    >
      <CellComponent cell={cell} highlight={false} />
    </StyledPlayableCell>
  )
}
