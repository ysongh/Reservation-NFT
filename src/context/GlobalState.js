import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const inititalState = {
  navigation: null
}

export const GlobalContext = createContext(inititalState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, inititalState);

  function setNavigation(navigation){
    dispatch({
      type: "SET_NAVIGATION",
      payload: navigation
    })
  }

  return (<GlobalContext.Provider value={{
    navigation: state.navigation,
    setNavigation
  }}>
    {children}
  </GlobalContext.Provider>);
}