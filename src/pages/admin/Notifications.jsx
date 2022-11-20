import React, { useEffect } from 'react'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

export default function Notifications() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('extratoken') && !Cookies.get('refreshtoken')) {
            navigate("/dashboard")
        }
    }, [])
    return (
        <div>Notifications</div>
    )
}
