import React, { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { getToken } from '../../service/AuthService';

const AuthLayout: any = (props: any) => {
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        const token = getToken();
        localStorage.setItem('requestedUrl', props.url)
        if (!token) {
            navigate("/login", { state: state });;
        }
    }, [navigate]);
    return (
        <Outlet />
    );
}


export default AuthLayout;