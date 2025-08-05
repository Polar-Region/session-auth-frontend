import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        await axios.post("http://localhost:8080/api/user/register", {
            username: username,
            password: password
        });
        navigate('/login');
    };

    return (
        <div>
            <h2>注册</h2>
            <input placeholder="用户名" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="密码" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>注册</button>
            <p>已有账号？<a href="/login">登录</a></p>
        </div>
    );
}

export default Register;
