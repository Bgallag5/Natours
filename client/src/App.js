import React, { useEffect } from "react";

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

// import { useStoreContext } from "./GlobalStore/GlobalStore";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_USER } from "./GlobalStore/actions";


export const GlobalContext = React.createContext();

function App() {
  //useSelector to return full state
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  console.log(state);

    //on mount fetch /me and set to currentUser
    useEffect(() => {
      //if currentUser exists, do not fetch
      if (state?.currentUser){
        return
      }
      async function fetchData() {
        try {
          const res = await axios({
            method: "GET",
            url: "/api/v1/users/me",
          });
          console.log(res);
          if (res.status === 200 ) {
            //LOGIN_USER action: just sets the currentUser
            dispatch({type: LOGIN_USER, payload: res.data.data.data})
          }
        } catch (err) {
          console.log(err);
        }
      }
      fetchData();
    }, []);

  return (
    <div>
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
    </div>
  );
}

export default App;
