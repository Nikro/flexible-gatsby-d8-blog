import styled from "styled-components"


export const HitsWrapper = styled.div`
  display: ${props => (props.show ? `grid` : `none`)};
  margin-top: 20px;
`