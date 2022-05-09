import useAuth from "../hooks/useAuth"
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { Container, Button } from "react-bootstrap"
import { useEffect } from "react";


const PageBtnContainer = ({ search, page }) => {
    const { numOfPages, changePage, changePageSearch } = useAuth();

    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1;
    })

    const nextPage = () => {
        let newPage = page + 1;
        if (newPage > numOfPages) {
            newPage = 1
        }
        !search ?
            changePage(newPage) :
            changePageSearch(newPage)
    }

    const prevPage = () => {
        let newPage = page - 1;
        if (newPage < 1) {
            newPage = numOfPages
        }
        !search ?
            changePage(newPage) :
            changePageSearch(newPage)
    }

    return (
        <Container>
            <Button onClick={prevPage} variant='outline-dark' className="me-3">
                <HiChevronDoubleLeft /> Prev
            </Button>
            {
                pages.map(pageNumber => {
                    return <Button variant={pageNumber === page ? "dark" : "outline-dark"} onClick={() => !search ? changePage(pageNumber) : changePageSearch(pageNumber)} key={pageNumber} > {pageNumber}</Button>
                })
            }
            <Button onClick={nextPage} variant='outline-dark' className="mx-3">
                Next  <HiChevronDoubleRight />
            </Button>
        </Container>
    )
}

export default PageBtnContainer
