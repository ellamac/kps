import React, { useState, useEffect } from 'react';
import NewCodeInput from './NewCodeInput';
import { logIn } from '../helpers/logger';
import { PLAYERS_URL } from '../helpers/urls';
import '../styles/loginUser.css';

const UserLoginForm = ({ logIn }) => {
  const [inputUserID, setInputUserID] = useState('');

  return (
    <section className='loginUser'>
      <h2>Kirjaudu tunnisteella</h2>
      <form>
        <NewCodeInput
          inputUserID={inputUserID}
          setInputUserID={setInputUserID}
        />
        <button
          type='button'
          onClick={() =>
            logIn({
              nimi: '',
              savu_nro: '',
              ikakausi: '',
              kayttaja_id: inputUserID,
            })
          }
        >
          Kirjaudu
        </button>
      </form>
    </section>
  );
};

export default UserLoginForm;
