// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import kakaoLoginButton from '../assets/kakao_login_medium_narrow.png'
import './login.css'

const Login = ({ onLogin }) => {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    
    // const handleSubmit = async e => {
    //     e.preventDefault();
    //     const response = await fetch('http://localhost:8080/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ username, password }),
    //     });
    //     const data = await response.json();
    //     onLogin(data.token);
    // }

    const navigate = useNavigate();

    const loginTest = () => {
        // TODO: replace with kakao login
        navigate('/Main', { relative: 'path' });
    };

    return (
        <center>
        <div class="container centerContainer">
            <form action="#">
                <div class="title">Login</div>
            </form>
            <div style={{ alignItems: 'center' }}>
                <img class="kakao" src={kakaoLoginButton} onClick={loginTest} />
            </div>
        </div>
        </center>
    );
};

export default Login;
