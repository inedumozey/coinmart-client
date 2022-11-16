import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { Context } from '../../context/Context';
import refreshToken from '../../utils/refreshToken';
import apiClass from '../../utils/api';

const api = new apiClass()

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

export default function ChangeProfileImage() {
    const [selectedImage, setSelectedImage] = useState('');
    const { user } = useContext(Context)

    const {
        setProfileImageLoading,
        setProfileImageSuccess,
        profileImageLoading
    } = user.profileImage

    const handleChangeProfile = (e) => {

        // if accesstoken not there, refresh it before proceeding to get profile, otherwise, get profile straight up
        if (!Cookies.get('accesstoken')) {
            refreshToken()
            setTimeout(() => {
                api.changeProfile(setProfileImageLoading, setProfileImageSuccess, selectedImage)
            }, 2000);
        }
        else {
            api.changeProfile(setProfileImageLoading, setProfileImageSuccess, selectedImage)
        }
    }


    return <input
        style={{
            width: '1px',
            height: '1px',
            visibility: 'hidden',
            opacity: 0,
            position: 'absolute',
        }}
        onChange={handleChangeProfile}
        hidden
        type="file"
        id="file"
        accept="image/*"
    />
}
