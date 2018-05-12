import React from 'react'
import styled from 'styled-components'

const ContentContainer = styled.div`
  height: 475px;
  ${props =>
    props.theme.light
      ? 'background-color: #e7ebee;'
      : 'background-color: #0d1f2d;'};
`

export default props => <ContentContainer>{props.children}</ContentContainer>
