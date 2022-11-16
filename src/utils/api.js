import axios from "axios";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

class apiClass {
    constructor() { }

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
            }
            else {
                setFetchProfileMsg(err.message);
                setFetchProfileSuccess(true)
                setProfileLoading(false)
            }
        }
    }

    changeProfile = async (setProfileImageLoading, setProfileImageSuccess, data) => {
        setProfileImageLoading(true);
        try {
            // const { data } = await axios.get(`${BASE_URL}/auth/get-profile`, {
            //     headers: {
            //         'authorization': `Bearer ${Cookies.get('accesstoken')}`
            //     }
            // });
            setProfileImageLoading(false);
            setProfileImageSuccess(true);
            // toast(data.msg, { type: 'success' })
        }
        catch (err) {
            if (err.response) {
                setProfileImageSuccess(true);
                setProfileImageLoading(false);
                // toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setProfileImageSuccess(true);
                setProfileImageLoading(false);
                // toast(err.response.data.msg, { type: 'error' })
            }
        }
    }

}
export default apiClass;