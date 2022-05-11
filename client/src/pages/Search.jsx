import { useState, useContext, useEffect } from "react"
import { Form, Button, Container, Row, Col, Spinner, Collapse } from "react-bootstrap"
import AuthContext from "../contexts/AuthContext";
import PetsResults from "../components/PetsResults";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';


const Search = () => {
    const { getPets, setPetsResults, setPage, setQuery } = useContext(AuthContext);

    const [toggle, setToggle] = useState(true);
    const [open, setOpen] = useState(true);
    const [searchInputs, setSearchInputs] = useState({
        type: '',
        name: '',
        height: '',
        weight: '',
        adoptionStatus: '',
    })
    const [isLoading, setIsLoading] = useState(false)



    useEffect(() => {
        setPetsResults([])
        setPage(1);
    }, [])

    const handleChange = (e) => {
        setSearchInputs({ ...searchInputs, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        setIsLoading(true);
        setPage(1);
        e.preventDefault();
        let query = JSON.parse(JSON.stringify(searchInputs));
        removeEmpty(query);
        setQuery(query);
        await getPets(query, setPetsResults, 1);
        setIsLoading(false);
    }

    const removeEmpty = (obj) => {
        Object.keys(obj).forEach((k) => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
        if (obj.name) {
            obj.name = obj.name[0].toUpperCase() + obj.name.substring(1).toLowerCase()
        }
        return obj;
    };

    const clearResults = (e) => {
        e.preventDefault();
        setPetsResults([])
    }

    return (
        <Container className="text-center mt-5 pt-5">
            <h1 className="display-2 mb-3">Search</h1>
            <Button
                onClick={() => setOpen(!open)}
                variant={!open ? 'dark' : 'outline-dark'}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                {!open ? 'Show' : 'Hide'} Search
            </Button>
            <Collapse in={open}>
                <Form className='mt-3'
                    onSubmit={onSubmit}>
                    <div>
                        <BootstrapSwitchButton checked={toggle} onstyle="dark" offstyle="secondary" width={120} onlabel='Basic' offlabel="Advanced" onChange={() => { setToggle(!toggle) }} />
                    </div>
                    <>
                        <Form.Label className="mt-2">Pet Type</Form.Label>
                        <div className="d-flex d-flex justify-content-center">
                            <Form.Select className="w-25" id="select" name="type" onClick={handleChange}>
                                <option value=''>All</option>
                                <option value='Dog'>Dog</option>
                                <option value='Cat'>Cat</option>
                            </Form.Select>
                        </div>
                    </>
                    {
                        !toggle &&
                        <>
                            <Col className="d-flex justify-content-center">
                                <Form.Group className="mb-3 mt-3 w-25" controlId="formBasicText">
                                    <Form.Label >Pet Status</Form.Label>
                                    <Form.Select id="select" name="adoptionStatus" onClick={handleChange}>
                                        <option value=''>All</option>
                                        <option value='Available'>Available</option>
                                        <option value='Fostered'>Fostered</option>
                                        <option value='Adopted'>Adopted</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3 mt-3" controlId="formBasicText">
                                    <Form.Label>Pet's Height</Form.Label>
                                    <div className="d-flex justify-content-center">
                                        <Form.Control className="fs-6 w-25" type="text" placeholder="Pet's Height" name='height' value={searchInputs.height} onChange={handleChange} />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3 mt-3" controlId="formBasicText">
                                    <Form.Label >Pet's Weight</Form.Label>
                                    <div className="d-flex justify-content-center">
                                        <Form.Control className="fs-6 w-25" type="text" placeholder="Pet's Weight" name='weight' value={searchInputs.weight} onChange={handleChange} />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3 mt-3" controlId="formBasicText">
                                    <Form.Label >Pet's Name</Form.Label>
                                    <div className="d-flex justify-content-center">
                                        <Form.Control className="fs-6 w-25" type="text" placeholder="Pet's Name" name="name" value={searchInputs.name} onChange={handleChange} />
                                    </div>
                                </Form.Group>
                            </Col>
                        </>
                    }
                    <Button variant="dark" type="submit" className='mb-2 mt-3 fs-5 me-3' >
                        Search
                    </Button>
                    <Button variant="outline-dark" type="submit" className='mb-2 mt-3 fs-5' onClick={clearResults}>
                        Clear
                    </Button>
                </Form>
            </Collapse>
            {
                isLoading ?
                    <div className="text-center mt-4">
                        <Spinner animation="grow" variant="info" />

                    </div> :
                    <PetsResults />
            }
        </Container>
    )
}
export default Search
