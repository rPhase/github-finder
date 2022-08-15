import React, { useContext, useState } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  const githubCtx = useContext(GithubContext);
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
      githubCtx.searchUsers(text);
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
      {githubCtx.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={githubCtx.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
