import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreatenProfile from './components/profile-forms/CreatenProfile';
import EditProfile from './components/profile-forms/EditProfile';
import EditProfile2 from './components/profile-forms/EditProfile2';
import AddExperience from './components/profile-forms/AddExperience';
import Profiles from './components/profiles/profiles';
import Profile from '../../models/Profile';
import { loadUser } from './redux/User/user.actions'; 
import './App.css';

// This url will teach u how you can update a particular data in mongo dababase array
//https://stackoverflow.com/questions/11372065/mongodb-how-do-i-update-a-single-subelement-in-an-array-referenced-by-the-inde

const App = () => {

  const dispatch = useDispatch();

  let isAuthenticated = useSelector(state => state.user.isAuthenticated);

  function RequireAuth({children, redirectTo}) {
    return isAuthenticated ? children : <Navigate to={redirectTo}/>
  }
  useEffect(() => {
      if(isAuthenticated){
        dispatch(loadUser());
      }
  },[isAuthenticated]);

  return(
    <Fragment>
      <Router>
        <section className="container">
        <Navbar/>
          <Routes>
            <Route path='/' element={<Landing/>} />
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profiles' element={<Profiles/>}/>
            <Route path='/editprofile' element={<EditProfile/>}/>
            <Route path='/edit-profile' element={<EditProfile2/>}/>
            <Route path='/add-experience' element={<AddExperience/>}/>
            <Route path='/profile/:id' element={<Profile/>}/>
            <Route path='/dashboard'
              element={
                <RequireAuth redirectTo = '/login'>
                  <Dashboard />
                </RequireAuth> 
              }
            />
            <Route path='/create-profile'
              element={
                <RequireAuth redirectTo = '/dashboard'>
                  <CreatenProfile/>
                </RequireAuth> 
              }
            />
          </Routes>
        </section>
      </Router>
    </Fragment>
  )
}

export default App;