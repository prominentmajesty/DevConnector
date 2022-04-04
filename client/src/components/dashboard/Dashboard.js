import React, {Fragment, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import EditProfile from '../profile-forms/EditProfile';
import { getProfile } from '../../redux/Profile/profile.actions';
import Experience from './experience';
import './styles.css';
const Dashboard = () => {

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getProfile());
    }, []);
    const getCurrentProfile = useSelector(state => state.profile.profile);
    const currentUser = useSelector(state => state.user.currentUser);


  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'/> welcome {currentUser && currentUser.name}
      </p>
      {getCurrentProfile !== null ? <Fragment>
        <EditProfile />
      </Fragment> :(
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' id='btn' className='btn btn-primary'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Dashboard