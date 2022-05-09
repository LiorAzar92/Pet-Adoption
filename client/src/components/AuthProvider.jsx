import axios from "axios";
import { useEffect, useState } from "react"
import AuthContext from "../contexts/AuthContext"
import localforage from "localforage";

const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [alertType, setAlertType] = useState('');
    const [activeUser, setActiveUser] = useState(null);
    const [closeModal, setCloseModal] = useState(true);
    const [petsResults, setPetsResults] = useState([]);
    const [usersResults, setUsersResults] = useState([]);
    const [pet, setPet] = useState();
    const [savedPets, setSavedPets] = useState([]);
    const [ownedPets, setOwnedPets] = useState([]);
    const [user, setUser] = useState();
    const [allPets, setAllPets] = useState([]);
    const [totalPets, setTotalPets] = useState();
    const [page, setPage] = useState(1)
    const [pageAll, setPageAll] = useState(1)
    const [numOfPages, setNumOfPages] = useState([]);
    const [query, setQuery] = useState({});

    const authFetch = axios.create({
        baseURL: 'http://localhost:8000/api',
        withCredentials: true
    })

    useEffect(() => {
        localforage.getItem('auth').then(data => {
            data && setIsAuth(data);
        })
        localforage.getItem('user').then(data => {
            data && setActiveUser(JSON.parse(data));
        })
        setTimeout(() => {
            setIsLoading(true)
        }, 50);
    }, [])

    const displayAlert = (text, type) => {
        setAlertText(text);
        setAlertType(type);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2500);
    }

    const getAllUsers = async (query) => {
        let url = `/auth/user`
        try {
            const { data } = await authFetch.get(url, {
                params: query
            });
            const { users } = data;
            setUsersResults([...users]);
        } catch (error) {
            console.log(error.response);
        }
    }

    const signUpUser = async (recievedUser) => {
        const url = `/auth/register`
        try {
            const response = await authFetch.post(url, recievedUser);
            const { user } = response.data;
            addUserToLocalStorage({ user });
            displayAlert('User created! redirecting...', 'success')
            setTimeout(() => {
                setCloseModal(!closeModal);
            }, 2500);
        } catch (error) {
            console.log(error.response.data.msg);
            displayAlert(error.response.data.msg, 'danger')
        }
    }

    const loginUser = async (recievedUser) => {
        const url = `/auth/login`
        try {
            const response = await authFetch.post(url, recievedUser);
            const { user } = response.data;
            displayAlert('User login! redirecting...', 'success');
            setActiveUser(user);
            setTimeout(() => {
                setIsAuth(!isAuth);
                setCloseModal(!closeModal);
            }, 2500);
            addUserToLocalStorage({ user });
        } catch (error) {
            console.log(error.response.data.msg);
            displayAlert(error.response.data.msg, 'danger')
        }
    }

    const updateUser = async (userId, recievedUser) => {
        let url = `/auth/user/${userId}`
        try {
            const { data } = await authFetch.put(url, recievedUser);
            const { user } = data;
            displayAlert('User data has been changed!', 'success');
            setActiveUser(user);
            addUserToLocalStorage({ user });
        } catch (error) {
            if (error.response.status !== 401) {
                console.log(error.response.data.msg);
                displayAlert(error.response.data.msg, 'danger')
            }
        }
    }

    const getUserById = async (userId) => {
        const url = `/auth/user/${userId}`;
        try {
            const { data } = await authFetch.get(url);
            const { user } = data;
            setUser(user);
        } catch (error) {
            console.log(error.response);
        }
    }

    const getFullUserByUserId = async (userId) => {
        const url = `/auth/user/${userId}/full`;
        try {
            const { data } = await authFetch.get(url);
            const { user, pets } = data;
            setUser(user);
            setOwnedPets(pets);
        } catch (error) {
            console.log(error.response);
        }
    }

    const logoutUser = async () => {
        const url = `/auth/logout`
        try {
            await authFetch.get(url);
            setActiveUser(null);
            setIsAuth(false);
            removeUserToLocalStorage({ activeUser })
        } catch (error) {
            console.log(error.response.data.msg);
            displayAlert(error.response.data.msg, 'danger')
        }
    }

    const addUserToLocalStorage = ({ user, token }) => {
        localforage.setItem('user', JSON.stringify(user));
        localforage.setItem('auth', true);
    }

    const removeUserToLocalStorage = () => {
        localforage.removeItem('auth');
        localforage.removeItem('user');
    }

    const addPet = async (recievedPet, file) => {
        try {
            let url = '/pets'
            const formData = new FormData();
            formData.append('name', recievedPet.name);
            formData.append('type', recievedPet.type);
            formData.append('adoptionStatus', recievedPet.adoptionStatus);
            formData.append('height', recievedPet.height);
            formData.append('weight', recievedPet.weight);
            formData.append('color', recievedPet.color);
            formData.append('bio', recievedPet.bio);
            formData.append('hypoallergenic', recievedPet.hypoallergenic);
            formData.append('dietaryRestrictions', recievedPet.dietaryRestrictions);
            formData.append('breedOfAnimal', recievedPet.breedOfAnimal);
            formData.append('picture', file, file.name);
            await authFetch.post(url, formData);
            displayAlert('Pet created!', 'success');
        } catch (error) {
            console.log(error.response.data.msg);
            displayAlert(error.response.data.msg, 'danger')
        }
    }

    const updatePet = async (petId, setFunc, recievedPet, file) => {
        let url = `/pets/${petId}`
        try {
            let formData;
            if (file) {
                formData = new FormData();
                formData.append('name', recievedPet.name);
                formData.append('type', recievedPet.type);
                formData.append('adoptionStatus', recievedPet.adoptionStatus);
                formData.append('height', recievedPet.height);
                formData.append('weight', recievedPet.weight);
                formData.append('color', recievedPet.color);
                formData.append('bio', recievedPet.bio);
                formData.append('hypoallergenic', recievedPet.hypoallergenic);
                formData.append('dietaryRestrictions', recievedPet.dietaryRestrictions);
                formData.append('breedOfAnimal', recievedPet.breedOfAnimal);
                formData.append('picture_public_id', recievedPet.picture_public_id);
                formData.append('picture', file, file.name)
            } else {
                formData = recievedPet;
            }
            const { data } = await authFetch.put(url, formData);
            const { pets } = data;
            setFunc([...pets])
            displayAlert('Pet updated!', 'success');
        } catch (error) {
            console.log(error.response);
            displayAlert(error.response.data.msg, 'danger')
        }
    }

    const deletePet = async (petId) => {
        let url = `/pets/${petId}`
        try {
            await authFetch.delete(url);
            await getPets({}, setAllPets, 1);
            setPageAll(1);
        } catch (error) {
            console.log(error.response);
        }
    }

    const getPets = async (query, setFunc, page) => {
        let url = `/pets/`
        try {
            const { data } = await authFetch.get(url, {
                params: { page: page, ...query }
            });
            const { pets, totalPets, numOfPages } = data;
            setFunc([...pets]);
            setNumOfPages(numOfPages);
            setTotalPets(totalPets)
        } catch (error) {
            console.log(error.response);
        }
    }

    const getPetById = async (petId) => {
        const url = `/pets/${petId}`;
        try {
            const { data } = await authFetch.get(url);
            const { pet } = data;
            setPet(pet);
        } catch (error) {
            console.log(error.response);
        }
    }

    const getPetsByUserId = async (userId, petDataType) => {
        const url = `/pets/user/${userId}`;
        try {
            const { data } = await authFetch.get(url, {
                params: petDataType
            });
            const { pets } = data;
            return pets;
        } catch (error) {
            console.log(error.response);
        }
    }

    const savePet = async (petId, userId) => {
        const url = `/pets/${petId}/save`;
        try {
            const { data } = await authFetch.post(url, userId);
            const { user } = data;
            setActiveUser(user);
            localforage.setItem('user', JSON.stringify(user));
            displayAlert('Pet saved!', 'success');
        } catch (error) {
            if (error.response.status !== 401) {
                console.log(error.response.data.msg);
                displayAlert(error.response.data.msg, 'danger')
            }
        }
    }

    const unsavePet = async (petId, userId) => {
        const url = `/pets/${petId}/save`;
        try {
            const { data } = await authFetch.delete(url, {
                params: userId
            });
            const { user } = data;
            setActiveUser(user);
            localforage.setItem('user', JSON.stringify(user));
            displayAlert('Pet unsaved!', 'success');
        } catch (error) {
            if (error.response.status !== 401) {
                console.log(error.response.data.msg);
                displayAlert(error.response.data.msg, 'danger')
            }
        }
    }

    const adoptPet = async (petId, info) => {
        const url = `/pets/${petId}/adopt`;
        try {
            const { data } = await authFetch.post(url, info);
            const { user } = data;
            setActiveUser(user);
            localforage.setItem('user', JSON.stringify(user));
            if (info.adoptionStatus === 'Fostered') {
                displayAlert('Pet fostered!', 'success');
            } else {
                displayAlert('Pet adopted!', 'success');
            }
        } catch (error) {
            if (error.response.status !== 401) {
                console.log(error.response.data.msg);
                displayAlert(error.response.data.msg, 'danger')
            }
        }
    }

    const returnPet = async (petId, info) => {
        const url = `/pets/${petId}/return`;
        try {
            const { data } = await authFetch.post(url, info);
            const { user } = data;
            setActiveUser(user);
            localforage.setItem('user', JSON.stringify(user));
            displayAlert('Pet returned!', 'success');
        } catch (error) {
            if (error.response.status !== 401) {
                console.log(error.response.data.msg);
                displayAlert(error.response.data.msg, 'danger')
            }
        }
    }

    const changePage = async (pageNum) => {
        setPageAll(pageNum);
    }

    const changePageSearch = async (pageNum) => {
        setPage(pageNum);
        await getPets(query, setPetsResults, pageNum);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuth,
                setIsAuth,
                showAlert,
                setShowAlert,
                alertText,
                setAlertText,
                alertType,
                setAlertType,
                displayAlert,
                signUpUser,
                closeModal,
                loginUser,
                updateUser,
                activeUser,
                logoutUser,
                petsResults,
                getPets,
                setPetsResults,
                addPet,
                pet,
                setPet,
                usersResults,
                getAllUsers,
                savePet,
                unsavePet,
                getPetsByUserId,
                getPetById,
                adoptPet,
                returnPet,
                savedPets,
                setSavedPets,
                user,
                setUser,
                getUserById,
                getFullUserByUserId,
                ownedPets,
                deletePet,
                updatePet,
                allPets,
                setAllPets,
                totalPets,
                page,
                setPage,
                pageAll,
                setPageAll,
                numOfPages,
                changePage,
                setQuery,
                changePageSearch
            }}>
            {
                isLoading &&
                children
            }
        </AuthContext.Provider>
    )
}

export default AuthProvider
