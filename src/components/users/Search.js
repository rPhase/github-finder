import React, { useContext, useState } from 'react';
import AlertContext from '../../context/alert/alertContext';
import {
  useGithub,
  searchUsers,
  clearUsers,
} from '../../context/github/GithubState';

const Search = () => {
  const [githubState, githubDispatch] = useGithub();

  const alertCtx = useContext(AlertContext);

  const [text, setText] = useState('');

  const onChangeHandler = (e) => {
    setText(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === '') {
      alertCtx.setAlert('Please enter something', 'light');
    } else {
      searchUsers(githubDispatch, text);
      setText('');
      alertCtx.removeAlert();
    }
  };

  return (
    <div>
      <form className='form' onSubmit={onSubmitHandler}>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChangeHandler}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {githubState.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={() => clearUsers(githubDispatch)}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
