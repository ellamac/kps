import React, { useState, useEffect } from 'react';
import NewCodeInput from './NewCodeInput';

const UserLoginForm = ({ login }) => {
  const [inputUserID, setInputUserID] = useState('');

  return (
    <section className='loginUser'>
      <h2>Kirjaudu tunnisteella</h2>
      <form>
        <input
          type='text'
          onChange={(e) => setInputUserID(e.target.value)}
          value={inputUserID}
        />

        <p>
          <button
            type='button'
            onClick={() =>
              login({
                nimi: '',
                savu_nro: '',
                ikakausi: '',
                kayttaja_id: inputUserID,
              })
            }
          >
            Kirjaudu
          </button>
        </p>
      </form>
    </section>
  );
};

export default UserLoginForm;
