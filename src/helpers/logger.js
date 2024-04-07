import { fetchParsedData } from './resolved-papa-data';
import { PLAYERS_URL } from './urls';

export const logIn = (id, setUser) => {
  async function fetchData() {
    try {
      const data = await fetchParsedData(PLAYERS_URL);
      console.log('data', data);

      const user = data.find((d) => d.kayttaja_id === id);
      console.log('logging in');
      console.log('user', user);
      console.log('inputted id', id);
      if (!user) throw new Error('Koodilla ei löytynyt käyttäjää');
      if (user) setUser(user);
    } catch (error) {
      console.log('Something went wrong:', error);
    }
  }
  fetchData();
};

export const logInLocal = (user, setUser) => {
  setUser(user);
};
