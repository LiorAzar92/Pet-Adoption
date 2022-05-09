import React, { useEffect, useState } from 'react'
import { Container, Card, Row, Col, Spinner, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import PetCard from '../components/PetCard';
import useAuth from '../hooks/useAuth';

const UserPage = () => {
    const [isLoading, setIsloading] = useState(false);

    const { id } = useParams();

    const { user, ownedPets, getFullUserByUserId } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const loadPage = async () => {
            setIsloading(true)
            await getFullUserByUserId(id);
            setIsloading(false);
        }
        loadPage()
    }, [id])

    return (
        <Container className='d-flex justify-content-center pt-5'>
            {
                isLoading &&
                <div className="text-center mt-5">
                    <Spinner animation="grow" variant="info" />
                </div>

            }
            {
                user && !isLoading &&
                <Card className="mt-5 w-75 justify-content-middle">
                    <Row>

                        <Col >
                            <Card.Body>
                                <Card.Title className="fs-1">{user.name}</Card.Title>
                                <div className='fs-5'>
                                    <Card.Text>
                                        {user.isAdmin ? 'Administrator' : 'User'}
                                    </Card.Text>
                                    <Card.Text>
                                        Email: {user.email}
                                    </Card.Text>
                                    <Card.Text>
                                        Phone Number: {user.phoneNumber}
                                    </Card.Text>
                                </div>
                            </Card.Body>
                        </Col>
                    </Row>
                    <Card.Footer className=" text-center pt-3 pb-3">
                        <Card.Title className="display-6">Pet List</Card.Title>
                        {
                            ownedPets.length === 0 ? <h1 className='display-6 fs-3'>
                                No pets owned by this user
                            </h1> :
                                <Row className='mb-2 mt-4 overflow-auto' style={{ maxHeight: '49vh' }}>
                                    {ownedPets.map((pet, index) =>
                                        <Col key={index} md={4} lg={4} className="mb-4">
                                            <PetCard pet={pet} button={false} />
                                        </Col>
                                    )}
                                </Row>
                        }
                    </Card.Footer>
                    <div className='text-center mt-2'>
                        <Button variant="outline-info" type="submit" className='mb-2' onClick={() => navigate(-1)}>
                            Return
                        </Button>
                    </div>
                </Card>
            }
        </Container >
    )
}

export default UserPage
