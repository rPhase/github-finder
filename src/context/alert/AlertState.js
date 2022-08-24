import React, { useState } from 'react';
import AlertContext from './alertContext';

const AlertState = (props) => {
  const [alert, setAlertState] = useState(null);

  // Set Alert
  const setAlert = (msg, type) => {
    setAlertState({ msg, type });
  };

  // Remove Alert
  const removeAlert = () => {
    setAlertState(null);
  };

  return (
    <AlertContext.Provider
      value={{
        alert,
        setAlert,
        removeAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
