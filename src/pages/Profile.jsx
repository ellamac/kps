import { useAuth } from '../hooks/useAuth';

import NewCodeInput from '../components/NewCodeInput';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useState } from 'react';

export const ProfilePage = () => {
  const { user, login, logout } = useAuth();
  const [copyStatus, setCopyStatus] = useState(false); // To indicate if the text was copied
  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
  };

  return !user || Object.keys(user).length === 0 ? (
    <p>loading....</p>
  ) : (
    <>
      <h2>Hei {user.nimi}!</h2>
      <button type='button' onClick={() => login(user)}>
        päivitä
      </button>
      <section className='personal'>
        <h3>Käyttäjätiedot</h3>
        <p>nimi: {user.nimi}</p>
        <p>savu: {user.savu_nro}</p>
        <p>ikäkausi: {user.ikakausi}</p>
      </section>
      <section className='game'>
        <h3>Pelit</h3>

        <p>Voittoja: {user.voitot_lkm || 0}</p>
        <p>Häviöitä: {user.haviot_lkm || 0}</p>
        <p>Pisteet: {user.pisteet || 0}</p>
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
        <input type='text' readOnly value={user.kayttaja_id} />
        <CopyToClipboard text={user.kayttaja_id} onCopy={onCopyText}>
          <button>{copyStatus ? 'Kopioitu!' : 'Kopioi'}</button>
        </CopyToClipboard>
      </section>
      <section className='logout'>
        <h3>Kirjaudu ulos</h3>
        <button type='button' onClick={logout}>
          Kirjaudu ulos
        </button>
      </section>
    </>
  );
};
