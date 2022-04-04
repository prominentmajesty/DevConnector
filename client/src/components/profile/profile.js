import React, {useEffect, Fragment} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileByID } from '../../redux/Profile/profile.actions';
import Spiner from '../spiner';

function Profile({}) {

    useEffect(() => {
        getProfileByID();
    }, []);
    const getProfile = useSelector(state => state.profile.profile);
    const isLoading = useSelector(state => state.profile.loading);
    const auth = useSelector(state => state.user.currentUser);

  return (
    <Fragment>
        {getProfile === null || isLoading ? <Spiner /> : <Fragment>
                <Link to='/profiles' className='btn btn-light'>
                    Back To Profiles
                </Link>
                {auth !== null && isLoading === true && currentUser._id === 
                    getProfile._id && (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)
                }
            </Fragment>}
    </Fragment>
  )
}

export default Profile