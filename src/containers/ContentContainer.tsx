import * as React from 'react'

import styledComponents from 'styled-components'

const ContentContainer = styledComponents.div`
  height: 477px;
  ${props =>
    props.theme.light
      ? 'background-color: #e7ebee;'
      : 'background-color: #0d1f2d;'};
`

export default props => <ContentContainer>{props.children}</ContentContainer>
