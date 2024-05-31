import ToggleSidebar from './components/ToggleSidebar';
import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header';
import TravelChecklist from './components/CheckList';

import './fonts.css';


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
  const [duplicateList, setDuplicateList] = useState([])
  const [duplicateTarget, setDuplicateTarget] = useState([])

  const handleListSelection = (list) => {
    setSelectedList(list)
  };

  const handleDuplicateList = (list) => {
    setDuplicateList(list)
  }
  
  const handleDuplicateTarget = (list) => {
    setDuplicateTarget(list)
  }


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
          onDuplicateList={handleDuplicateList}
          onDuplicateTarget={handleDuplicateTarget}
          selectedList={selectedList}
        />
        <TravelChecklist 
          style={{flex: 1}}
          selectedList={selectedList}
          duplicateList={duplicateList}
          duplicateTarget={duplicateTarget}
        />
      </div>
    </div>
  );
}

export default App;
