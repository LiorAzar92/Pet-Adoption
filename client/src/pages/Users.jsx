import { Container } from "react-bootstrap"
import UsersResults from "../components/UsersResults"


const Users = () => {
    return (
        <Container>
            <h1 className='text-center display-2 mt-5 pt-5'>Users</h1>
            <UsersResults />
        </Container>
    )
}

export default Users
