'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import axios from "axios";
import {useNavigate} from "react-router-dom";


export default function AuthPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loginData, setLoginData] = useState({ username: '', password: '' })
    const [registerData, setRegisterData] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: ''
    })
    const [activeTab, setActiveTab] = useState('login')
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log('登录数据:', loginData)
        const response = await axios.post('http://localhost:8080/api/auth/login', {
            username: loginData.username,
            password: loginData.password,
        })
        localStorage.setItem('sessionId', response.data.data)
        navigate('/home');
    }

    const handleRegister = (e) => {
        e.preventDefault()
        if (registerData.password !== registerData.confirmPassword) {
            alert('密码不匹配')
            return
        }
        console.log('注册数据:', registerData)

        // 模拟注册成功
        alert('注册成功！请登录您的账户')

        // 切换到登录标签页
        setActiveTab('login')

        // 清空注册表单
        setRegisterData({ name: '', username: '', password: '', confirmPassword: '' })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">欢迎回来</h1>
                    <p className="text-gray-600">登录或创建新账户开始使用</p>
                </div>

                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="login" className="text-sm font-medium">登录</TabsTrigger>
                            <TabsTrigger value="register" className="text-sm font-medium">注册</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <CardHeader className="space-y-1 pb-4">
                                <CardTitle className="text-2xl font-semibold text-center">登录账户</CardTitle>
                                <CardDescription className="text-center text-gray-600">
                                    输入您的用户名和密码来登录
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">


                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="login-username">用户名</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="login-username"
                                                type="text"
                                                placeholder="您的用户名"
                                                className="pl-10"
                                                value={loginData.username}
                                                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="login-password">密码</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="login-password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="输入密码"
                                                className="pl-10 pr-10"
                                                value={loginData.password}
                                                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center space-x-2 text-sm">
                                            <input type="checkbox" className="rounded border-gray-300" />
                                            <span className="text-gray-600">记住我</span>
                                        </label>
                                        <a href="#" className="text-sm text-blue-600 hover:underline">
                                            忘记密码？
                                        </a>
                                    </div>

                                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                                        登录
                                    </Button>
                                </form>
                            </CardContent>
                        </TabsContent>

                        <TabsContent value="register">
                            <CardHeader className="space-y-1 pb-4">
                                <CardTitle className="text-2xl font-semibold text-center">创建账户</CardTitle>
                                <CardDescription className="text-center text-gray-600">
                                    填写信息来创建新账户
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">


                                <form onSubmit={handleRegister} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="register-name">姓名</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="register-name"
                                                type="text"
                                                placeholder="您的姓名"
                                                className="pl-10"
                                                value={registerData.name}
                                                onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="register-username">用户名</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="register-username"
                                                type="text"
                                                placeholder="您的用户名"
                                                className="pl-10"
                                                value={registerData.username}
                                                onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="register-password">密码</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="register-password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="创建密码"
                                                className="pl-10 pr-10"
                                                value={registerData.password}
                                                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">确认密码</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="confirm-password"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="再次输入密码"
                                                className="pl-10 pr-10"
                                                value={registerData.confirmPassword}
                                                onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" className="rounded border-gray-300" required />
                                        <label className="text-sm text-gray-600">
                                            我同意 <a href="#" className="text-blue-600 hover:underline">服务条款</a> 和 <a href="#" className="text-blue-600 hover:underline">隐私政策</a>
                                        </label>
                                    </div>

                                    <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                                        创建账户
                                    </Button>
                                </form>
                            </CardContent>
                        </TabsContent>
                    </Tabs>
                </Card>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        遇到问题？ <a href="#" className="text-blue-600 hover:underline">联系支持</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
