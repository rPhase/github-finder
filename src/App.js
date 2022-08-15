import React, { Fragment, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import { Alert } from './components/layout/Alert';
import './App.css';
import About from './components/pages/About';
import User from './components/users/User';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search Github users
  const searchUsers = async (text) => {
    setLoading(true);
    setAlert(null);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  // Get single Github user
  const getUser = async (username) => {
    setLoading(true);
    setAlert(null);
    const res = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });
    setUser(res.data);
    setLoading(false);
  };

  // Get users repos
  const getUserRepos = async (username) => {
    setLoading(true);
    setAlert(null);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    setRepos(res.data);
    setLoading(false);
  };

  // Clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // Set Alert
  const setAlertHandler = (msg, type) => {
    setAlert({ msg, type });
    // setTimeout(() => {
    //   this.setState({ alert: null });
    // }, 5000);
  };

  return (
    <div className='App'>
      <Navbar />
      <div className='container'>
        <Alert alert={alert} />
        <Routes>
          <Route
            path='/'
            element={
              <Fragment>
                <Search
                  searchUsers={searchUsers}
                  clearUsers={clearUsers}
                  showClear={users.length > 0}
                  setAlert={setAlertHandler}
                />
                <Users loading={loading} users={users} />
              </Fragment>
            }
          />
          <Route path='/about' element={<About />} />
          <Route
            path='/user/:username'
            element={
              <User
                getUser={getUser}
                getUserRepos={getUserRepos}
                user={user}
                repos={repos}
                loading={loading}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
