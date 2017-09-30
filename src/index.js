import React from 'react'
import ReactDOM from 'react-dom'
import ApolloApp from './apps/ApolloApp'
import registerServiceWorker from './registerServiceWorker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { ApolloProvider } from 'react-apollo'
import apolloClient from './apolloClient'

import './index.css'

ReactDOM.render(
  <MuiThemeProvider>
    <ApolloProvider client={apolloClient}>
      <ApolloApp />
    </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

registerServiceWorker()
