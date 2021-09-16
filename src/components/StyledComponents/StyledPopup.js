import styled from "styled-components"

export const StyledFullscreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(30,30,30,0.3);
  display: grid;
  align-items: center;
  justify-content: center;
`

export const StyledPopup = styled.section`
  padding: 20px;
  background-color: white;
  border-radius: 1.25rem;
  box-shadow: rgba(30,30,30) 0px 5px 15px;
`
