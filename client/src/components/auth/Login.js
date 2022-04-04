import React, {Fragment, useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { login } from '../../redux/User/user.actions';

// const mapState = ({user}) => ({
//   isAuthenticated : user.isAuthenticated
// });

const Login = () => {

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email : '',
    password : ''
  });

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  const navigate = useNavigate(); 

  useEffect(() => {
     if(isAuthenticated){
        navigate('/dashboard');
     }
 }, [isAuthenticated]); 

  const {email, password} = formData;

  const onChange = e => setFormData({...formData, [e.target.name] : e.target.value});

  const onSubmit = async e => {
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
      e.preventDefault();
      dispatch(login({email, password}));
 
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength={6}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </Fragment>
  )
}

export default Login