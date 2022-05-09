import React, { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AuthContext from '../contexts/AuthContext'
import PageBtnContainer from './PageBtnContainer'
import PetCard from './PetCard'

const PetsResults = () => {
    const { petsResults, totalPets, numOfPages, page } = useContext(AuthContext);

    return (
        <Container className='text-center mt-4'>
            {
                petsResults.length === 0 ? <h1 className='display-6'>
                    No results...
                </h1> :
                    <>
                        <h1 className="display-6 mb-3">Total Pets : {totalPets}</h1>
                        {numOfPages > 1 && <PageBtnContainer search={true} page={page} />}
                        <Row className='mb-2 mt-4 overflow-auto pe-3 px-3'>
                            {petsResults.map((pet, index) =>
                                <Col key={index} md={6} lg={3} className="mb-4">
                                    <PetCard pet={pet} button={true} />
                                </Col>
                            )}
                        </Row>
                    </>
            }

        </Container>
    )
}

export default PetsResults
