import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext'
import UserCard from './UserCard';

const UsersResults = () => {
    const { usersResults, getAllUsers } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            getUsers()
            setIsLoading(false)
        }, 50);
    }, [])

    const getUsers = async () => {
        setIsLoading(true)
        await getAllUsers()
    }

    return (

        <Container className='text-center mt-4'>
            {
                isLoading ?
                    <div>
                        <Spinner animation="grow" variant="info" />
                    </div> :
                    <Row className='mb-2 mt-4'>
                        {usersResults.map((user, index) =>
                            <Col key={index} md={6} lg={3} className="mb-4"  >
                                <UserCard user={user} />
                            </Col>
                        )}
                    </Row>
            }

        </Container>
    )
}

export default UsersResults
