import { useContext, useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext';
import './Profile.css'

const Profile = () => {
    const { displayAlert,
        updateUser,
        showAlert,
        alertText,
        alertType, activeUser } = useContext(AuthContext);

    const [values, setValues] = useState({
        email: activeUser.email,
        password: '',
        name: activeUser.name,
        phoneNumber: activeUser.phoneNumber,
        bio: activeUser.bio,
    })

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password, name, phoneNumber, bio } = values;
        if (!email || !name || !phoneNumber) {
            displayAlert('Some fields are missing..', 'danger');
            return;
        }
        const currentUser = { email: values.email.toLowerCase(), password, name, phoneNumber, bio };
        updateUser(activeUser._id, currentUser);
    }


    return (
        <Container >
            <h1 className='display-3 pt-5 mt-5 mb-5 text-center'>Profile Page</h1>
            <Form className='mt-3 bg-transparent pt-5 pe-5 px-5 pb-5 rounded profile' onSubmit={onSubmit}>
                <h1 className='display-6 pb-4 text-center '> Update your profile</h1>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='email' value={values.email} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password' value={values.password} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Full Name" value={values.name} name='name' onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" placeholder="Phone Number" name='phoneNumber' value={values.phoneNumber} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="formBasicNumber">
                    <Form.Label>Your Biography</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Add your bio.." name='bio' value={values.bio} onChange={handleChange} />
                </Form.Group>
                {
                    showAlert &&
                    <Alert variant={alertType} className='text-center'>
                        {alertText}
                    </Alert>
                }
                <div className='text-center'>
                    <Button variant="outline-dark" type="submit" className='mt-4' disabled={showAlert}>
                        {!showAlert && alertText === 'success' ? 'Saving..' : 'Save Changes'}
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default Profile;
