import ToggleSidebar from './components/ToggleSidebar';
import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header';
import TravelChecklist from './components/CheckList';


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

const App = () => {
  const [selectedList, setSelectedList] = useState({ id: Date.now(), name: 'New List', items: [] });

  const handleListSelection = (list) => {
    setSelectedList(list)
  };

  return (
    <div className="App">
      <Header />
      <div style={{
        display: 'flex',
        height: '100vh',
      }}>
        <ToggleSidebar 
          style={{flex: 0}}
          onListSelect={handleListSelection}
          selectedList={selectedList}
        />
        <TravelChecklist 
          style={{flex: 1}}
          selectedList={selectedList} 
        />
      </div>
    </div>
  );
}

export default App;
