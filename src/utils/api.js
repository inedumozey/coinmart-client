import axios from "axios";
import Cookies from 'js-cookie';
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
                if (err.response) {
                    toast(err.response.data.msg, { type: 'error' })
                }
                else {
                    toast(err.message, { type: 'error' })
                }
            }
        }

        if (!Cookies.get('refreshtoken')) {
            window.location.reload();
            toast('Session is over, please login')
        }
    }

    logout = () => {
        Cookies.remove('accesstoken')
        Cookies.remove('refreshtoken')
        Cookies.remove('role')

        window.location.reload()
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
                setFetchProfileSuccess(true)
                setProfileLoading(false)

                //clear cookies if there is error
                Cookies.remove('accesstoken')
                Cookies.remove('refreshtoken')
                Cookies.remove('role')
            }
            else {
                setFetchProfileMsg(err.message);
                setFetchProfileSuccess(true)
                setProfileLoading(false)
            }

            // logout
            // this.logout()
        }
    }

    changeProfileImage = async (
        setProfileImageLoading,
        setProfileImageSuccess,
        file,
        setProfileData,
        setProfileLoading,
        setFetchProfileSuccess,
        setFetchProfileMsg) => {
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
            setProfileImageSuccess(true);
            toast(data.msg, { type: 'success' })

            this.fetchProfile(setProfileData, setProfileLoading, setFetchProfileSuccess, setFetchProfileMsg)

            // load profile if profile image changed successfull
        }
        catch (err) {
            if (err.response) {
                setProfileImageSuccess(true);
                setProfileImageLoading(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setProfileImageSuccess(true);
                setProfileImageLoading(false);
                toast(err.response.data.msg, { type: 'error' })
            }
        }
    }

}
export default apiClass;