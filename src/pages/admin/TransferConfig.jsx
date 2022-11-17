import React, { useEffect } from 'react'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

export default function TransferConfig() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('extratoken')) {
            navigate("/dashboard")
        }
    }, [])
    return (
        <div>Transfer Config</div>
    )
}
