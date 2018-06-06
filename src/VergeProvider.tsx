import * as React from 'react'

import { inject, observer } from 'mobx-react'

import { ThemeProvider } from 'styled-components'

const VergeProvider = inject('SettingsStore')(
  observer(({ children, SettingsStore }) => (
    <ThemeProvider theme={{ light: !SettingsStore.getDarkTheme }}>
      {children}
    </ThemeProvider>
  )),
)

export default VergeProvider
