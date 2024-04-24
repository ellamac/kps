import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { createUserID } from '../helpers/userID';

const AppFooter = ({ pages }) => {
  return (
    <footer className='main-footer'>
      <nav>
        {pages.map((p, i) => (
          <NavLink key={`nav-button-${i}`} to={p.path} activeclassname='active'>
            {p.icon || ''}
            <p>{p.label}</p>
          </NavLink>
        ))}
      </nav>
    </footer>
  );
};

export default AppFooter;
