import { useContext, useState, useEffect } from 'react';
import { Nav, NavDropdown, Navbar, Container, Image } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import LoginModal from '../components/LoginModal';
import SignUpModal from '../components/SignUpModal';
import './NavBar.css'
import { FaPaw } from 'react-icons/fa'

const NavBar = () => {
    const { isAuth, logoutUser, closeModal, activeUser } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        handleCloseSignUp();
        handleCloseLogin();
    }, [closeModal])

    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    const handleCloseSignUp = () => setShowSignUp(false);
    const handleShowSignUp = () => setShowSignUp(true);

    const handleLogout = () => {
        logoutUser();
        navigate('/')
    }

    return (
        <div>
            <Navbar bg="dark" variant='dark' expand="lg" fixed='top'>
                <Container>
                    <Image src='https://res.cloudinary.com/liorcloud/image/upload/v1651994071/icnix1c6l12tkmzyeie9.png' className='me-2' style={{ height: '40px' }} />
                    <Navbar.Brand className='page rounded fw-light pe-2 px-2' to='/' as={NavLink}>
                        Home
                    </Navbar.Brand>
                    <Navbar.Brand className='page rounded fw-light pe-2 px-2' to='/search' as={NavLink}>Search</Navbar.Brand>
                    {
                        isAuth &&
                        <>
                            <Navbar.Brand to='/profile' className='page rounded fw-light pe-2 px-2' as={NavLink}>Profile</Navbar.Brand>
                            <Navbar.Brand to='/pets' className='page rounded fw-light pe-2 px-2' as={NavLink}>Pets</Navbar.Brand>
                        </>
                    }

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav"
                        className='justify-content-end'>
                        <Nav className="d-flex">
                            {
                                isAuth && activeUser.isAdmin &&
                                <NavDropdown
                                    title="Admin" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={NavLink} to='/admin/addPet'>Add Pet</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to='/admin/users'>Users</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to='/admin/allPets'>Pets</NavDropdown.Item>
                                </NavDropdown>
                            }
                            {
                                !isAuth &&
                                <NavDropdown className='justify-content-end' title="User Options" id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={handleShowLogin} ><FaPaw className='me-2 mb-1' />Login</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleShowSignUp} ><FaPaw className='me-2 mb-1' />Sign Up</NavDropdown.Item>
                                    <LoginModal show={showLogin} handleClose={handleCloseLogin} />
                                    <SignUpModal show={showSignUp} handleClose={handleCloseSignUp} />
                                </NavDropdown>
                            }
                            {
                                isAuth &&
                                <NavDropdown className='justify-content-end' title="User Options" id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={handleLogout}><FaPaw className='me-2 mb-1' />Logout</NavDropdown.Item>
                                </NavDropdown>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    )
}

export default NavBar
