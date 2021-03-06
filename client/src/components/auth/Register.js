import React, {Fragment, useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { register } from '../../redux/User/user.actions';


const Register = () => {

  const [formData, setFormData] = useState({
    name : '',
    email : '',
    password : '',
    password2 : ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  useEffect(() => {
    if(isAuthenticated){
      navigate('/');
    }
  }, [isAuthenticated]);

  const {name, email, password, password2} = formData;

  const onChange = e => setFormData({...formData, [e.target.name] : e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    if(password !== password2) {
      console.log('Password Do not match');
    }else{
      // Please note that this commented section is just to show u how to make post request from your component if you dont want to use Redux Action
      //   const newUser = {
      //     name,
      //     email,
      //     password,
      //   }

      //   try{
      //     const config = {
      //       headers : {
      //         'Content-Type' : 'application/json'
      //       }
      //     }
          
      //     const body = JSON.stringify(newUser);
      //     const res = await axios.post('api/users/', body, config);
      //     console.log(res.data);

      //   }catch(err){
      //     console.log(err.response.data);
      //   }

      dispatch(register({name, email, password}));
    }
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  )
}

export default Register