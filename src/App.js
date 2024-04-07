import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';

import ErrorPage from './components/ErrorPage';
import Register from './components/GameRegister';
import User from './components/User';
import Main from './components/Main';

import { fetchParsedData } from './helpers/resolved-papa-data';
import ErrorMessage from './components/ErrorMessage';

import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

import {
  GAME_FORM_ACTION,
  PLAYERS_URL,
  POINTS_URL,
  USER_FORM_ACTION,
} from './helpers/urls';
import Loading from './components/loading';

const App = () => {
  /**
   * all players and their points and scores
   * should be updated:
   * - before submitting new user
   * - before logging in
   * - before submitting new game
   * - on scoreboard refresh
   * - on user profile refresh
   */
  const [scoreBoard, setScoreBoard] = useState([]);
  /* logged in user, login details from local storage */
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem('user')) || null
  );
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [load, setLoad] = useState(false);
  /**
   * get and set scoreboard data on initial render
   */
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchParsedData(POINTS_URL);
        setScoreBoard(data.sort((a, b) => b.pisteet - a.pisteet));
      } catch (error) {
        console.log('Something went wrong:', error);
      }
    }
    fetchData();
  }, []);

  /**
   * show error for 5 seconds if error changes
   */
  useEffect(() => {
    // CASE 1 :message is empty (meaning no errors). Adjust as needed
    if (!error) {
      setErrorVisible(false);
      return;
    }
    //CASE 2: error exists. Display the message and hide after 5 secs
    setErrorVisible(true);
    const timer = setTimeout(() => {
      setErrorVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  /**
   * show message for 5 seconds if message changes
   */
  useEffect(() => {
    // CASE 1 :message is empty (meaning no errors). Adjust as needed
    if (!message) {
      setMessageVisible(false);
      return;
    }
    //CASE 2: error exists. Display the message and hide after 5 secs
    setMessageVisible(true);
    const timer = setTimeout(() => {
      setMessageVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);

  /**
   * set user to local storage when user-state changes
   */
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const getPoints = () => {
    console.log('Getting points from database.');
    fetchParsedData(POINTS_URL).then((data) => {
      setScoreBoard(data);
      return data;
    });
  };

  const getPlayers = () => {
    console.log('Getting players from database.');
    const currentPlayers = fetchParsedData(PLAYERS_URL).then((data) => data);
    return currentPlayers;
  };

  const logIn = (userToLogIn) => {
    console.log('Logging in');
    getPlayers().then((data) => {
      const existing = userExists(data, userToLogIn);
      if (!existing) throw new Error('Koodilla ei löytynyt käyttäjää');
      if (existing) {
        setUser(existing);
        console.log('logged in successfully');
      }
    });
  };

  const logOut = () => {
    console.log('Logging out.');
    setUser(null);
    console.log('Logged out successfully.');
  };

  const userExists = (allUsers, userToCheck) => {
    console.log('Checking if user exists in database.');
    const existing = allUsers.find(
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
  const createUser = (newUser, formData) => {
    console.log('Creating new user:', newUser);
    setLoad(true);
    getPlayers().then((data) => {
      console.log('current players', data);
      const existingUser = userExists(data, newUser);
      if (existingUser) {
        setError(
          `Savusta ${newUser.savu_nro} on jo rekisteröitynyt pelaaja nimellä ${newUser.nimi}.`
        );
        return;
      }
      if (!existingUser) {
        setUser(newUser);
        fetch(USER_FORM_ACTION, {
          method: 'POST',
          mode: 'no-cors',
          header: {
            'Content-Type': 'application/json',
          },
          body: formData,
        })
          .then(() => {
            setUser(newUser);
            console.log('Created new user.');
            getPoints();
            setLoad(false);
          })
          .catch((error) => console.log('submit error', error.message));
      }
    });
  };

  const createGame = (newGame, formData) => {
    console.log('Creating new user:', newGame);
    setLoad(true);
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
        setError(
          `Savusta ${existingWinner.savu_nro} ei löydy  rekisteröitynyttä pelaajaa nimeltä ${existingWinner.nimi}.`
        );
        return;
      }
      if (!existingLoser) {
        setError(
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

            setLoad(false);
          })
          .catch((error) => console.log('submit error', error.message));
      }
    });
  };

  return (
    <section className='app'>
      <AppHeader />

      <ErrorMessage msg={error} visible={errorVisible} />
      <ErrorMessage msg={message} visible={messageVisible} />

      <Routes>
        <Route
          index
          path='main'
          element={<Main scoreBoard={scoreBoard} />}
          errorElement={<ErrorPage />}
        />

        {user && (
          <Route
            path='register'
            element={
              <Register
                user={user}
                setMessage={setMessage}
                setError={setError}
                setLoad={setLoad}
                createGame={createGame}
              />
            }
            errorElement={<ErrorPage />}
          />
        )}
        <Route
          path='you'
          element={
            <User
              scoreBoard={() =>
                scoreBoard.find(
                  (u) => u.nimi === user.nimi && u.savu_nro === user.savu_nro
                ) || null
              }
              logIn={logIn}
              logOut={logOut}
              user={user}
              createUser={createUser}
            />
          }
          errorElement={<ErrorPage />}
        />
      </Routes>
      {load && <Loading />}

      <AppFooter user={user} />
    </section>
  );
};

export default App;
