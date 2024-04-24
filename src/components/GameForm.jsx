import React from 'react';
import { GAME_FORM_ACTION } from '../helpers/urls';

const Form = ({
  handleSubmit,
  pelaajat,
  setPelaajat,
  playerResult,
  user,
  onRadioButtonChange,
}) => {
  return (
    <form
      className='register form'
      method='post'
      onSubmit={handleSubmit}
      action={GAME_FORM_ACTION}
    >
      <fieldset>
        <legend>Voititko pelin?</legend>
        <label for='voitto1'>
          <input
            defaultChecked
            type='radio'
            id='voitto1'
            name='voitto'
            onChange={(e) => onRadioButtonChange()}
          />
          <span>Voitin</span>
        </label>
        <label for='voitto2'>
          {' '}
          <input
            type='radio'
            id='voitto2'
            name='voitto'
            onChange={(e) => onRadioButtonChange()}
          />
          <span>Hävisin</span>
        </label>
      </fieldset>
      <fieldset>
        <legend>Voittaja</legend>
        <input
          hidden
          readOnly
          name='entry.254335135'
          value={user.kayttaja_id}
        />
        <p>
          <label>
            <span>Voittajan nimi: </span>
            <input
              name='entry.1690286666'
              value={pelaajat.voittajaNimi}
              required
              readOnly={playerResult}
              onChange={(e) =>
                setPelaajat((prev) => {
                  return { ...prev, voittajaNimi: e.target.value };
                })
              }
            />
          </label>
        </p>
        <p>
          <label>
            <span>Voittajan savun numero: </span>
            <input
              label='Voittajan savun numero'
              name='entry.867017418'
              value={pelaajat.voittajaNumero}
              type='text'
              required
              readOnly={playerResult}
              onChange={(e) =>
                setPelaajat((prev) => {
                  return { ...prev, voittajaNumero: e.target.value };
                })
              }
            />
          </label>
        </p>
      </fieldset>
      <fieldset>
        <legend>Häviäjä</legend>
        <p>
          <label>
            <span>Häviäjän nimi: </span>
            <input
              label='Häviäjän nimi'
              name='entry.1852118820'
              value={pelaajat.haviajaNimi}
              required
              readOnly={!playerResult}
              onChange={(e) =>
                setPelaajat((prev) => {
                  return { ...prev, haviajaNimi: e.target.value };
                })
              }
            />
          </label>
        </p>
        <p>
          <label>
            <span>Häviäjän savun numero: </span>
            <input
              label='Häviäjän savun numero'
              name='entry.397104837'
              value={pelaajat.haviajaNumero}
              type='text'
              required
              readOnly={!playerResult}
              onChange={(e) =>
                setPelaajat((prev) => {
                  return { ...prev, haviajaNumero: e.target.value };
                })
              }
            />
          </label>
        </p>
      </fieldset>
      <section>
        <p>
          <button type='submit'>Rekisteröi</button>
        </p>
      </section>
    </form>
  );
};

export default Form;
