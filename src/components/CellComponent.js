import React from "react"
import styled from "styled-components"

const StyledCell = styled.section`
  height: 100%;
  width: 100%;
  background-color: ${props => props.colour};
  border-radius: 100%;
`

export default function CellComponent({ cell }) {
  const innerText = cell.player?.name || "Empty"
  const colour = cell.player?.colour || "white"

  return (
    <StyledCell colour={colour}>
      {innerText}
    </StyledCell>
  )
}
