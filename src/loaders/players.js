import { parseFile } from '../helpers/resolved-papa-data';
import { PLAYERS_URL, USER_FORM_ACTION } from '../helpers/urls';
import { createUserID } from '../helpers/userID';

export const getPlayers = async () => {
  console.log('Getting players from database.');
  const currentPlayers = await parseFile(PLAYERS_URL);
  console.log('currentplayers', currentPlayers);
  return { currentPlayers };
};

export const userExists = async (userToCheck) => {
  console.log('Checking if user exists in database.', userToCheck);
  const { currentPlayers } = await getPlayers();

  const existingID = currentPlayers.find(
    (u) => u.kayttaja_id === userToCheck.kayttaja_id
  );
  const existingName = currentPlayers.find(
    (u) => u.nimi === userToCheck.nimi && u.savu_nro === userToCheck.savu_nro
  );
  return [existingID || false, existingName || false];
};

/**
 * fetches existing users
 * checks if a user with the same name and number exists
 * if not sets newUser as new user
 * @param {ikakausi,savu_nro,nimi,kayttaja_id} newUser
 */
export const createUser = async (newUser, formData) => {
  newUser = { ...newUser, kayttaja_id: 'RRU652' };
  formData.set('kayttaja_id', 'IZY674');
  console.log('Creating new user:', newUser, formData.keys());
  let existingUser = await userExists(newUser);
  console.log('exsiting', existingUser);
  /** jos käyttäjä id on jo käytössä luo uusi */
  while (existingUser[0]) {
    console.log('User id already existed so made another one');
    const newID = createUserID();
    newUser = { ...newUser, kayttaja_id: newID };
    formData.set('kayttaja_id', newID);
    existingUser = await userExists(newUser);
  }

  /** jos käyttäjä on jo olemassa, ilmoita ja älä luo */
  if (existingUser[1]) {
    console.log(
      `Savusta ${newUser.savu_nro} on jo rekisteröitynyt pelaaja nimellä ${newUser.nimi}.`
    );
    return;
  }

  /** jos käyttäjä ei ole jo olemassa, luo ja palauta uusi käyttäjä */
  if (!existingUser[1]) {
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
