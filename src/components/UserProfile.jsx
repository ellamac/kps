import React, { useState, useEffect } from 'react';
import NewCodeInput from './NewCodeInput';
import CopyToClipboard from 'react-copy-to-clipboard';
import '../styles/loggedinUser.css';
import Loading from './loading';

const UserProfile = ({ user, logOut, scoreBoard }) => {
  const [copyStatus, setCopyStatus] = useState(false); // To indicate if the text was copied

  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
  };

  return (
    <section className='details'>
      <h2>Hei {user.nimi}!</h2>
      <section className='personal'>
        <h3>Käyttäjätiedot</h3>
        <p>nimi: {user.nimi}</p>
        <p>savu: {user.savu_nro}</p>
        <p>ikäkausi: {user.ikakausi}</p>
      </section>
      <section className='game'>
        <h3>Pelit</h3>

        {scoreBoard ? (
          <>
            <p>Voittoja: {scoreBoard.voitot_lkm || 0}</p>
            <p>Häviöitä: {scoreBoard.haviot_lkm || 0}</p>
            <p>Pisteet: {scoreBoard.pisteet || 0}</p>
          </>
        ) : (
          <p>et ole vielä pelannut</p>
        )}
      </section>
      <section className='id'>
        <h3>Käyttäjätunniste</h3>
        <p>
          Käyttäjätunnisteella pääset kirjautumaan takaisin sisään. Vain
          kirjautuneet käyttäjät voivat rekisteröidä pelejä.
        </p>
        <p>
          Tallenna tunniste esimerkiksi kopioimalla se muistiinpanoihin tai
          ottamalla screenshot.
        </p>
        <p>Sinun käyttäjätunniste on:</p>
        <NewCodeInput readOnly value={user.kayttaja_id} />
        <CopyToClipboard text={user.kayttaja_id} onCopy={onCopyText}>
          <button>{copyStatus ? 'Kopioitu!' : 'Kopioi'}</button>
        </CopyToClipboard>
      </section>
      <section className='logout'>
        <h3>Kirjaudu ulos</h3>
        <button type='button' onClick={logOut}>
          Kirjaudu ulos
        </button>
      </section>
    </section>
  );
};

export default UserProfile;
