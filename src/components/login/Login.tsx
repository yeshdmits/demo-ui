import React, { useState } from "react";
import { requestLogin } from "../../service/ApiService";
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<any>();
    const navigate = useNavigate();

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const submitLogin = () => {
        setError(null);
        requestLogin(username, password)
            .then(() => {
                let url = localStorage.getItem('requestedUrl')
                navigate(url || '/')
            }).catch(error => {
                console.log(error);
                setError(error);
            });
    }


    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="-full max-w-md px-8 py-4 bg-white rounded-lg shadow-md">
                <div className="text-2xl text-center font-bold mb-4">Login</div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        className="-full text-base px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleUsername}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        className="-full text-base px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePassword}
                    />
                </div>
                <div className="w-full px-3 py-2 text-center rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    onClick={submitLogin}
                >Login</div>

                {error &&
                    <div className="m-4 text-sm text-red-500 min-h-8 flex justify-center items-center">
                        {error.message}
                    </div>
                }
            </div>
        </div>
    );
}

export default LoginComponent;