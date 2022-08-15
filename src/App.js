import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { Alert } from './components/layout/Alert';
import './App.css';
import About from './components/pages/About';
import User from './components/users/User';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/user/:username' element={<User />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </AlertState>
    </GithubState>
  );
};

export default App;
