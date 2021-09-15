import React from "react"
import styled from "styled-components"

const StyledCell = styled.section`
  height: ${props => props.size}vh;
  width: ${props => props.size}vh;
`

export default function CellComponent({ cell, size }) {
  const innards = (cell.player) ? cell.player.name : "Empty"

  return (
    <StyledCell size={size}>
      {innards}
    </StyledCell>
  )
}
