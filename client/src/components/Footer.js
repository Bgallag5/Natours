import React from 'react';

import Logo from '../../src/img/logo-green.png';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__logo">
        <img src={Logo} alt="Footer icon"></img>
      </div>
      <ul className="footer__nav">
        <li>
          <a href="/">About Us</a>
        </li>
        <li>
          <a href="/">Download App</a>
        </li>
        <li>
          <a href="/">Become a Guide</a>
        </li>
        <li>
          <a href="/">Contact</a>
        </li>
      </ul>
      <p className="footer__copyright">© 2022 by Ben Gallagher.</p>
    </div>
  );
}
