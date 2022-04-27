import {
  GET_ALL_TOURS,
  LOGIN_USER,
  LOGOUT_USER,
  SIGNUP_USER,
  SET_SELECTED_TOUR,
  SET_REVIEWS,
  SET_SELECTED_REVIEW,
  SET_ACCOUNT_PAGE,
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
      return {
        ...state,
        tours: action.payload,
        selectedTour: null,
        reviews: null,
      };
    case SET_SELECTED_TOUR:
      return { ...state, selectedTour: action.payload };
    case SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    //Account
    case SET_ACCOUNT_PAGE:
      return { ...state, page: action.payload };
    case SET_SELECTED_REVIEW:
      return {
        ...state,
        selectedReview: action.payload,
      };
  }
};

export default reducer;

//SET_CURRENT_USER
//
