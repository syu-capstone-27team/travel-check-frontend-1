import React from 'react';
import styles from './index.module.scss';
import coverImage from '../assets/cover-image.svg'
import loginImage from '../assets/login-image.svg'
import { useNavigate } from 'react-router-dom';


const Header = () => {
    // const isLoggedIn = false; // Replace with your login state logic
    // const userId = 'exampleUser'; // Replace with your user ID logic
    const navigate = useNavigate();

    // Currently logout; Could be profile? 
    const logout = () => {
        navigate('/');
    }
    const refresh = () => {
        navigate('/Main');
    }

    return (
        <header>
            <div className={styles.contentBox7}>
                <div className={styles.flexRow} style={{ maxWidth: '100%' }}>
                    <div className={styles.group}>
                        <h1 className={styles.bigTitle}>Travel Checklist</h1>
                        <h5 className={styles.versionHighlight}>v.01</h5>
                    </div>

                    <img className={styles.coverImage} src={coverImage} alt='Cover' 
                        onClick={refresh}
                    />
                    <img className={styles.loginImage} src={loginImage} alt='Login' 
                        onClick={logout}
                    />
                </div>
            </div>

            {/* <div style={{
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
            </div> */}
        </header>
    );
};

export default Header;
