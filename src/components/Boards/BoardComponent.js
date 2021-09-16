import React, { useState, useMemo } from "react"
import CellComponent from "../Cells/CellComponent"
import PlayableCellComponent from "../Cells/PlayableCellComponent"
import ColumnControlComponent from "../ColumnControlComponent"
import { calculateBestFit, determineFreeCell } from "./helpers"
import styled, { keyframes } from "styled-components"
import StyledHeading from "../StyledComponents/StyledHeading"

const boardErrorShake = keyframes`
  10%, 90% {
    transform: translateX(-1px);
  }

  20%, 80% {
    transform: translateX(2px);
  }

  30%, 50%, 70% {
    transform: translateX(-4px);
  }

  40%, 60% {
    transform: translateX(4px);
  }
`

const StyledBoard =  styled.section`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-template-rows: repeat(${props => props.rows}, 1fr);
  height: ${props => props.height};
  width: ${props => props.width};
  align-items: center;
  justify-items: center;
  gap: ${props => props.gap};
  padding: ${props => props.gap};
  box-sizing: border-box;
  background-color: blue;
  border-radius: 1rem;
  animation: ${props => (props.boardError) ? boardErrorShake : ""} 0.82s cubic-bezier(.36,.07,.19,.97) both infinite;
  animation-play-state: ${props => (props.boardError) ? "playing" : "paused"}
`

const StyledColumnControls = styled.section`
  display: grid;
  justify-items: center;
  width: 100%;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  margin-bottom: 10px;
`

export default function BoardComponent(
  {
    board,
    rows,
    columns,
    maxHeight,
    maxWidth,
    playable,
    currentPlayer,
    handleCellClick,
    handleColumnClick,
    boardError,
    onErrorAnimationEnd,
    message
  }
) {
  const [height, width, gap, columnFont] = useMemo(() => calculateBestFit(maxHeight, rows, columns), [maxHeight, rows, columns])
  const [hoveringColumn, setHoveringColumn] = useState(null)
  const hoveringCellId = useMemo(() => determineFreeCell(board, hoveringColumn, columns), [board, hoveringColumn, columns])

  const handleCellMouseEnter = (cellId) => {
    setHoveringColumn(cellId % columns)
  }

  const handleColumnMouseLeave = () => {
    setHoveringColumn(null)
  }

  const handleColumnMouseEnter = (column) => {
    setHoveringColumn(column)
  }

  const isCellHighlighted = (cellId) => {
    return cellId === hoveringCellId
  }

  const handleAnimationEnd = () => {
    onErrorAnimationEnd()
  }

  const isColumnHighlighted = (column) => {
    return column === hoveringColumn
  }

  const columnControls = (!playable) ?
    null :
    [...Array(columns)].map((_, index) => (
      <ColumnControlComponent
        number={index}
        key={index}
        onColumnMouseEnter={handleColumnMouseEnter}
        onColumnMouseLeave={handleColumnMouseLeave}
        isHighlighted={isColumnHighlighted(index)}
        currentPlayer={currentPlayer}
        onColumnClick={handleColumnClick}
        columnFont={columnFont}
      />
    ))

    const boardHeading = (!playable) ?
      (<StyledHeading>{message}</StyledHeading>) :
      (
        <StyledColumnControls columns={columns}>
          {columnControls}
        </StyledColumnControls>
      )

  const cellNodes = (!playable) ?
    board.map(cell => (<CellComponent cell={cell} />)) :
    board.map(cell => (
      <PlayableCellComponent
        cell={cell}
        key={cell.id}
        onCellMouseEnter={handleCellMouseEnter}
        onCellMouseLeave={handleColumnMouseLeave}
        isHighlighted={isCellHighlighted(cell.id)}
        currentPlayer={currentPlayer}
        onCellClick={handleCellClick}
      />
    ))

  return (
    <div>
      {boardHeading}
      <StyledBoard boardError={boardError} onAnimationIteration={handleAnimationEnd} rows={rows} columns={columns} height={height} width={width} gap={gap}>
        {cellNodes}
      </StyledBoard>
    </div>
  )
}
