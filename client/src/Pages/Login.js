import React, { useState } from 'react';
import axios from 'axios';

import Header from '../components/Header';
import Footer from '../components/Footer';

//this is the way, use axios requests to hit your back end s
export default function Login() {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formState;

    try {
      const res = await axios({
        method: 'POST',
        url: '/api/v1/users/login',
        data: {
          email,
          password,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Sign into your account!</h2>
        <form className="form form--signup" onSubmit={handleLogin}>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              className="form__input"
              id="email"
              type="email"
              placeholder="you@example.com"
              required=""
              value={formState.email}
              onChange={handleFormChange}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              className="form__input"
              id="password"
              type="password"
              placeholder="••••••••"
              required=""
              minLength="8"
              value={formState.password}
              onChange={handleFormChange}
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
