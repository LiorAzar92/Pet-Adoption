import { useEffect, useState } from "react"
import { Card, Container, Col, Row, Button, Spinner, Alert } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PetPage = () => {
    const { activeUser, savePet, unsavePet, isAuth, getPetById, adoptPet, returnPet, pet, showAlert, alertText, alertType } = useAuth();

    const { id } = useParams();
    const [isOwner, setIsOwner] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        loadPage()
    }, [id, activeUser])

    const loadPage = async () => {
        setIsloading(true)
        await getPetById(id);
        setIsOwner(activeUser.ownedPets.find(item => item === id))
        setIsSaved(activeUser.savedPets.find(item => item === id))
        setIsloading(false);
    }

    const savePetByUser = async () => {
        const userId = {
            userId: activeUser._id
        }
        await savePet(pet._id, userId);
    }

    const unsavePetByUser = async () => {
        const userId = {
            userId: activeUser._id
        }
        await unsavePet(pet._id, userId);
    }

    const adoptPetByUser = async () => {
        const info = {
            userId: activeUser._id,
            adoptionStatus: "Adopted"
        }
        await adoptPet(pet._id, info);
    }

    const fosterPetByUser = async () => {
        const info = {
            userId: activeUser._id,
            adoptionStatus: "Fostered"
        }
        await adoptPet(pet._id, info);
    }

    const returnPetByUser = async () => {
        const info = {
            userId: activeUser._id,
        }
        await returnPet(pet._id, info);
    }

    return (
        <Container className="pt-5">
            {
                isLoading &&
                <div className="text-center mt-5">
                    <Spinner animation="grow" variant="info" />
                </div>

            }
            {
                pet && !isLoading &&
                <Card className="mt-5 ">
                    <Row>
                        <Col md={5}>
                            <Card.Img variant="top" src={pet.picture_url} />

                        </Col>
                        <Col >
                            <Card.Body>
                                <Card.Title className="fs-2">{pet.name}</Card.Title>
                                <Card.Text>
                                    {pet.adoptionStatus}
                                </Card.Text>
                                <Card.Text>
                                    Type : {pet.type}
                                </Card.Text>
                                <Card.Text>
                                    Height : {pet.height} m
                                </Card.Text>
                                <Card.Text>
                                    Weight : {pet.weight} kg
                                </Card.Text>
                                <Card.Text>
                                    Color : {pet.color}
                                </Card.Text>
                                <Card.Text>
                                    Hypoallergenic : {pet.hypoallergenic ? 'Yes' : 'No'}
                                </Card.Text>
                                <Card.Text>
                                    Dietary Restrictions : {pet.dietaryRestrictions}
                                </Card.Text>
                                <Card.Text>
                                    Breed : {pet.breedOfAnimal}
                                </Card.Text>
                                <Card.Text>
                                    Bio : {pet.bio}
                                </Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                    <Card.Footer className="d-flex text-center pt-3 pb-3">
                        <Col>
                            {
                                isSaved ?
                                    <Button className='w-50' variant="outline-info" onClick={unsavePetByUser} disabled={!isAuth || showAlert}>Unsave Pet
                                    </Button> :
                                    <Button className='w-50' variant="outline-info" onClick={savePetByUser} disabled={!isAuth || showAlert}>Save Pet
                                    </Button>
                            }
                        </Col>
                        {
                            isOwner ?
                                (pet.adoptionStatus === 'Fostered' ?
                                    <>
                                        <Col>
                                            <Button className='w-50' variant="outline-info" onClick={adoptPetByUser} disabled={!isAuth || pet.adoptionStatus === 'Adopted' || showAlert}>Adopt Pet
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button className='w-50' variant="outline-info" onClick={returnPetByUser} disabled={showAlert} >Return Pet
                                            </Button>
                                        </Col>
                                    </> :
                                    <Col>
                                        <Button className='w-50' variant="outline-info" onClick={returnPetByUser} disabled={showAlert} >Return Pet
                                        </Button>
                                    </Col>
                                )
                                :
                                <>
                                    <Col>
                                        <Button className='w-50' variant="outline-info" onClick={adoptPetByUser} disabled={!isAuth || pet.adoptionStatus !== 'Available' || showAlert}>Adopt Pet
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button className='w-50' variant="outline-info" onClick={fosterPetByUser} disabled={!isAuth || pet.adoptionStatus !== 'Available' || showAlert}>Foster Pet
                                        </Button>
                                    </Col>
                                </>
                        }
                    </Card.Footer>
                    <div className='text-center mt-2'>
                        <Button variant="outline-info" type="submit" className='mb-2' onClick={() => navigate(-1)} disabled={showAlert}>
                            Return
                        </Button>
                        {
                            showAlert &&
                            <Alert variant={alertType} className='text-center me-5 mx-5'>
                                {alertText}
                            </Alert>
                        }
                    </div>
                </Card>
            }
        </Container >
    )
}

export default PetPage
