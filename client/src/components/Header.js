/* eslint-disable no-lone-blocks */
import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { GlobalContext } from '../App';

export default function Header() {
  const { tours, currentUser } = useContext(GlobalContext);
  console.log(currentUser);

  const handleLogout = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: '/api/v1/users/logout',
      });
      console.log(response);
      window.location.assign('/')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <header className="header">
      <nav className="nav nav--tours">
        <a className="nav__el" href="/">
          All tours
        </a>
      </nav>
      <div className="header__logo">
        <img src="/img/logo-white.png" alt="white logo"></img>
      </div>
      <nav className="nav nav--user">
        {currentUser ? (
          <>
            <button
              className="nav__el"
              onClick={handleLogout}
            >
              Log Out
            </button>
            <Link className="nav__el nav__el--cta" to="/account">
              Welcome {currentUser.name}
            </Link>
          </>
        ) : (
          <>
            <Link
              className="nav__el"
              to={{ pathname: './login', state: { tours } }}
            >
              Log In
            </Link>
            <Link className="nav__el nav__el--cta" to="/signup">
              Sign Up
            </Link>
          </>
        )}
        {/* <a className="nav__el" href='/login'>Log In</a> */}
      </nav>
    </header>
  );
}

{
  /* <Link
  to={{
    pathname: "/courses",
    search: "?sort=name",
    hash: "#the-hash",
    state: { fromDashboard: true }
  }}
/> */
}

// pathname: A string representing the path to link to.
// search: A string representation of query parameters.
// hash: A hash to put in the URL, e.g. #a-hash.
// state: State to persist to the location.
