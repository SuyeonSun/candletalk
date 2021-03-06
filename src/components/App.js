import React, {useEffect, useState} from 'react';
import AppRouter from './Router';
import {authService} from '../fbase';
import { auth } from 'firebase';


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid:user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid:user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
        {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}></AppRouter> : "Initializing..."}
    </>
  );
}

export default App;
