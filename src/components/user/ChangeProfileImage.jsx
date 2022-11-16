import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { Context } from '../../context/Context';
import apiClass from '../../utils/api';

const api = new apiClass()

export default function ChangeProfileImage() {
    const { user } = useContext(Context)

    const {
        setProfileData,
        setProfileLoading,
        setFetchProfileSuccess,
        setFetchProfileMsg
    } = user.profile;

    const {
        setProfileImageLoading,
        setProfileImageSuccess,
    } = user.profileImage

    const handleChangeProfile = (e) => {

        // if accesstoken not there, refresh it before proceeding to get profile, otherwise, get profile straight up
        if (!Cookies.get('accesstoken')) {
            api.refreshToken()
            setTimeout(() => {
                api.changeProfileImage(
                    setProfileImageLoading,
                    setProfileImageSuccess,
                    e.target.files[0],
                    setProfileData,
                    setProfileLoading,
                    setFetchProfileSuccess,
                    setFetchProfileMsg
                )
            }, 2000);
        }
        else {
            api.changeProfileImage(
                setProfileImageLoading,
                setProfileImageSuccess,
                e.target.files[0],
                setProfileData,
                setProfileLoading,
                setFetchProfileSuccess,
                setFetchProfileMsg
            )
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
