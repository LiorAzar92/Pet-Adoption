import { useState, useContext, useEffect } from 'react';
import { Button, Container, Card, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/LoginModal';
import SignUpModal from '../components/SignUpModal';
import AuthContext from '../contexts/AuthContext';
import { FaPaw, FaDog, FaCat } from 'react-icons/fa'

const Home = () => {
    const { isAuth,
        closeModal,
        activeUser } = useContext(AuthContext);

    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        handleCloseSignUp();
        handleCloseLogin();
    }, [closeModal])

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    const handleCloseSignUp = () => setShowSignUp(false);
    const handleShowSignUp = () => setShowSignUp(true);



    return (
        <Container className='mt-5 pt-5 container'>
            <h1 className='display-6'>Hi {!isAuth ? 'Guest' : activeUser.name},</h1>
            <div className='text-center d-flex align-items-center justify-content-center'>
                <h1 className='display-1 pt-5 mt-3 text-center me-5'>Welcome to</h1>
                <Image src='https://res.cloudinary.com/liorcloud/image/upload/v1651519145/z1l6qqzpi2y9h58b1zoz.png' className=' mt-2s ' style={{ height: '250px' }} />
            </div>
            <div className='d-flex justify-content-center'>
                <div className='d-flex justify-content-center fw-bold display-6 pt-3 pb-3 mt-3 mb-5 w-75 text-center'>
                    Let the animals know that someone cares
                </div>
            </div>
            {
                !isAuth &&
                <Container className='text-center display-6 fs-3 bg-tranparent pt-3 pb-4 w-50 border-none'>
                    <div>Want to adopt your pet today?</div>
                    <Button className='mt-3 mb-3' variant="outline-dark" onClick={handleShowLogin} >
                        <FaPaw className='me-2 mb-1' />Login here!
                    </Button>
                    <div>Not registered yet?</div>
                    <Button className='mt-3' variant="outline-dark" onClick={handleShowSignUp} >
                        <FaPaw className='me-2 mb-1' /> Sign Up Today!
                    </Button>
                </Container>

            }
            <LoginModal show={showLogin} handleClose={handleCloseLogin} />
            <SignUpModal show={showSignUp} handleClose={handleCloseSignUp} />
            {
                isAuth &&
                <Container className='text-center display-6 fs-3 bg-tranparent pt-4 pb-4 w-50 border-none'>
                    <h1 className='display-5 mb-3'>Your Pet's page<FaDog className='mx-3' /><FaCat className='' /></h1>
                    <div className='fs-4'>Click below to see your pets!</div>
                    <Button className='mt-3' variant="outline-dark" onClick={() => navigate('/pets')}>
                        <FaPaw className='me-2 mb-1' /> Click here!
                    </Button>
                </Container>
            }
        </Container>
    )
}

export default Home;
