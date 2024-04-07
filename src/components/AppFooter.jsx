import React from 'react';
import { Link } from 'react-router-dom';

const AppFooter = ({ user }) => {
  return (
    <footer className='main-footer'>
      <Link to={`main`}>stats</Link>
      {user && <Link to={`register`}>register</Link>}
      <Link to={`you`}>you</Link>
    </footer>
  );
};

export default AppFooter;
