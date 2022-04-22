import {
  GET_ALL_TOURS,
  LOGIN_USER,
  LOGOUT_USER,
  SIGNUP_USER,
  SET_SELECTED_TOUR,
  SET_REVIEWS,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
    case LOGIN_USER:
      return { ...state, currentUser: action.payload };
    case LOGOUT_USER:
      return { ...state, currentUser: null, selectedTour: null, reviews: null };
    case SIGNUP_USER:
      return { ...state, currentUser: action.payload };
    case GET_ALL_TOURS:
      return { ...state, tours: action.payload, selectedTour: null, reviews: null };
    case SET_SELECTED_TOUR:
      return { ...state, selectedTour: action.payload };
    case SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
  }
};

export default reducer;
