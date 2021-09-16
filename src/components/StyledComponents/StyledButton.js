import styled from "styled-components"

export default styled.button`
  appearance: none;
  background: none;
  border: none;
  font-weight: bold;
  font-size: ${props => props.fontSize};
  cursor: pointer;
  text-align: center;
  color: #666;
  justify-self: center;

  &:hover {
    color: #444;
  }
`
