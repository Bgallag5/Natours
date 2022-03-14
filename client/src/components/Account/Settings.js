import React, { useContext } from 'react';
import { GlobalContext } from '../../App';

import axios from 'axios';

export default function Settings({ page }) {
  const { currentUser } = useContext(GlobalContext);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;

    if (name && email) {
      //dispatch update profile
      const response = await axios({
        method: 'PATCH',
        url: '/api/v1/users/updateMe',
        data: {
          name,
          email,
        },
      });
      window.location.reload();
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    let currentPassword = document.querySelector('#password-current').value;
    let newPassword = document.querySelector('#password').value;
    let confirmNewPassword = document.querySelector('#password-confirm').value;

    if (currentPassword && newPassword && confirmNewPassword) {
      const response = await axios({
        method: 'PATCH',
        url: '/api/v1/users/updatePassword',
        data: {
          currentPassword,
          newPassword,
          confirmNewPassword,
        },
      });
    }
  };

  const handleChoosePhoto = async (e) => {
    e.preventDefault();

    const response = await axios({
      method: 'POST',
      url: '/api/v1/users/uploadPhoto',
    });
  };

  return (
    <div style={{ display: page === 'settings' ? '' : 'none' }}>
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">
          {currentUser && currentUser.name}'s Settings
        </h2>
        <form onSubmit={handleEditProfile} className="form form-user-data">
          <div className="form__group">
            <label className="form__label">Name</label>
            <input
              className="form__input"
              placeholder={currentUser.name}
              id="name"
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label">Email</label>
            <input
              className="form__input"
              placeholder={currentUser.email}
              id="email"
            />
          </div>
          <div className="form__group form__photo-upload">
            <img
              className="form__user-photo"
              src="/img/users/default.jpg"
              alt="person"
            ></img>
            <input
              className="form__upload"
              type="file"
              accept="image/*"
              id="photo"
              name="photo"
            ></input>
            <label htmlFor="photo" onClick={handleChoosePhoto}>
              Choose New Picture
            </label>
          </div>
          <div className="form__group right">
            <button type="submit" className="btn btn-small btn-green">
              Save Settings
            </button>
          </div>
        </form>
      </div>
      <div className="line">&nbsp;</div>
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Change Password</h2>
        <form
          onSubmit={handlePasswordChange}
          className="form form-user-password"
        >
          <div className="form__group">
            <label className="form__label" htmlFor="password-current">
              Current Password
            </label>
            <input
              className="form__input"
              id="password-current"
              type="password"
              placeholder="********"
            ></input>
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="password">
              New Password
            </label>
            <input
              className="form__input"
              id="password"
              type="password"
              placeholder="********"
            ></input>
          </div>
          <div className="form__group ma-bt-lg">
            <label className="form__label" htmlFor="password-confirm">
              Confirm Password
            </label>
            <input
              className="form__input"
              id="password-confirm"
              type="password"
              placeholder="********"
            ></input>
          </div>
          <div className="form__group right">
            <button className="btn btn-small btn-green btn--save--password">
              Save Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
