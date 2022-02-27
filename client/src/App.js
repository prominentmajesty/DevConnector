import React, {Fragment} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

const App = () => {
  return(
    <Fragment>
      <Router>
        <section className="container">
        <Navbar/>
          <Routes>
            <Route path='/' element={<Landing/>} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </section>
      </Router>
    </Fragment>
  )
}

export default App;