import { useContext, useEffect, useState } from 'react'
import { Form, Modal, Button, Alert } from 'react-bootstrap'
import AuthContext from '../contexts/AuthContext'

const LoginModal = ({ show, handleClose }) => {
    const { displayAlert,
        loginUser,
        showAlert,
        alertText,
        alertType,
        activeUser } = useContext(AuthContext);
    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        setValues({
            email: '',
            password: '',
        })
    }, [activeUser])

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = values;
        if (!email || !password) {
            displayAlert('Some fields are missing..', 'danger');
            return;
        }
        const currentUser = { email: values.email.toLowerCase(), password };
        loginUser(currentUser);
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='mt-3' onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='email' value={values.email} onChange={handleChange} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password' value={values.password} onChange={handleChange} />
                        </Form.Group>
                        {
                            showAlert &&
                            <Alert variant={alertType} className='text-center'>
                                {alertText}
                            </Alert>
                        }
                        <div className='text-center'>
                            <Button variant="outline-info" type="submit" className='mb-2' disabled={showAlert}>
                                {!showAlert && alertText === 'success' ? 'Loading..' : 'Login'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default LoginModal
