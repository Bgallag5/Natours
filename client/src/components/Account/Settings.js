import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Settings({ currentUser, page }) {
  const navigate = useNavigate();

  //handle edit user info
  const handleEditProfile = async (e) => {
    e.preventDefault();
    //capture form data
    const form = new FormData();
    form.append("name", document.querySelector("#name").value);
    form.append("email", document.querySelector("#email").value);
    form.append("photo", document.getElementById("photo").files[0]);
    console.log(form);
    //api request to /updateMe
    try {
      //dispatch update profile
      const response = await axios({
        method: "PATCH",
        url: "/api/v1/users/updateMe",
        data: form,
      });
      console.log(response);
      navigate("/account");
    } catch (err) {
      console.log(err);
    }
  };

  //handle edit user's password
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    let currentPassword = document.querySelector("#password-current").value;
    let newPassword = document.querySelector("#password").value;
    let confirmNewPassword = document.querySelector("#password-confirm").value;

    if (currentPassword && newPassword && confirmNewPassword) {
      const response = await axios({
        method: "PATCH",
        url: "/api/v1/users/updatePassword",
        data: {
          currentPassword,
          newPassword,
          confirmNewPassword,
        },
      });
      navigate("/account");
    }
  };

  console.log(currentUser);

  return (
    <div style={{ display: page === "settings" ? "" : "none" }}>
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
              src={`/img/users/${currentUser.photo ?? "default.jpg"}`}
              alt="person"
            ></img>
            <input
              className="form__upload img__upload"
              type="file"
              accept="image/*"
              id="photo"
              name="photo"
            ></input>
            <label htmlFor={"photo"}>Choose New Picture</label>
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
