import React from 'react';
import UserCreateForm from './UserCreateForm';
import UserProfile from './UserProfile';
import UserLoginForm from './UserLoginForm';

const User = ({ scoreBoard, logIn, logOut, user, createUser }) => {
  return (
    <main className='main-content'>
      {user ? (
        <UserProfile user={user} logOut={logOut} scoreBoard={scoreBoard} />
      ) : (
        <>
          <UserCreateForm createUser={createUser} />

          <UserLoginForm logIn={logIn} />
        </>
      )}
    </main>
  );
};

export default User;
