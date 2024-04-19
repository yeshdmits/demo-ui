import React, { useState } from "react";
// import './Login.css';
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
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <div className="input-group-login">
                    <div className='input-label'>
                        <input
                            className="task-input"
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleUsername}
                        />
                        <label>Username</label>
                    </div>
                </div>
                <div className="input-group-login">
                    <div className='input-label'>
                        <input
                            className="task-input"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handlePassword}
                        />
                        <label>Password</label>
                    </div>
                </div>
                <button onClick={submitLogin}>Login</button>

                {error &&
                    <div className="error-message">{error.message}</div>
                }
            </div>
        </div>
    );
}

export default LoginComponent;