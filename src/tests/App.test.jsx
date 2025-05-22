import { render, screen } from '@testing-library/react'
import App from '../App'
import { BrowserRouter } from 'react-router-dom'
import createStore from 'react-auth-kit/createStore'
import AuthProvider from 'react-auth-kit'

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: false,
})

describe('App', () => {
  it('renders the App component', () => {
    render(
      <AuthProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    )

    screen.debug()
  })
})
