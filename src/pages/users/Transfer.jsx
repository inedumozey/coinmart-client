import React, { useEffect } from 'react'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

export default function Transfer() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('refreshtoken')) {
            navigate("/auth/signin")
        }
    }, [])
    return (
        <div>Transfer</div>
    )
}
