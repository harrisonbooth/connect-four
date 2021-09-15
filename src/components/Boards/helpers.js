export const calculateBestFit = (maxHeight, rows, columns) => {
  const targetWidth = (maxHeight / rows) * columns
  const gap = 42 / (rows * columns)
  return [`${maxHeight}vh`, `${targetWidth}vh`, `${gap}rem`]
}

export const determineFreeCell = (board, column, columns) => {
  const target = board
  .filter(cell => cell.id % columns === column && !cell.player)
  .sort((a, b) => b.id - a.id)[0]
  return target?.id
}
