import * as React from 'react'

import styledComponents from 'styled-components'

const ContentContainer = styledComponents.div`
  ${props =>
    props.theme.light
      ? 'background-color: #e7ebee;'
      : 'background-color: #0d1f2d;'};
`

export default props => <ContentContainer className="content-container">{props.children}</ContentContainer>
