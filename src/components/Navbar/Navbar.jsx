import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useSignOut from 'react-auth-kit/hooks/useSignOut'

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const isAuthenticated = useIsAuthenticated()
    const signOut = useSignOut()

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const closeMenu = () => setIsMenuOpen(false)


    if (isAuthenticated) {
        return (

            <nav>


                <Link to='/home' className='title'>Share Your Travels</Link>

                <div className="menu-toggle" onClick={toggleMenu}>
                    ☰
                </div>

                <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <li>
                        <NavLink to='/explore' onClick={closeMenu}>Explore</NavLink>
                    </li>

                    <li>
                        <NavLink to='/travels' onClick={closeMenu}>Your travels</NavLink>
                    </li>

                    <li>
                        <NavLink to='/account' onClick={closeMenu}>Your account</NavLink>
                    </li>

                    <li>
                        <NavLink
                            to='/signout'
                            onClick={() => {
                                closeMenu()
                                signOut()
                                window.location.reload()
                            }}
                        >
                            Sign out
                        </NavLink>

                    </li>

                </ul>

            </nav>

        )
    } else {

        return (

            <nav>


                <Link to='/home' className='title'>Share Your Travels</Link>

                <div className="menu-toggle" onClick={toggleMenu}>
                    ☰
                </div>

                <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <li>
                        <NavLink to='/explore' onClick={closeMenu}>Explore</NavLink>
                    </li>

                    <li>
                        <NavLink to='/signin' onClick={closeMenu}>Sign in</NavLink>
                    </li>

                </ul>

            </nav>

        )


    }

}

export default Navbar