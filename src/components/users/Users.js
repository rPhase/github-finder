import React from 'react';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import { useGithub } from '../../context/github/GithubState';

const Users = () => {
  const githubState = useGithub()[0];

  const { loading, users } = githubState;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGame: '1rem',
};

export default Users;
