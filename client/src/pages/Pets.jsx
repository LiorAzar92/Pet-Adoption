import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import PetCard from "../components/PetCard";
import AuthContext from "../contexts/AuthContext";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

const Pets = () => {
    const { activeUser, getPetsByUserId, savedPets, setSavedPets } = useContext(AuthContext);

    const [toggle, setToggle] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        const getPets = async () => {
            setSavedPets(await getPetsByUserId(activeUser._id, {
                petDef: toggle ? "ownedPets" : "savedPets"
            }))
            setIsLoading(false)
        }
        getPets()
    }, [toggle])

    return (
        <Container>
            <h1 className='text-center display-2 mt-5 pt-5'>
                {toggle ?
                    'Pets' :
                    'Saved Pets'
                }
            </h1>
            <div className="d-flex justify-content-center mt-4 mb-4">
                <BootstrapSwitchButton checked={toggle} onstyle="dark" offstyle="secondary" width={200} onlabel='Owned' offlabel="Saved" onChange={() => { setToggle(!toggle) }} />
            </div>
            {
                isLoading &&
                <div className="text-center">

                    <Spinner animation="grow" variant="info" />
                </div>
            }
            {
                !savedPets.length && toggle && !isLoading &&
                < h1 className="display-6 text-center">You don't own any pet yet...</h1>
            }
            {
                !savedPets.length && !toggle && !isLoading &&
                < h1 className="display-6 text-center">You didn't save any pet yet...</h1>
            }
            <Row className='mb-2 mt-4 text-center'>
                {!isLoading &&
                    savedPets.map((pet, index) =>
                        <Col key={index} md={6} lg={3} className="mb-4">
                            <PetCard pet={pet} button={true} />
                        </Col>
                    )
                }
            </Row>
        </Container >
    )
}

export default Pets;
