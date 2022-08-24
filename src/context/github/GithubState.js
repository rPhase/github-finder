import React, { useContext, useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';

// Create a custom hook to use Github context
export const useGithub = () => {
  const { state, dispatch } = useContext(GithubContext);
  return [state, dispatch];
};

// Action Creators
const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
});

// Search Github users
export const searchUsers = async (dispatch, text) => {
  dispatch({ type: SET_LOADING });
  const res = await github.get(`search/users?q=${text}`);
  dispatch({
    type: SEARCH_USERS,
    payload: res.data.items,
  });
};

// Get single Github user
export const getUser = async (dispatch, username) => {
  dispatch({ type: SET_LOADING });
  const res = await github.get(`users/${username}`);
  dispatch({
    type: GET_USER,
    payload: res.data,
  });
};

// Get users repos
export const getUserRepos = async (dispatch, username) => {
  dispatch({ type: SET_LOADING });
  const res = await github.get(
    `users/${username}/repos?per_page=5&sort=created:asc`
  );
  dispatch({
    type: GET_REPOS,
    payload: res.data,
  });
};

// Clear users from state
export const clearUsers = (dispatch) => dispatch({ type: CLEAR_USERS });

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  return (
    <GithubContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
