import axios from "axios";
import Cookies from 'js-cookie';
import { Navigate } from "react-router";
import { toast } from 'react-toastify';
const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

class apiClass {
    constructor() { }

    fetchConfig = async () => {
        try {
            await axios.get(`${BASE_URL}/config`);
        }
        catch (err) { return }
    }

    setCookies = (accesstoken, refreshtoken, role) => {
        Cookies.set("accesstoken", accesstoken, {
            expires: new Date(new Date().getTime() + 1000 * 60 * 3), // 3 minutes (this is the same time backend accesstoken expires))
            secure: true,
            sameSite: 'strict'
        })
        Cookies.set("refreshtoken", refreshtoken, {
            expires: 28, // 28 days (this is the same time backend refreshtoken expires)
            secure: true,
            sameSite: 'strict'
        })
        Cookies.set("role", role, {
            expires: 28, // 28 days (this is the same time backend role expires))
            secure: true,
            sameSite: 'strict'
        });
    }

    logout = (navigate) => {
        Cookies.remove('accesstoken')
        Cookies.remove('refreshtoken')
        Cookies.remove('role')

        navigate('/');
    }

    setAdminCookies = (token) => {
        Cookies.set('extratoken', token, {
            secure: true,
            sameSite: 'strict'
        })
    }

    logoutAdmin = (navigate) => {
        Cookies.remove('extratoken')

        navigate('/dashboard');
    }

    refreshToken = async () => {
        if (!Cookies.get('accesstoken') && Cookies.get('refreshtoken')) {
            try {
                const { data } = await axios.get(`${BASE_URL}/auth/generate-accesstoken`, {
                    headers: {
                        authorization: `Bearer ${Cookies.get('refreshtoken')}`
                    }
                })

                // log the user in
                this.setCookies(data.accesstoken, data.refreshtoken, data.data.role)
            }
            catch (err) {
                return
            }
        }

        if (!Cookies.get('refreshtoken')) {
            window.location.reload();
            toast('Session is over, please login')
        }
    }

    fetchProfile = async (setProfileData, setProfileLoading, setFetchProfileSuccess, setFetchProfileMsg) => {
        try {
            const { data } = await axios.get(`${BASE_URL}/auth/get-profile`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`
                }
            });
            setProfileData(data.data);
            setProfileLoading(false);
            setFetchProfileSuccess(true);
            setFetchProfileMsg(data.msg)
        }
        catch (err) {
            if (err.response) {
                setFetchProfileMsg(err.response.data.msg);
                setFetchProfileSuccess(false)
                setProfileLoading(false)

                //clear cookies if there is error
                Cookies.remove('accesstoken')
                Cookies.remove('refreshtoken')
                Cookies.remove('role')
            }
            else {
                setFetchProfileMsg(err.message);
                setFetchProfileSuccess(false)
                setProfileLoading(false)
            }

            // logout
            // this.logout()
        }
    }

    changeProfileImage = async (
        setProfileImageLoading,
        file,
        setProfileLoadingAgain,
        setProfileData,) => {
        setProfileImageLoading(true);
        try {
            let formData = new FormData();
            formData.append('file', file)

            const { data } = await axios.put(`${BASE_URL}/profile/upload-profile`, formData, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setProfileImageLoading(false);
            toast(data.msg, { type: 'success' })

            // fecth profile if profile image changed successfull
            this.fetchProfileAgain(setProfileData, setProfileLoadingAgain)
        }
        catch (err) {
            if (err.response) {
                setProfileImageLoading(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setProfileImageLoading(false);
                toast(err.response.data.msg, { type: 'error' })
            }
        }
    }

    fetchProfileAgain = async (setProfileData, setProfileLoadingAgain) => {
        try {
            const { data } = await axios.get(`${BASE_URL}/auth/get-profile`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`
                }
            });
            setProfileData(data.data);
            setProfileLoadingAgain(false);
            toast(data.msg, { type: 'success' })
        }
        catch (err) {
            if (err.response) {
                setProfileLoadingAgain(false)
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setProfileLoadingAgain(false)
                toast(err.message, { type: 'error' })
            }

        }
    }

    updateProfile = async (
        setEditProfileLoading,
        setProfileLoadingAgain,
        setFetchProfileSuccess,
        setFetchProfileMsg,
        setProfileData,
        inp
    ) => {

        setEditProfileLoading(true);
        try {
            const { data } = await axios.put(`${BASE_URL}/profile/update-profile`, { ...inp }, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`
                }
            });

            toast(data.msg, { type: 'success' })

            // fetch profile if successful
            this.fetchProfileAgain(setProfileData, setProfileLoadingAgain, setFetchProfileSuccess, setFetchProfileMsg)
            setEditProfileLoading(false)
        }
        catch (err) {
            if (err.response) {
                setEditProfileLoading(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setEditProfileLoading(false);
                toast(err.response.data.msg, { type: 'error' })
            }
        }
    }

    resetPassword = async (
        setChangePasswordLoading,
        data_,
        setChangePasswordSuccess
    ) => {

        setChangePasswordLoading(true);
        try {
            const { data } = await axios.put(`${BASE_URL}/auth/reset-password`, data_, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`
                }
            });

            setChangePasswordLoading(false);
            setChangePasswordSuccess(true)
            toast(data.msg, { type: 'success' })
        }
        catch (err) {
            if (err.response) {
                setChangePasswordLoading(false);
                setChangePasswordSuccess(false);
                toast(err.response.data.msg, { type: 'error' });
            }
            else {
                setChangePasswordLoading(false);
                setChangePasswordSuccess(false);
                toast(err.response.data.msg, { type: 'error' })
            }
        }
    }


}
export default apiClass;