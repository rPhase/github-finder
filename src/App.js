import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import { Alert } from './components/layout/Alert';
import './App.css';
import About from './components/pages/About';
import User from './components/users/User';

class App extends React.Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  // Search Github users
  searchUsers = async (text) => {
    this.setState({ loading: true, alert: null });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    this.setState({ users: res.data.items, loading: false });
  };

  // Get single Github user
  getUser = async (username) => {
    this.setState({ loading: true, alert: null });
    const res = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });
    this.setState({ user: res.data, loading: false });
  };

  // Get users repos
  getUserRepos = async (username) => {
    this.setState({ loading: true, alert: null });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    this.setState({ repos: res.data, loading: false });
  };

  // Clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    // setTimeout(() => {
    //   this.setState({ alert: null });
    // }, 5000);
  };

  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Routes>
            <Route
              path='/'
              element={
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={this.state.users.length > 0}
                    setAlert={this.setAlert}
                  />
                  <Users
                    loading={this.state.loading}
                    users={this.state.users}
                  />
                </Fragment>
              }
            />
            <Route path='/about' element={<About />} />
            <Route
              path='/user/:username'
              element={
                <User
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
                  user={this.state.user}
                  repos={this.state.repos}
                  loading={this.state.loading}
                />
              }
            />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
