import React,{useState, useEffect, Fragment} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createProfile } from '../../redux/Profile/profile.actions';
import { getProfile } from '../../redux/Profile/profile.actions';
import { resetCreateProfileSuccess_ } from '../../redux/Profile/profile.actions';
import { resetCreateProfileFailur_ } from '../../redux/Profile/profile.actions';
import {checkIfAuthenticated} from '../../utils/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile2 = () => {

    const profile = useSelector(state => state.profile.profile);
    const createProfileSuccess = useSelector(state => state.profile.createProfileSuccess);
    const createProfileFailure = useSelector(state => state.profile.createProfileFailure);
    const loading = useSelector(state => state.profile.loading);
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(createProfileSuccess){
            toast.success('Action successfuly completed');
            dispatch(resetCreateProfileSuccess_());
        }
    }, [createProfileSuccess]);

    useEffect(() => {
        if(createProfileFailure){
            console.log('Create Profile has Failed..');
            toast.error('Action Failed !! Re-try..');
            dispatch(resetCreateProfileFailur_());
        }
    }, [createProfileFailure]);

    const [formData, setFormData] = useState({
        company : '',
        website : '',
        location : '',
        status : '',
        skills : '',
        githubusername : '',
        bio : '',
        twitter : '',
        facebook : '',
        linked : '',
        youtube : '',
        instagram : ''
    }); 

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    useEffect(() => {
        if(loading){
            getProfile();
            setFormData({
                company : loading || !profile.company ? '' : profile.company,
                website : loading || !profile.website ? '' : profile.website,
                location : loading || !profile.location ? '' : profile.location,
                status : loading || !profile.status ? '' : profile.status,
                skills : loading || !profile.skills ? '' : profile.skills.join(','),
                githubusername : loading || !profile.githubusername ? '' : profile.githubusername,
                bio : loading || !profile.bio ? '' : profile.bio,
                twitter : loading || !profile.twitter ? '' : profile.twitter,
                facebook : loading || !profile.facebook ? '' : profile.facebook,
                linkedin : loading || !profile.linkedin ? '' : profile.linkedin,
                youtube : loading || !profile.youtube ? '' : profile.youtube,
                instagram : loading || !profile.instagram ? '' : profile.instagram,
            });
        }
    }, [loading]);

    const  {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name] : e.target.value});
    
    const onSubmit = evt => {
        evt.preventDefault();
        dispatch(createProfile(formData));
    }
    const checkAuth = checkIfAuthenticated(token);

    if(!checkAuth)
        return <div className="restrict_">
            <h3 className="restric"> You are not authorize to view this page. Only logged in users can access this page</h3>
            <button 
                class="btn btn-light my-1" id='btn'
                onClick={() => navigate('/dashboard')}
            >
                Back to Home
                <i class="material-icons right">home</i>
            </button>
        </div>

    return (
    <section className="container">
        <h1 className="large text-primary">
        {!profile ? 'Create Your Profile' : 'Edit Your Profile'}
      </h1>
      <p className="lead">
        <i className="fas fa-user" />
        {!profile
          ? ` Let's get some information to make your profile stand out`
          : ' Add some changes to your profile'}
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit} >
        <ToastContainer />
        <div className="form-group">
          <select name="status" value={status} onChange={e => onChange(e)}>
            <option>* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
           onChange={e => onChange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
          onClick={() => toggleSocialInputs(!displaySocialInputs)}
           id='btn'
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

            {displaySocialInputs && 
                <Fragment>
                <div className="form-group social-input">
                  <i className="fab fa-twitter fa-2x" />
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    name="twitter"
                    value={twitter}
                    onChange={e => onChange(e)}
                  />
                </div>
    
                <div className="form-group social-input">
                  <i className="fab fa-facebook fa-2x" />
                  <input
                    type="text"
                    placeholder="Facebook URL"
                    name="facebook"
                    value={facebook}
                    onChange={e => onChange(e)}
                  />
                </div>
    
                <div className="form-group social-input">
                  <i className="fab fa-youtube fa-2x" />
                  <input
                    type="text"
                    placeholder="YouTube URL"
                    name="youtube"
                    value={youtube}
                    onChange={e => onChange(e)}
                  />
                </div>
    
                <div className="form-group social-input">
                  <i className="fab fa-linkedin fa-2x" />
                  <input
                    type="text"
                    placeholder="Linkedin URL"
                    name="linkedin"
                    value={linkedin}
                    onChange={e => onChange(e)}
                  />
                </div>
    
                <div className="form-group social-input">
                  <i className="fab fa-instagram fa-2x" />
                  <input
                    type="text"
                    placeholder="Instagram URL"
                    name="instagram"
                    value={instagram}
                    onChange={e => onChange(e)}
                  />
                </div>
              </Fragment>
            }
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" id='btn' to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  )
}

export default EditProfile2