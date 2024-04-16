import React, { useState } from 'react';
import PopUp from './PopUp';
import Form from './GameForm';
import cleanString from '../helpers/cleanString';
import { useAuth } from '../hooks/useAuth';
import { createGame } from '../loaders/points';

const GameRegister = () => {
  const { user, updateUser } = useAuth();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [userWon, setUserWon] = useState(true);
  const [pelaajat, setPelaajat] = useState({
    voittajaNimi: user.nimi,
    voittajaNumero: user.savu_nro,
    haviajaNimi: '',
    haviajaNumero: '',
  });

  const switchPlayers = () => {
    setPelaajat((prev) => {
      return {
        voittajaNimi: prev.haviajaNimi,
        voittajaNumero: prev.haviajaNumero,
        haviajaNimi: prev.voittajaNimi,
        haviajaNumero: prev.voittajaNumero,
      };
    });
    setUserWon((prev) => !prev);
  };

  const submitForm = () => {
    if (
      !pelaajat.haviajaNimi ||
      !pelaajat.haviajaNumero ||
      !pelaajat.voittajaNimi ||
      !pelaajat.voittajaNumero
    )
      throw new Error('Täytä kaikki kentät');
    const gameToSubmit = {
      voittaja_savu_nro: cleanString(pelaajat.voittajaNumero),
      voittaja_nimi: cleanString(pelaajat.voittajaNimi),
      haviaja_savu_nro: cleanString(pelaajat.haviajaNumero),
      haviaja_nimi: cleanString(pelaajat.haviajaNimi),
    };
    createGame(gameToSubmit, formData);
    setPelaajat({
      voittajaNimi: user.nimi,
      voittajaNumero: user.savu_nro,
      haviajaNimi: '',
      haviajaNumero: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(new FormData(e.target));
    setOpen(true);
  };
  return (
    <>
      <h2>Rekisteröi peli</h2>
      {!user || Object.keys(user).length === 0 ? (
        <p>loading...</p>
      ) : 'timestamp' in user ? (
        <Form
          handleSubmit={handleSubmit}
          pelaajat={pelaajat}
          setPelaajat={setPelaajat}
          playerResult={userWon}
          user={user}
          onRadioButtonChange={switchPlayers}
        />
      ) : (
        <label>
          Tunnuksesi ei ole vielä tallentunut tietokantaan{' '}
          <button type='button' onClick={() => updateUser(user)}>
            päivitä sivu ja kokeile uudestaan
          </button>
        </label>
      )}

      <PopUp
        msg={`Voittaja: ${pelaajat.voittajaNimi}, ${pelaajat.voittajaNumero}, Häviäjä: ${pelaajat.haviajaNimi}, ${pelaajat.haviajaNumero}`}
        handleOK={submitForm}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default GameRegister;
