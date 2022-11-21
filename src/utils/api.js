import axios from "axios";
import Cookies from 'js-cookie';
import { Navigate } from "react-router";
import { toast } from 'react-toastify';
const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

class apiClass {
    constructor() { }

    fetchConfig = async (setConfigData) => {
        try {
            const { data } = await axios.get(`${BASE_URL}/config`);
            setConfigData(data.data)
        }
        catch (err) {
            return;
        }

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
        setProfileData,
        setProfileLoadingAgain,
        setFetchProfileSuccess,
        setFetchProfileMsg,
        inp,
        setEditProfileLoading,
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

    updateConfig = async (setUpdatingConfig, inp, setConfigData, setCategory, category) => {
        setCategory(category)
        setUpdatingConfig(true);
        try {
            const { data } = await axios.put(`${BASE_URL}/config/update`, { ...inp }, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });

            toast(data.msg, { type: 'success' })

            // fetch config data
            this.fetchConfig(setConfigData)
            setUpdatingConfig(false)
        }
        catch (err) {
            if (err.response) {
                setUpdatingConfig(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setUpdatingConfig(false);
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

    transfer_checkUser = async (
        inp,
        setTransferLoading_checkUser
    ) => {

        setTransferLoading_checkUser(true);
        try {
            const { data } = await axios.put(`${BASE_URL}/transfer/check-user`, { ...inp }, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`
                }
            });

        }
        catch (err) {
            if (err.response) {
                setTransferLoading_checkUser(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setTransferLoading_checkUser(false);
                toast(err.response.data.msg, { type: 'error' })
            }
        }
    }

    transfer_payUser = async (
        setProfileData,
        setProfileLoadingAgain,
        setFetchProfileSuccess,
        setFetchProfileMsg,
        inp,
        setTransferLoading,
    ) => {

        setTransferLoading(true);
        try {
            const { data } = await axios.put(`${BASE_URL}/transfer/pay-user`, { ...inp }, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`
                }
            });

            toast(data.msg, { type: 'success' })

            // fetch profile if successful
            this.fetchProfileAgain(setProfileData, setProfileLoadingAgain, setFetchProfileSuccess, setFetchProfileMsg)
            setTransferLoading(false)
        }
        catch (err) {
            if (err.response) {
                setTransferLoading(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setTransferLoading(false);
                toast(err.response.data.msg, { type: 'error' })
            }
        }
    }

    resetAdminPassword = async (
        setChangePasswordLoading,
        data_,
        setChangePasswordSuccess
    ) => {

        setChangePasswordLoading(true);
        try {
            const { data } = await axios.put(`${BASE_URL}/config/reset-admin-password`, data_, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
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

    // investment plan
    fetchPlans = async (setPlans, setFetchingPlans, setFetchingPlansSuccess) => {
        setFetchingPlans(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/investment/plans`);
            setPlans(data.data);
            setFetchingPlans(false);
            setFetchingPlansSuccess(true);
        }
        catch (err) {
            if (err.response) {
                setFetchingPlans(false);
                setFetchingPlansSuccess(false);
            }
            else {
                setFetchingPlans(false);
                setFetchingPlansSuccess(false);
            }
        }
    }

    refreshPlans = async (setPlans, setRefreshingPlans) => {
        setRefreshingPlans(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/investment/plans`);
            setPlans(data.data);
            setRefreshingPlans(false);
            toast(data.msg, { type: 'success' })
        }
        catch (err) {
            if (err.response) {
                setRefreshingPlans(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setRefreshingPlans(false);
                toast(err.message, { type: 'error' })
            }
        }
    }

    postPlan = async (data_, setPostingPlan, setPlans, setRefreshingPlans) => {
        setPostingPlan(true)
        try {
            const { data } = await axios.post(`${BASE_URL}/investment/plans`, data_, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });
            setPostingPlan(false);
            toast(data.msg, { type: 'success' })
            // refresh plan
            this.refreshPlans(setPlans, setRefreshingPlans)
        }
        catch (err) {
            if (err.response) {
                setPostingPlan(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setPostingPlan(false);
                toast(err.message, { type: 'error' })
            }
        }
    }

    updatePlan = async (data_, id, setUpdatingPlan, setPlans, setRefreshingPlans) => {
        setUpdatingPlan(true)
        try {
            const { data } = await axios.put(`${BASE_URL}/investment/plans/${id}`, data_, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });
            setUpdatingPlan(false);
            toast(data.msg, { type: 'success' })
            // refresh plan
            this.refreshPlans(setPlans, setRefreshingPlans)
        }
        catch (err) {
            if (err.response) {
                setUpdatingPlan(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setUpdatingPlan(false);
                toast(err.message, { type: 'error' })
            }
        }
    }

    deletePlan = async (id, setDeletingPlan, setPlans, setRefreshingPlans) => {

        try {
            const { data } = await axios.delete(`${BASE_URL}/investment/plans/${id}`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });
            setDeletingPlan(false);
            toast(data.msg, { type: 'success' })
            // refresh plan
            this.refreshPlans(setPlans, setRefreshingPlans)
        }
        catch (err) {
            if (err.response) {
                setDeletingPlan(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setDeletingPlan(false);
                toast(err.message, { type: 'error' })
            }
        }
    }

    buyPlan = async (data_, setInvestLoading, setProfileData, setProfileLoadingAgain) => {

        try {
            const { data } = await axios.post(`${BASE_URL}/investment/invest/${data_.id}`, data_, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                }
            });
            setInvestLoading(false);
            toast(data.msg, { type: 'success' })

            // refresh profile data
            this.fetchProfileAgain(setProfileData, setProfileLoadingAgain)
        }
        catch (err) {
            if (err.response) {
                setInvestLoading(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setInvestLoading(false);
                toast(err.message, { type: 'error' })
            }
        }
    }
}
export default apiClass;