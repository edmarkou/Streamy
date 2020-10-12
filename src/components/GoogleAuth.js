import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { signOut, signIn } from '../actions';

const GoogleAuth = (props) => {

  const auth = useRef(null);
  const [isSignedIn, setSignedIn] = useState(null);

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({ 
        clientId: "918889279839-crhg3t6637v1e4kehl06kb0j2vu8cuso.apps.googleusercontent.com",
        scope: 'email'
      }).then(() => {
        auth.current = window.gapi.auth2.getAuthInstance();
        onAuthChanged();
        auth.current.isSignedIn.listen(onAuthChanged);
      });
    });
  }, []);

  const onAuthChanged = (isSignedIn) => {
    if (isSignedIn) props.signIn();
    else props.signOut();
  }

  const onSignInClick = () => {
    auth.current.signIn();
  };

  const onSignOutClick = () => {
    auth.current.signOut();
  };

  const renderButton = () => {
    if (isSignedIn === null) return null;
    else if (isSignedIn) 
      return (
        <button onClick={onSignOutClick} className="ui red google button">
          <i className="google icon"/>
          Sign out
        </button>
      );
    else 
      return (
        <button onClick={onSignInClick} className="ui red google button">
          <i className="google icon"/>
          Sign in
        </button>
      );
  }

  return (
    <div>{renderButton()}</div>
  )
}

export default connect(null, { signIn, signOut })(GoogleAuth);