import React from 'react'
import { Card, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import './UserCard.css'

const UserCard = ({ user }) => {
    const { setUser } = useAuth()

    const navigate = useNavigate();

    const handleNavigate = async () => {
        await setUser()
        navigate(user._id)
    }

    return (
        <Card className='d-flex pb-2 pt-2 border border-dark rounded user-card bg-transparent'>
            <Card.Body onClick={handleNavigate}>
                <Row>
                    <Card.Title className='fs-5'>{user.isAdmin ? 'Administrator' : 'User'}</Card.Title>
                </Row>
                <Row>
                    <Card.Title className='fs-2'>{user.name}</Card.Title>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default UserCard
