import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './pages/Home';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import Profile from './pages/Profile';
import AuthProvider from './components/AuthProvider';
import Pets from './pages/Pets';
import PetPage from './pages/PetPage';
import AddPet from './pages/AddPet';
import Users from './pages/Users';
import AllPets from './pages/AllPets';
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin';
import ProtectedRoute from './components/ProtectedRoute';
import UserPage from './pages/UserPage';
import useAuth from './hooks/useAuth';

function App() {
  return (
    <div className='whole-app'>
      <AuthProvider >
        <Router>
          <NavBar />
          <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/search'  >
              <Route index element={<Search />} />
              <Route
                path=":id"
                element={
                  <PetPage />
                }
              />
            </Route>
            <Route path='/profile' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>} />
            <Route path='/pets'
              element={
                <ProtectedRoute>
                  <Pets />
                </ProtectedRoute>
              } />
            <Route path='/admin'>
              <Route
                path="/admin/addPet"
                element={
                  <ProtectedRouteAdmin>
                    <AddPet editOrAdd='Add' />
                  </ProtectedRouteAdmin>
                }
              />
              <Route
                path="/admin/users">
                <Route index element={
                  <ProtectedRouteAdmin>
                    <Users />
                  </ProtectedRouteAdmin>
                } />
                <Route
                  path=":id"
                  element={
                    <UserPage />
                  }
                />
              </Route>
              <Route
                path="/admin/allPets">
                <Route index element={
                  <ProtectedRouteAdmin>
                    <AllPets />
                  </ProtectedRouteAdmin>
                } />
                <Route
                  path=":id"
                  element={
                    <AddPet editOrAdd='Edit' />
                  }
                />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
