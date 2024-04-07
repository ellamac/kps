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
    <section>
      <form
        className='register form'
        method='post'
        onSubmit={handleSubmit}
        action={GAME_FORM_ACTION}
      >
        <fieldset>
          <legend>Voititko pelin?</legend>
          <label>
            <input
              defaultChecked
              type='radio'
              id='voitto1'
              name='voitto'
              onChange={(e) => onRadioButtonChange()}
            />
            Voitin
          </label>

          <label>
            <input
              type='radio'
              id='voitto2'
              name='voitto'
              onChange={(e) => onRadioButtonChange()}
            />
            Hävisin
          </label>
        </fieldset>
        <h3>Voittaja</h3>
        <input
          hidden
          readOnly
          name='entry.254335135'
          value={user.kayttaja_id}
        />
        <label>
          Voittajan nimi
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
        <label>
          Voittajan savun numero
          <input
            label='Voittajan savun numero'
            name='entry.867017418'
            value={pelaajat.voittajaNumero}
            type='number'
            required
            readOnly={playerResult}
            onChange={(e) =>
              setPelaajat((prev) => {
                return { ...prev, voittajaNumero: e.target.value };
              })
            }
          />
        </label>
        <h3>Häviäjä</h3>

        <label>
          Häviäjän nimi
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
        <label>
          Häviäjän savun numero
          <input
            label='Häviäjän savun numero'
            name='entry.397104837'
            value={pelaajat.haviajaNumero}
            type='number'
            required
            readOnly={!playerResult}
            onChange={(e) =>
              setPelaajat((prev) => {
                return { ...prev, haviajaNumero: e.target.value };
              })
            }
          />
        </label>
        <button type='submit'>Rekisteröi</button>
      </form>
    </section>
  );
};

export default Form;
