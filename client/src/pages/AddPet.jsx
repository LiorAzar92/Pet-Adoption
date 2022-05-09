import localforage from "localforage";
import { useEffect, useRef, useState } from "react";
import { Container, Form, Row, Col, Alert, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import './AddPet.css'


const AddPet = ({ editOrAdd }) => {
    const { displayAlert,
        showAlert,
        alertText,
        alertType,
        addPet,
        updatePet,
        setAllPets } = useAuth();

    const [values, setValues] = useState({
        name: '',
        type: 'Dog',
        adoptionStatus: 'Available',
        picture_url: null,
        picture_public_id: null,
        height: '',
        weight: '',
        color: '',
        bio: '',
        hypoallergenic: true,
        dietaryRestrictions: '',
        breedOfAnimal: ''
    })
    const [pet, setPet] = useState({});
    const fileImgRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        if (editOrAdd === 'Edit') {
            getPetFromStorage()
        }
    }, [])

    const getPetFromStorage = async () => {
        await localforage.getItem('pet').then(data => {
            data && setValues(JSON.parse(data));
        })
        await localforage.getItem('pet').then(data => {
            data && setPet(JSON.parse(data));
        })
        console.log(values)
    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, type, adoptionStatus, picture_url, picture_public_id, height, weight, color, bio, hypoallergenic, dietaryRestrictions, breedOfAnimal } = values;
        if (!name || !type || !adoptionStatus || !height || !weight || !color || !bio || !hypoallergenic || !dietaryRestrictions || !breedOfAnimal) {
            displayAlert('Some fields are missing..', 'danger');
            return;
        }
        const file = fileImgRef.current.files[0]
        const currentPet = {
            name,
            type,
            adoptionStatus,
            picture_url,
            picture_public_id,
            height,
            weight,
            color,
            bio,
            hypoallergenic,
            dietaryRestrictions,
            breedOfAnimal
        };
        if (editOrAdd === 'Add') {
            addPet(currentPet, file);
        } else {
            updatePet(pet._id, setAllPets, currentPet, file);
        }
        // fileImgRef.current.value = null;
    }

    return (
        <Container >
            <h1 className='display-3 mt-5 pt-5 mb-5 text-center'>{editOrAdd === 'Add' ? 'Add' : 'Edit'} Pet</h1>
            <Form className='mt-3 bg-transparent border-none pt-5 pe-5 px-5 pb-5 rounded add' onSubmit={onSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" name='name' value={values.name} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Type</Form.Label>
                            <Form.Select id="select" name="type" onClick={handleChange}>
                                <option value='Dog'>Dog</option>
                                <option value='Cat'>Cat</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label >Pet Status</Form.Label>
                            <Form.Select id="select" name="adoptionStatus" onClick={handleChange}>
                                <option value='Available'>Available</option>
                                <option value='Fostered'>Fostered</option>
                                <option value='Adopted'>Adopted</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control ref={fileImgRef} type="file" accept="image/*" />
                    </Form.Group>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Color</Form.Label>
                            <Form.Control type="text" placeholder="Color" value={values.color} name='color' onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicNumber">
                            <Form.Label>Height</Form.Label>
                            <Form.Control type="text" placeholder="Height" name='height' value={values.height} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicNumber">
                            <Form.Label>Weight</Form.Label>
                            <Form.Control type="text" placeholder="Weight" name='weight' value={values.weight} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label >Hypoallergenic</Form.Label>
                            <Form.Select id="select" name="hypoallergenic" onClick={handleChange}>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicNumber">
                            <Form.Label>Dietary Restrictions</Form.Label>
                            <Form.Control type="text" placeholder="Dietary Restrictions" name='dietaryRestrictions' value={values.dietaryRestrictions} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicNumber">
                            <Form.Label>Breed Of Animal</Form.Label>
                            <Form.Control type="text" placeholder="Breed" name='breedOfAnimal' value={values.breedOfAnimal} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="formBasicNumber">
                    <Form.Label>Pet Biography</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Add pet bio.." name='bio' value={values.bio} onChange={handleChange} />
                </Form.Group>
                {
                    showAlert &&
                    <Alert variant={alertType} className='text-center'>
                        {alertText}
                    </Alert>
                }
                <div className='text-center'>
                    {
                        editOrAdd === 'Add' ?
                            <Button variant="outline-dark" type="submit" className='mt-3' disabled={showAlert}>
                                {!showAlert && alertText === 'success' ? 'Adding..' : 'Add Pet'}
                            </Button> :
                            <>
                                <Button variant="outline-dark" type="submit" className='mt-3 me-3' disabled={showAlert}>
                                    {!showAlert && alertText === 'success' ? 'Updating..' : 'Update Pet'}
                                </Button>
                                <Button variant="outline-secondary" type="submit" className='mt-3' onClick={() => navigate('/admin/allpets')}>
                                    Return
                                </Button>
                            </>
                    }
                </div>
            </Form>
        </Container>
    )
}

export default AddPet
