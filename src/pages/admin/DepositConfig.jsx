import React, { useEffect } from 'react'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

export default function DepositConfig() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('extratoken')) {
            navigate("/dashboard")
        }
    }, [])
    return (
        <div>Deposit Config</div>
    )
}
