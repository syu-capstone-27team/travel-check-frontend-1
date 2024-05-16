import React from 'react';
import logo from '../assets/travel-check-icon.png';

const Header = () => {
    const isLoggedIn = false; // Replace with your login state logic
    const userId = 'exampleUser'; // Replace with your user ID logic

    return (
        <header style={{
            backgroundColor: "#262D3F",
            display: "flex",
            // justifyContent: "space-between"
            justifyContent: "center",
            position: "relative",
            padding: "10px 20px",
        }}>
            <div style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // padding: "10px 20px"
            }}>
                <img className={"logo-style"} src={logo} alt="Logo" />
            </div>
            <div style={{
                // flex: 0,
                position: "absolute",
                right: 0,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingTop: "2px",
                paddingRight: "20px",
            }}>
                {isLoggedIn ? (
                    <span>{userId}</span>
                ) : (
                    <button style={{
                        backgroundColor: "#007BFF",
                        color: "white",
                        padding: "10px 15px",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                    }}>Login</button>
                )}
            </div>
        </header>
    );
};

export default Header;
