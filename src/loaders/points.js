import { parseFile } from '../helpers/resolved-papa-data';
import { GAME_FORM_ACTION, POINTS_URL } from '../helpers/urls';
import { getPlayers, userExists } from './players';

export const getPoints = async () => {
  console.log('Getting points from database.');
  const currentPoints = await parseFile(POINTS_URL);
  return { currentPoints };
};

export const createGame = async (newGame, formData) => {
  console.log('Creating new user:', newGame);
  getPlayers().then((data) => {
    console.log('current players', data);
    const existingWinner = userExists(data, {
      nimi: newGame.voittaja_nimi,
      savu_nro: newGame.voittaja_savu_nro,
    });
    const existingLoser = userExists(data, {
      nimi: newGame.haviaja_nimi,
      savu_nro: newGame.haviaja_savu_nro,
    });
    if (!existingWinner) {
      console.log(
        `Savusta ${existingWinner.savu_nro} ei löydy  rekisteröitynyttä pelaajaa nimeltä ${existingWinner.nimi}.`
      );
      return;
    }
    if (!existingLoser) {
      console.log(
        `Savusta ${existingLoser.savu_nro} ei löydy  rekisteröitynyttä pelaajaa nimeltä ${existingLoser.nimi}.`
      );
      return;
    }
    if (existingWinner && existingLoser) {
      fetch(GAME_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        header: {
          'Content-Type': 'application/json',
        },
        body: formData,
      })
        .then(() => {
          console.log('Created new game.');
          getPoints();
        })
        .catch((error) => console.log('submit error', error.message));
    }
  });
};
