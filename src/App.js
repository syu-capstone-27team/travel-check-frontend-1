import logo from './assets/travel-check.png';
import ToggleSidebar from './components/ToggleSidebar';
import React, { createContext, useContext, useState } from 'react';
import './App.css';


const GlobalContext = createContext({
  user: null,
  setGlobalState: () => {},
});

export const useGlobalContext = (children) => {
  const [globalState, setGlobalState] = useState({ user: null });
  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};

const logoStyle = {
  maxWidth: '200px',
  maxHeight: '100px',
};

const App = () => {
  return (
    <div className="App">
      <header className={"page-header"}>
        <img src={logo} style={logoStyle} alt="logo" />
      </header>
      <ToggleSidebar />
      {/* <div style={pageBodyStyle}>
      </div> */}
    </div>
  );
}

export default App;
