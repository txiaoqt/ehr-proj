import React, { createContext, useState, useContext, useCallback } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  // state structure: { view: 'dashboard', params: { id: 123 } }
  const [currentRoute, setCurrentRoute] = useState({ view: 'dashboard', params: {} });

  const navigate = useCallback((view, params = {}) => {
    setCurrentRoute({ view, params });
    console.log(`Navigating to: ${view}`, params);
  }, []);

  const value = {
    currentView: currentRoute.view,
    currentParams: currentRoute.params,
    navigate,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};