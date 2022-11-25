import React, { useContext, useEffect } from 'react'
import Cookies from "js-cookie";
import { useNavigate, useParams } from 'react-router-dom';
import User_C from '../../components/admin/users/user/user';
import { Context } from '../../context/Context';

export default function User() {
    const navigate = useNavigate();
    const params = useParams()
    const { admin } = useContext(Context)
    const { setSelectedUser } = admin.userHistory

    useEffect(() => {
        if (!Cookies.get('extratoken') || !Cookies.get('refreshtoken')) {
            navigate("/dashboard")
        }

        setSelectedUser(params.id)
    }, [])
    return <User_C />
}
