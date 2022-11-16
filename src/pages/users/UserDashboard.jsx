import React, { useEffect } from 'react'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import apiClass from '../../utils/api';
const api = new apiClass()

export default function UserDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('refreshtoken')) {
            navigate("/auth/signin")
        }
    }, [])


    return (
        <div>User Dashboard
            <div style={{ cursor: 'pointer' }} onClick={api.logout}>Logout</div>
            <button onClick={api.refreshToken}>Refresh Token</button>
        </div>
    )
}


