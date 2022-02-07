import React from 'react';

import Logo from '../img/logo-white.png';

export default function Header() {
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <a className="nav__el" href='/'>All tours</a>
      </nav>
      <div className="header__logo">
        <img src={Logo} alt="white logo"></img>
      </div>
      <nav className="nav nav--user">
        <a className="nav__el" href='/'>Log In</a>
        <a className="nav__el nav__el--cta" href='/'>Sign Up</a>
      </nav>
    </header>
  );
}
