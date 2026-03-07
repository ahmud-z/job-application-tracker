import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { api } from '../services/api';

const LoginPage = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post("/login", userInfo)
            .then((res) => {
                setUserInfo({ ...userInfo, email: "", password: "" })
                console.log(res.data.token);
                localStorage.setItem("token", res.data.token)
                navigate("/dashboard");
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message || err.message || "Someting went wrong.");
            })
    };

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            navigate("/dashboard");
        }
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userInfo.email}
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            required
                            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userInfo.password}
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            required
                            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to={"/register"} className="text-blue-600 hover:text-blue-800 font-medium transition duration-200">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;