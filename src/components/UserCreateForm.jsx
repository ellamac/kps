import React, { useState, useEffect } from 'react';
import PopUp from './PopUp';

import cleanString from '../helpers/cleanString';
import { USER_FORM_ACTION } from '../helpers/urls';
import { createUserID } from '../helpers/userID';

import { useAuth } from '../hooks/useAuth';

const UserCreateForm = ({ createUser }) => {
  const { loginNew } = useAuth();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [newUser, setNewUser] = useState({
    ikakausi: 'Samoaja',
    savu_nro: '',
    nimi: '',
    kayttaja_id: '',
  });

  /* on initial render, creates a random userID and sets it to user newUser*/
  useEffect(() => {
    setNewUser((prev) => {
      return { ...prev, kayttaja_id: createUserID() };
    });
  }, []);

  const submitForm = () => {
    if (
      !newUser.nimi ||
      !newUser.kayttaja_id ||
      !newUser.savu_nro ||
      !newUser.ikakausi
    )
      throw new Error('Täytä kaikki kentät');

    const userToSubmit = {
      ikakausi: cleanString(newUser.ikakausi),
      savu_nro: cleanString(newUser.savu_nro),
      nimi: cleanString(newUser.nimi),
      kayttaja_id: newUser.kayttaja_id,
    };
    createUser(userToSubmit, formData);
    loginNew(userToSubmit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(new FormData(e.target));
    setOpen(true);
  };

  return (
    <section>
      <h2>Luo käyttäjä</h2>

      <form
        className='user form'
        method='post'
        onSubmit={handleSubmit}
        action={USER_FORM_ACTION}
      >
        <fieldset>
          <legend>Ikäkausi</legend>

          <label htmlFor='ikakausi1'>
            {' '}
            <input
              defaultChecked
              type='radio'
              id='ikakausi1'
              name='entry.1379240876'
              value='Samoaja'
              onChange={(e) =>
                setNewUser((prev) => {
                  return { ...prev, ikakausi: e.target.value };
                })
              }
            />
            Samoaja
          </label>

          <label htmlFor='ikakausi2'>
            {' '}
            <input
              type='radio'
              id='ikakausi2'
              name='entry.1379240876'
              value='Vaeltaja'
              onChange={(e) =>
                setNewUser((prev) => {
                  return { ...prev, ikakausi: e.target.value };
                })
              }
            />
            Vaeltaja
          </label>

          <label htmlFor='ikakausi3'>
            {' '}
            <input
              type='radio'
              id='ikakausi3'
              name='entry.1379240876'
              value='Aikuinen'
              onChange={(e) =>
                setNewUser((prev) => {
                  return { ...prev, ikakausi: e.target.value };
                })
              }
            />
            Aikuinen
          </label>
        </fieldset>
        <p>
          <label>
            <span>Sinun nimi: </span>
            {/*           <p className='info'>
            Esim. Ella, Ella M, Ellu. Tämä nimi näkyy kaikille sovellusta
            käyttäville, myös niille jotka eivät ole luoneet tunnusta. Mikäli
            tiedät savussasi olevan kaimoja, lisää nimeen sukunimen ensimmäinen
            kirjain tai käytä partionimeä!
          </p> */}
            <input
              name='entry.930006115'
              value={newUser.nimi}
              type='text'
              required
              min={2}
              onChange={(e) =>
                setNewUser((prev) => {
                  return { ...prev, nimi: e.target.value };
                })
              }
            />
          </label>
        </p>
        <p>
          <label>
            <span>Sinun savun numero: </span>
            <input
              label='Sinun savun numero'
              name='entry.2072447703'
              value={newUser.savu_nro}
              type='text'
              required
              onChange={(e) =>
                setNewUser((prev) => {
                  return { ...prev, savu_nro: e.target.value };
                })
              }
            />
          </label>
        </p>
        <input
          hidden
          readOnly
          name='entry.2025407870'
          type='text'
          value={newUser.kayttaja_id}
        />
        <p>
          <button type='submit'>Luo käyttäjä</button>
        </p>
      </form>
      <PopUp
        msg={
          <section>
            <p>Ikäkausi: {newUser.ikakausi}</p>
            <p>savun numero: {newUser.savu_nro}</p>
            <p>nimi: {newUser.nimi}</p>
          </section>
        }
        handleOK={submitForm}
        open={open}
        setOpen={setOpen}
      />
    </section>
  );
};

export default UserCreateForm;
