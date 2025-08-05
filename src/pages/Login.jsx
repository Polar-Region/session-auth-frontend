import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await axios.post("http://localhost:8080/api/auth/login", {
            username,
            password
        })
        sessionStorage.setItem("sessionId", response.data.data)
        navigate('/home');
    };

    return (
        <div>
            <h2>登录</h2>
            <input placeholder="用户名" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="密码" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>登录</button>
            <p>还没有账号？<a href="/register">注册</a></p>
        </div>
    );
}

export default Login;
