import Cookies from 'js-cookie';
import axios from 'axios'
import { toast } from 'react-toastify';
import setCookies from './setCookies';
const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;


async function refreshToken() {
    if (!Cookies.get('accesstoken') && Cookies.get('refreshtoken')) {
        try {
            const { data } = await axios.get(`${BASE_URL}/auth/generate-accesstoken`, {
                headers: {
                    authorization: `Bearer ${Cookies.get('refreshtoken')}`
                }
            })

            // log the user in
            setCookies(data.accesstoken, data.refreshtoken, data.data.role)
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

export default refreshToken;