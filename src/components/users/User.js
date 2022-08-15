import React, { Fragment, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';
const User = () => {
  const githubCtx = useContext(GithubContext);
  const { removeAlert } = useContext(AlertContext);
  const { username } = useParams();
  const { getUser, loading, user, repos, getUserRepos } = githubCtx;

  useEffect(() => {
    getUser(username);
    getUserRepos(username);
    removeAlert();
    // eslint-disable-next-line
  }, []);

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <NavLink to='/' className='btn btn-light'>
        Back to Search
      </NavLink>
      Hireable:{' '}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            className='round-img'
            alt='avatar'
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a
            href={html_url}
            className='btn btn-dark my-1'
            target='_blank'
            rel='noreferrer'
          >
            Visit Github Profile
          </a>
          <ul>
            <li>
              <Fragment>
                <strong>Username:</strong> {login}
              </Fragment>
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company:</strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website:</strong>
                  <a href={`https://${blog}`} target='_blank' rel='noreferrer'>
                    {' '}
                    {blog}
                  </a>
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-light'>Public Repos: {public_repos}</div>
        <div className='badge badge-dark'>Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;
