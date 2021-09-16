import React from "react"
import styled, { keyframes } from "styled-components"

const pulsing = keyframes`
  from {
    box-shadow: #FFFAAA 0 0 0 0;
  }

  to {
    box-shadow: #FFFAAA 0 0 10px 5px
  }
`

const StyledCell = styled.section`
  height: 100%;
  width: 100%;
  background-color: ${props => props.colour};
  border-radius: 100%;
  animation: ${pulsing} 0.8s ease-out infinite alternate;
  animation-play-state: ${props => (props.isWinning) ? "playing": "paused"};
`

export default function CellComponent({ cell }) {
  const colour = cell.colour || "white"

  return (
    <StyledCell colour={colour} isWinning={cell.isWinning}>
    </StyledCell>
  )
}
