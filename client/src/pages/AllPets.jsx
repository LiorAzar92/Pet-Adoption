import { useEffect, useState } from "react"
import { Container, Row, Col, Spinner } from "react-bootstrap"
import PageBtnContainer from "../components/PageBtnContainer";
import PetCard from "../components/PetCard";
import useAuth from '../hooks/useAuth'

const AllPets = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [firstLoading, setFirstLoading] = useState(true)
    const { getPets, allPets, setAllPets, totalPets, pageAll, numOfPages, setPageAll } = useAuth();

    useEffect(() => {
        setPageAll(1);
        const loadAllPets = async () => {
            setIsLoading(true);
            await getPets({}, setAllPets, 1);
            setIsLoading(false);
            setFirstLoading(false);
        }
        loadAllPets()
    }, [])

    useEffect(() => {
        const loadPage = async () => {
            await getPets({}, setAllPets, pageAll);
        }
        !firstLoading && loadPage()
    }, [pageAll])

    return (
        <Container className="text-center">
            <h1 className='text-center display-2 mt-5 pt-5'>Pet's Collection</h1>
            {
                isLoading ?
                    <div>
                        <Spinner animation="grow" variant="info" />
                    </div> :
                    <>
                        <h1 className="display-6 mb-3">Total Pets : {totalPets}</h1>
                        {numOfPages > 1 && <PageBtnContainer page={pageAll} />}
                        <Row className='mb-2 mt-4 overflow-auto pe-3 px-3'>
                            {
                                allPets.map((pet, index) =>
                                    <Col key={index} md={6} lg={3} className="mb-4">
                                        <PetCard pet={pet} edit={true} />
                                    </Col>
                                )}
                        </Row>
                    </>
            }
        </Container>
    )
}

export default AllPets
