import ToggleSidebar from './ToggleSidebar';
import React, { createContext, useState } from 'react';
import '../App.css';
import Header from './Header';
import TravelChecklist from './CheckList';

import '../fonts.css';
import styles from './index.module.scss';


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

const Main = () => {
  const [selectedList, setSelectedList] = useState({ id: Date.now(), name: 'New List', items: [], saved: false });
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
      <div className={styles.mainContent}>
        <ToggleSidebar 
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

export default Main;
