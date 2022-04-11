import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Overview from "./Pages/Overview";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import TourDetails from "./Pages/TourDetails";
import Account from "./Pages/Account";
import BookTour from "./Pages/BookTour";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./css/main.css";
import axios from "axios";

export const GlobalContext = React.createContext();

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState("");


  //on App load fetch /me and set to currentUser
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios({
          method: "GET",
          url: "/api/v1/users/me",
        });
        console.log(res);
        if (res.statusText === "OK") {
          setCurrentUser(res.data.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const calcNextStartDate = (datesArr) => {
    let nextTour;
    let today = new Date(Date.now());
    //loop over startDates and return the next most upcoming date
    for (let i = 0; i < datesArr.length; i++) {
      let date = new Date(datesArr[i]);
      if (today < date) {
        nextTour = date.toDateString().split(" ");
        return nextTour;
      }
    }
    return (nextTour = "No Tours Scheduled");
  };


  const globalVars = {
    currentUser,
    setCurrentUser,
    selectedTour,
    setSelectedTour,
    tours,
    setTours,
    calcNextStartDate
  };
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
