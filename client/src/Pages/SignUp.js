import React, { useState } from 'react';
import axios from 'axios';

export default function SignUp() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password, passwordConfirm } = formState;

    try {
      const res = await axios({
        method: 'POST',
        url: '/api/v1/users/signup',
        data: {
          name,
          email,
          password,
          passwordConfirm,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };

  return (
    <>
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Create your account!</h2>
        <form className="form form--signup" onSubmit={handleSignUp}>
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Your name
            </label>
            <input
              className="form__input"
              id="name"
              type="text"
              placeholder=""
              required=""
              value={formState.name}
              onChange={handleFormChange}
            />
          </div>
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
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="passwordConfirm">
              Confirm password
            </label>
            <input
              className="form__input"
              id="passwordConfirm"
              type="password"
              placeholder="••••••••"
              required=""
              minLength="8"
              value={formState.passwordConfirm}
              onChange={handleFormChange}
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green" type="submit">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
