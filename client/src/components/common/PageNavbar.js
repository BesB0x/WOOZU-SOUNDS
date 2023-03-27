import { Link, useNavigate, useLocation } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

import { removeToken } from '../helpers/auth'

const PageNavbar = () => {

  // ! Location variables
  const navigate = useNavigate()
  const location = useLocation()
  const noNav = ['/', '/login', '/register']

  // ! Executions
  const handleLogout = () => {
    removeToken()
    navigate('/')
  }

  return (
    <>
      {!noNav.includes(location.pathname) &&
        <Navbar expand="md">
          <Container>
            <Navbar.Brand to="/" as={Link} className='logo'>WOOZU SOUNDS</Navbar.Brand>
            <Navbar.Toggle aria-controls="breadbored-nav" />
            <Navbar.Collapse id="breadbored-nav" className='justify-content-end'>
              <Nav>
                <Nav.Link to="/" as={Link} className={location.pathname === '/' ? 'active' : ''}>Home</Nav.Link>
                <Nav.Link to="/map" as={Link} className={location.pathname === '/map' ? 'active' : ''}>Map</Nav.Link>
                <button onClick={handleLogout}>Logout</button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      }
    </>
  )
}

export default PageNavbar