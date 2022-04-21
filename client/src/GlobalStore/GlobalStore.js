import React, { useContext, useReducer } from "react";
import reducer from "./reducers";

//init store context provider
const StoreContext = React.createContext();

//create global reducer, declare initial state
const useGlobalReducer = () => {
  return useReducer(reducer, {currentUser: null, tours: null, selectedTour: null, reviews: null});
};

//create and return store context provider
const StoreProvider = ({ value = [], ...props }) => {
  //call our reducer and pass in state and dispatch to our Provider
  const [state, dispatch] = useGlobalReducer();
  return <StoreContext.Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

//export StoreProvider to wrap our application
//export useStoreContext to access global state from any level of our applicaiton
export { StoreProvider, useStoreContext };
