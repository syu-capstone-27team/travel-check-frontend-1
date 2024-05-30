import React from 'react';

const Header = () => {
    const isLoggedIn = false; // Replace with your login state logic
    const userId = 'exampleUser'; // Replace with your user ID logic

    return (
        <header>
            <div style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // padding: "10px 20px"
            }}>
                <h1>Travel Check</h1>
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
