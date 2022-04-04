import React, {useEffect, Fragment} from 'react';
import { useSelector } from 'react-redux';
import { getAllProfile } from '../../redux/Profile/profile.actions';
import ProfilesItem from './ProfilesItem';

function Profiles() {

    const isLoading = useSelector(state => state.profile.loading);
    const profiles = useSelector(state => state.profile.profiles);

    useEffect(() => {
        getAllProfile();
    }, []);

    return (
    <Fragment>
        {
            isLoading ? <Spiner/> : <Fragment>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop" /> Browse and connect with
                    developers
                </p>
                <div className="profiles">
                    {profiles.length > 0 ? (
                    profiles.map((profile) => (
                        <ProfilesItem key={profile._id} profile={profile} />
                    ))
                    ) : (
                    <h4>No profiles found...</h4>
                    )}
                </div>
            </Fragment>
        }
    </Fragment>
    )
}

export default Profiles