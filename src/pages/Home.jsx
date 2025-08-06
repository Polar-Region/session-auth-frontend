import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Home() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const sessionId = localStorage.getItem('sessionId');

        if (!sessionId) {
            alert('无效 session，请登录');
            navigate('/auth');
            return;
        }

        // 用 IIFE 包装 async 函数
        (async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/auth/authenticate', {
                    params: { sessionId }  // GET 请求用 params 传参数
                });
                const usernameFromServer = res.data.data;
                setUsername(usernameFromServer);
                localStorage.setItem('username', usernameFromServer);
            } catch (error) {
                console.error('认证失败:', error);
                navigate('/auth');
            }
        })();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('sessionId');
        localStorage.removeItem('username');
        navigate('/auth');
    };

    return (
        <div>
            <h2>欢迎，{username}！</h2>
            <button onClick={handleLogout}>退出登录</button>
        </div>
    );
}

export default Home;
