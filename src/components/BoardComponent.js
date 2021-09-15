import React, { useMemo } from "react"
import CellComponent from "./CellComponent"
import styled from "styled-components"

const StyledBoard = styled.section`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-template-rows: repteat(${props => props.rows}, 1fr);
  height: ${props => props.height}vh;
  width: ${props => (props.height / props.rows) * props.columns}vh;
`

export default function BoardComponent({ board, rows, columns, height }) {
  const cellSize = useMemo(() => height / rows, [height, rows])
  const cellNodes = board.map(cell => (<CellComponent cell={cell} size={cellSize}></CellComponent>))

  return (
    <StyledBoard rows={rows} columns={columns} height={height}>
      {cellNodes}
    </StyledBoard>
  )
}
