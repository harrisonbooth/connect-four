import styled from "styled-components"

export default styled.section`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-template-rows: repteat(${props => props.rows}, 1fr);
  height: ${props => props.height}vh;
  width: ${props => (props.height / props.rows) * props.columns}vh;
  align-items: center;
  justify-items: center;
  gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  background-color: blue;
`
