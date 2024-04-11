import { parseFile } from '../helpers/resolved-papa-data';
import { PLAYERS_URL, USER_FORM_ACTION } from '../helpers/urls';

export const getPlayers = async () => {
  console.log('Getting players from database.');
  const currentPlayers = await parseFile(PLAYERS_URL);
  console.log('currentplayers', currentPlayers);
  return { currentPlayers };
};

export const userExists = async (userToCheck) => {
  console.log('Checking if user exists in database.', userToCheck);
  const { currentPlayers } = await getPlayers();
  const existing = currentPlayers.find(
    (u) =>
      u.kayttaja_id === userToCheck.kayttaja_id ||
      (u.nimi === userToCheck.nimi && u.savu_nro === userToCheck.savu_nro)
  );
  return existing ? existing : false;
};

/**
 * fetches existing users
 * checks if a user with the same name and number exists
 * if not sets newUser as new user
 * @param {ikakausi,savu_nro,nimi,kayttaja_id} newUser
 */
export const createUser = async (newUser, formData) => {
  console.log('Creating new user:', newUser);
  const existingUser = await userExists(newUser);
  /** jos käyttäjä on jo olemassa, ilmoita ja älä luo */
  if (existingUser) {
    console.log(
      `Savusta ${newUser.savu_nro} on jo rekisteröitynyt pelaaja nimellä ${newUser.nimi}.`
    );
    return;
  }

  /** jos käyttäjä on jo olemassa, luo ja palauta uusi käyttäjä */
  if (!existingUser) {
    fetch(USER_FORM_ACTION, {
      method: 'POST',
      mode: 'no-cors',
      header: {
        'Content-Type': 'application/json',
      },
      body: formData,
    })
      .then(() => {
        console.log('Created new user.');
        return newUser;
      })
      .catch((error) => console.log('submit error', error.message));
  }
};
