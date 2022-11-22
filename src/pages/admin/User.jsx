import React, { useEffect } from 'react'
import Cookies from "js-cookie";
import { useNavigate, useParams } from 'react-router-dom';

export default function User() {
    const navigate = useNavigate();
    const params = useParams()

    useEffect(() => {
        if (!Cookies.get('extratoken') || !Cookies.get('refreshtoken')) {
            navigate("/dashboard")
        }
    }, [])
    return (
        <div>Selected User with id: {params.id}</div>
    )
}
