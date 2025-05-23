import { Link } from 'react-router-dom'
import './404.css'

export const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-header">404</h1>
      <p className="not-found-p">Oops! Page not found.</p>
      <Link
        to="/"
        className="go-home-link"
      >
        Go Home
      </Link>
    </div>
  )
}

export default NotFound