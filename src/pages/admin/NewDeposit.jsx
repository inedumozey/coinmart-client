import React, { useEffect } from 'react'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

export default function NewDeposit() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('extratoken')) {
            navigate("/dashboard")
        }
    }, [])
    return (
        <div>New Deposit</div>
    )
}
