import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from  'react-router-dom'
import { logout } from '../../redux/User/user.actions';

const Navbar = () => {

  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const dispatch = useDispatch();

  const logout_ = () => {
    dispatch(logout());
    navigate('/');
  }
const guestLinks = (
  <ul>
    <li><Link to = '/profiles'>Developers</Link></li>
    <li><Link to = '/register'>Register</Link></li>
    <li><Link to ='/login'>Login</Link></li>
  </ul>
)

const authLinks = (
  <ul>
    <li><Link to = '/profiles'>Developers</Link></li>
    <li><Link to='!#' onClick={logout_}><i className='fas fa-sign-out-alt'></i> {' '} <span className='hide-sm'>Logout</span></Link></li>
    <li><Link to ='/dashboard'>
      <i className='fas fa-user'></i>{''}
      Dashboard</Link></li>
  </ul>
)

  return(
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      {isAuthenticated && (authLinks)}
      {
        !isAuthenticated &&(
          guestLinks
        )
      }
    </nav>
  )
}

export default Navbar
