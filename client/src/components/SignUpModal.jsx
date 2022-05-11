import { useContext, useEffect, useState } from 'react'
import { Form, Modal, Button, Row, Col, Alert } from 'react-bootstrap'
import AuthContext from '../contexts/AuthContext'

const SignUpModal = ({ show, handleClose }) => {
    const { showAlert,
        alertText,
        alertType,
        displayAlert,
        signUpUser,
        action } = useContext(AuthContext);

    const [values, setValues] = useState({
        email: '',
        password: '',
        checkPassword: '',
        name: '',
        phoneNumber: '',
    })

    useEffect(() => {
        setValues({
            email: '',
            password: '',
            checkPassword: '',
            name: '',
            phoneNumber: '',
        })
    }, [action])

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password, checkPassword, name, phoneNumber } = values;
        if (!email || !password || !checkPassword || !name || !phoneNumber) {
            displayAlert('Some fields are missing..', 'danger');
            return;
        } else if (!(password === checkPassword)) {
            displayAlert('Passwords do not match..', 'danger');
            return;
        }
        const currentUser = { email: values.email.toLowerCase(), password, name, phoneNumber };
        signUpUser(currentUser);
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='mt-3' onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label >Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='email' value={values.email} onChange={handleChange} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name='password' value={values.password} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Check Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name='checkPassword' value={values.checkPassword} onChange={handleChange} />
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
                        {
                            showAlert &&
                            <Alert variant={alertType} className='text-center'>
                                {alertText}
                            </Alert>
                        }
                        <div className='text-center'>
                            <Button variant="outline-info" type="submit" className='mb-2 ' disabled={showAlert}>
                                {!showAlert && alertText === 'success' ? 'Loading..' : 'Sign Up'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default SignUpModal
