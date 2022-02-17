import React, { useEffect, useState } from 'react';

import Settings from '../components/Account/Settings';
import Reviews from '../components/Account/Reviews';


export default function Account() {

const [page, setPage] = useState('settings');


  return (
    <main className="main">
      <div className="user-view">
        <nav className="user-view__menu">
          <ul className="side-nav">
            <li className="side-nav--active">
              <label onClick={() => setPage('settings')}>
                <i className="heading-box__icon">
                  <span className="material-icons">settings</span>
                </i>
                Settings
              </label>
            </li>
            <li>
              <label onClick={() => setPage('bookings')}>
                <i className="heading-box__icon">
                  <span className="material-icons">settings</span>
                </i>
                My Bookings
              </label>
            </li>
            <li>
              <label onClick={() => setPage('reviews')}>
                <i className="heading-box__icon">
                  <span className="material-icons">settings</span>
                </i>
                My Reviews
              </label>
            </li>
          </ul>
        </nav>
        <div className="user-view__content">
          <Settings page={page} />
          <Reviews page={page} />
        </div>
      </div>
    </main>
  );
}

//if user.admin, className = 'admin'
