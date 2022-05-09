// import { useState } from 'react'
import localforage from 'localforage';
import { Card, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import './PetCard.css'

const PetCard = ({ pet, button, edit }) => {
    const { deletePet, isAuth } = useAuth()

    const navigate = useNavigate();

    const deleteCurrentPet = () => {
        window.confirm('Are you sure you want to delete this pet?') && deletePet(pet._id);
    }

    const editPet = async () => {
        await localforage.setItem('pet', JSON.stringify(pet));
        navigate(pet._id)
    }

    return (
        <Card className='d-flex pb-3 border border-secondary border-1 pet-card'>
            <div className='text-center'>

                <Card.Img variant="top" src={pet.picture_url} />
            </div>
            <Card.Body>
                <Row>
                    <Card.Title className='fs-2'>{pet.name}</Card.Title>
                </Row>
                <Row>
                    <Card.Text className='align-middle'>{pet.adoptionStatus}</Card.Text>
                </Row>
            </Card.Body>
            <div >
                {
                    button &&
                    <Button className='w-50' variant="outline-secondary" disabled={!isAuth} onClick={() => navigate('/search/' + pet._id)}>More details
                    </Button>
                }
                {

                    edit &&
                    <Row className='text-center'>
                        <Col>
                            <Button className='w-50' variant="outline-success" onClick={editPet}>Edit
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="outline-danger" onClick={deleteCurrentPet}>Delete
                            </Button>
                        </Col>
                    </Row>

                }
            </div>
        </Card>
    )
}

export default PetCard
