import logo from './assets/travel-check.png';
import React, { useState } from 'react';
import './App.css';


const Checklist = () => {
  const [items, setItems] = useState([
    { id: 1, name: '여권', checked: false },
    { id: 2, name: '비행기 티켓', checked: false },
    { id: 3, name: '호텔 예약 확인서', checked: false },
    // 추가하고 싶은 항목을 이곳에 넣으세요.
  ]);

  const toggleCheck = id => {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div>
      <h1>여행지 준비물 체크리스트</h1>
      {items.map(item => (
        <div key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleCheck(item.id)}
            />
            {item.name}
          </label>
        </div>
      ))}
    </div>
  );
};

const headerStyle = {
  textAlign: 'center',
  padding: '20px 0',
};

const logoStyle = {
  maxWidth: '200px',
  maxHeight: '100px',
};

const navigatorStyle = {
  backgroundColor: '#CCCC66',
  color: "#FFFFFF",
  padding: '10px',
};

const pageBodyStyle = {
  padding: '20px',
};

const App = () => {
  return (
    <div className="App">
      <header className={"page-header"}>
        <img src={logo} style={logoStyle} alt="logo" />
      </header>
      <nav className="yellow-navigator">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ marginRight: "50px", marginLeft: "50px" }}>
            <a href="#home" style={{ textDecorationLine: "none", color: "black" }}>홈</a>
          </div>
          <div style={{  marginRight: "50px", marginLeft: "50px" }}>
            <a href="#my-list" style={{ textDecorationLine: "none", color: "black" }}>나의 체크리스트</a>
          </div>
          <div style={{  marginRight: "50px", marginLeft: "50px" }}>
            <a href="#travel-list" style={{ textDecorationLine: "none", color: "black" }}>여행지 목록</a>
          </div>
        </div>
      </nav>
      <div style={pageBodyStyle}>
      </div>
    </div>
  );
}

export default App;
