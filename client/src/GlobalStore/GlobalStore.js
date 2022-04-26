import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createStore } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

//redux persist - persist state on reloads 
const persistedReducer = persistReducer(persistConfig, reducer);
let store = createStore(persistedReducer);
let persistor = persistStore(store);

export {store, persistor}

// export default persistedStore;

///////// OLD CONTEXT PROVIDER //////////
// import React, { useContext, useReducer } from "react";
// import reducer from "./reducers";

// //init store context provider
// const StoreContext = React.createContext();

// //create global reducer, declare initial state
// const useGlobalReducer = () => {
//   return useReducer(reducer, {currentUser: null, tours: null, selectedTour: null, reviews: null});
// };

// //create and return store context provider
// const StoreProvider = ({ value = [], ...props }) => {
//   //call our reducer and pass in state and dispatch to our Provider
//   const [state, dispatch] = useGlobalReducer();
//   return <StoreContext.Provider value={[state, dispatch]} {...props} />;
// };

// const useStoreContext = () => {
//   return useContext(StoreContext);
// };

// //export StoreProvider to wrap our application
// //export useStoreContext to access global state from any level of our applicaiton
// export { StoreProvider, useStoreContext };
