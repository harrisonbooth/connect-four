import React from "react"
import CellComponent from "../CellComponent"
import StyledBoard from "./StyledBoard"

export default function PlayableBoardComponent({ board, rows, columns, height }) {
  const cellNodes = board.map(cell => (<CellComponent cell={cell}></CellComponent>))

  return (
    <StyledBoard rows={rows} columns={columns} height={height}>
      {cellNodes}
    </StyledBoard>
  )
}
