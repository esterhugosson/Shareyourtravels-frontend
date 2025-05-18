import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';


const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: false, // for development
})

try {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <AuthProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </StrictMode>
  )
} catch (e) {
  console.error("React render failed:", e)
}
