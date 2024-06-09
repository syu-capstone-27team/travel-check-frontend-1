import React from 'react';
import Login from './components/Login'
import Main from './components/Main';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
    return (
      <div>
        <Router>
          {/* default */}
          <Routes>
            <Route path='/' Component={Login} />
            <Route path='/Main' Component={Main} />
          </Routes>
        </Router>
      </div>
    );
};

export default App;