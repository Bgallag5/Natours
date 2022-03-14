import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import Overview from './Pages/Overview';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import TourDetails from './Pages/TourDetails';
import Account from './Pages/Account';
import BookTour from './Pages/BookTour';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/main.css';
import axios from 'axios';

export const GlobalContext = React.createContext();

function App() {
  const [currentUser, setCurrentUser] = useState('');
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState('');

  const globalVars = {
    currentUser,
    setCurrentUser,
    selectedTour,
    setSelectedTour,
    tours,
    setTours,
  };
  //on App load fetch /me and set to currentUser
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios({
          method: 'GET',
          url: 'http://localhost:3000/api/v1/users/me',
        });
        console.log(res);
        if (res.statusText === 'OK') {
          setCurrentUser(res.data.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  console.log(selectedTour);
  console.log(currentUser);

  return (
    <GlobalContext.Provider value={globalVars}>
      <Router>
        <Header />
        <main className="main">
          <Routes>
            <Route exact path="/" element={<Overview />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/tour/:slug" element={<TourDetails />} />
            <Route exact path="tour/:slug/book" element={<BookTour />} />
            <Route exact path="/account" element={<Account />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
