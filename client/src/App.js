import React, { useState, useEffect, useContext } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Overview from './Pages/Overview';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import TourDetails from './Pages/TourDetails';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/main.css';

export const GlobalContext = React.createContext();

function App() {
  const [currentUser, setCurrentUser] = useState('');
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState([]);

  const globalVars = {
    currentUser,
    setCurrentUser,
    selectedTour,
    setSelectedTour,
    tours,
    setTours
  };

  console.log(selectedTour);

  return (
    <GlobalContext.Provider value={globalVars}>
      <Router>
        <Header />
        <main className='main' >
        <Routes>
          <Route exact path="/" element={<Overview />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/tour/:slug" element={<TourDetails />} />
        </Routes>
        </main>
        <Footer />
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;

// import {
//   ApolloProvider,
//   ApolloClient,
//   InMemoryCache,
//   createHttpLink,
// } from "@apollo/client";
