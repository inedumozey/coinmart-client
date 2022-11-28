import axios from "axios";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
// toast(data.msg, { type: 'success' })

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

        // if (!Cookies.get('refreshtoken')) {
        //     window.location.reload();
        //     toast('Session is over, please login')
        // }
    }

    fetchProfile = async (setProfileData, setProfileLoading, setFetchProfileSuccess, setFetchProfileMsg) => {
        setProfileLoading(true)
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

    fetchProfileAgain = async (setProfileData, setProfileLoadingAgain) => {
        setProfileLoadingAgain(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/auth/get-profile`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`
                }
            });
            setProfileData(data.data);
            setProfileLoadingAgain(false);
            // toast(data.msg, { type: 'success' })
        }
        catch (err) {
            if (err.response) {
                setProfileLoadingAgain(false)
                // toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setProfileLoadingAgain(false)
                // toast(err.message, { type: 'error' })
            }

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
        data_,
        setChangePasswordLoading,
        setInp
    ) => {

        setChangePasswordLoading(true);
        try {
            const { data } = await axios.put(`${BASE_URL}/auth/reset-password`, data_, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`
                }
            });

            setChangePasswordLoading(false);
            // setChangePasswordSuccess(true)
            toast(data.msg, { type: 'success' })
            setInp({
                oldPassword: "",
                newPassword: "",
                newCpassword: ""
            })
        }
        catch (err) {
            if (err.response) {
                setChangePasswordLoading(false);
                // setChangePasswordSuccess(false);
                toast(err.response.data.msg, { type: 'error' });
            }
            else {
                setChangePasswordLoading(false);
                // setChangePasswordSuccess(false);
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
            // toast(data.msg, { type: 'success' })
        }
        catch (err) {
            if (err.response) {
                setRefreshingPlans(false);
                // toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setRefreshingPlans(false);
                // toast(err.message, { type: 'error' })
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

    resolveInvestment = async () => {

        try {
            const { data } = await axios.get(`${BASE_URL}/investment/resolve`);
            // console.log(data)
            return
        }
        catch (err) {
            if (err.response) {
                // console.log(err.response.data.msg)
                return;
            }
            else {
                // console.log(err.message)
                return;
            }
        }
    }

    adminGetAllInvestments = async (setInvestmentData_admin, setFetchingInvestments_admin, setFetchInvestmentsMsg_admin) => {
        setFetchingInvestments_admin(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/investment/get-all-investments-admin`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });
            setInvestmentData_admin(data.data)
            setFetchingInvestments_admin(false)
            setFetchInvestmentsMsg_admin(data.msg)
        }
        catch (err) {
            if (err.response) {
                setFetchingInvestments_admin(false)
                setFetchInvestmentsMsg_admin(err.response.data.msg)
            }
            else {
                setFetchingInvestments_admin(false)
                setFetchInvestmentsMsg_admin(err.message)
            }
        }
    }

    userGetAllInvestments = async (setInvestmentData_users, setFetchingInvestments_users, setFetchInvestmentsMsg_users) => {
        setFetchingInvestments_users(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/investment/get-all-investments`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`
                }
            });
            setInvestmentData_users(data)
            setFetchingInvestments_users(false)
            setFetchInvestmentsMsg_users(data.msg)
        }
        catch (err) {
            if (err.response) {
                setFetchingInvestments_users(false)
                setFetchInvestmentsMsg_users(err.response.data.msg)
            }
            else {
                setFetchingInvestments_users(false)
                setFetchInvestmentsMsg_users(err.message)
            }
        }
    }

    // manual by the supper admin
    resolveInvestments = async (id, setInvestmentData_admin, setFetchingInvestments_admin, setFetchInvestmentsMsg_admin, setResolvingInvestment) => {
        setResolvingInvestment(true)
        try {
            const { data } = await axios.put(`${BASE_URL}/investment/resolve-manual/${id}`, {}, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });

            setInvestmentData_admin(data)
            setResolvingInvestment(false)
            toast(data.msg, { type: 'success' })

            this.adminGetAllInvestments(setInvestmentData_admin, setFetchingInvestments_admin, setFetchInvestmentsMsg_admin)
        }
        catch (err) {
            if (err.response) {
                setResolvingInvestment(false)
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setResolvingInvestment(false)
                toast(err.message, { type: 'error' })
            }
        }
    }

    // transfer
    verifyAccountNo = async (data_, setVerifyAccountNoLoading, setVerifyAccountNoData, setShowPayUserModal) => {
        setVerifyAccountNoLoading(true)
        try {
            const { data } = await axios.post(`${BASE_URL}/transfer/verify-acccount-no`, data_, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                }
            });
            setVerifyAccountNoData(data.data)
            setVerifyAccountNoLoading(false);
            setShowPayUserModal(true)
            toast(data.msg, { type: 'success' })
        }
        catch (err) {
            if (err.response) {
                setVerifyAccountNoLoading(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setVerifyAccountNoLoading(false);
                toast(err.message, { type: 'error' })
            }
        }
    }

    payUser = async (data_, setPayLoading, setTransferSuccess) => {
        setPayLoading(true)
        try {
            const { data } = await axios.post(`${BASE_URL}/transfer/pay-user`, data_, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`
                }
            });
            setPayLoading(false);
            setTransferSuccess(true)
            toast(data.msg, { type: 'success' })
        }
        catch (err) {
            if (err.response) {
                setPayLoading(false);
                setTransferSuccess(false)
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setPayLoading(false);
                setTransferSuccess(false)
                toast(err.message, { type: 'error' })
            }
        }
    }

    // withdrawal
    userWithdrawal = async (data_, setWithdrawalLoading, setInp) => {
        setWithdrawalLoading(true);
        try {
            const { data } = await axios.post(`${BASE_URL}/withdrawal/request`, data_, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`
                }
            });
            setWithdrawalLoading(false);
            setInp({
                amount: null,
                walletAddress: '',
                coin: ''
            })
            toast(data.msg, { type: 'success' });
        }
        catch (err) {
            if (err.response) {
                setWithdrawalLoading(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setWithdrawalLoading(false);
                toast(err.message, { type: 'error' })
            }
        }
    }

    // deposit
    userDeposit = async (data_, setDepositLoading, setInp, window) => {
        setDepositLoading(true);
        try {
            const { data } = await axios.post(`${BASE_URL}/deposit/`, data_, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`
                }
            });
            setDepositLoading(false);
            setInp({ amount: null })
            toast(data.msg, { type: 'success' })

            // redirext user to pay via libk returned from backend
            setTimeout(() => {
                window.location.href = data.data.hostedUrl
            }, 1000)

        }
        catch (err) {
            if (err.response) {
                setDepositLoading(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setDepositLoading(false);
                toast(err.message, { type: 'error' })
            }
        }
    }

    getUsers = async (setFetchingUsers_initial, setFetchingUsersSuccess_initial, setUserData) => {
        setFetchingUsers_initial(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/auth/get-users`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });
            setUserData(data)
            setFetchingUsersSuccess_initial(true)
            setFetchingUsers_initial(false)
            // toast(data.msg, { type: 'success' })
        }
        catch (err) {
            if (err.response) {
                setFetchingUsers_initial(false)
                setFetchingUsersSuccess_initial(false)
                // toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setFetchingUsers_initial(false)
                setFetchingUsersSuccess_initial(false)
                // toast(err.message, { type: 'error' })
            }
        }
    }

    refreshUsers = async (setFetchingUsers_refresh, setUserData) => {
        setFetchingUsers_refresh(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/auth/get-users`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });
            setUserData(data)
            setFetchingUsers_refresh(false)
            // toast(data.msg, { type: 'success' })
        }
        catch (err) {
            if (err.response) {
                setFetchingUsers_refresh(false)
                // toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setFetchingUsers_refresh(false)
                // toast(err.message, { type: 'error' })
            }
        }
    }

    toggleAdmin = async (id, toggleMakeAdminLoading, setFetchingUsers_refresh, setUserData) => {
        toggleMakeAdminLoading(true)
        try {
            const { data } = await axios.put(`${BASE_URL}/auth/toggle-admin/${id}`, {}, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });

            //refresh user data
            this.refreshUsers(setFetchingUsers_refresh, setUserData);

            toggleMakeAdminLoading(false)
            toast(data.msg, { type: 'success' })

        }
        catch (err) {
            if (err.response) {
                toggleMakeAdminLoading(false)
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                toggleMakeAdminLoading(false)
                toast(err.message, { type: 'error' })
            }
        }
    }

    toggleDeactivate = async (id, setToggleBockUserLoading, setFetchingUsers_refresh, setUserData) => {
        setToggleBockUserLoading(true)
        try {
            const { data } = await axios.put(`${BASE_URL}/auth/toggle-block-user/${id}`, {}, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });

            //refresh user data
            this.refreshUsers(setFetchingUsers_refresh, setUserData);

            setToggleBockUserLoading(false)
            toast(data.msg, { type: 'success' })

        }
        catch (err) {
            if (err.response) {
                setToggleBockUserLoading(false)
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setToggleBockUserLoading(false)
                toast(err.message, { type: 'error' })
            }
        }
    }

    deleteUser = async (id, setDeleteUserLoading, setFetchingUsers_refresh, setUserData) => {
        setDeleteUserLoading(true)
        try {
            const { data } = await axios.put(`${BASE_URL}/auth/delete-many-accounts/`, { id }, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });

            //refresh user data
            this.refreshUsers(setFetchingUsers_refresh, setUserData);

            setDeleteUserLoading(false)
            toast(data.msg, { type: 'success' })
        }
        catch (err) {
            if (err.response) {
                setDeleteUserLoading(false)
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setDeleteUserLoading(false)
                toast(err.message, { type: 'error' })
            }
        }
    }

    //user referral
    fetchReferralHx = async (setFetchReferralHxLoading, setReferralHxData, setFetchReferralHxSuccess) => {

        setFetchReferralHxLoading(true);
        try {
            const { data } = await axios.get(`${BASE_URL}/referral/get-all-hx`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`
                }
            });

            setReferralHxData(data.data)
            setFetchReferralHxLoading(false)
            setFetchReferralHxSuccess(true)

        }
        catch (err) {
            if (err.response) {
                setFetchReferralHxLoading(false);
                setFetchReferralHxSuccess(false);
            }
            else {
                setFetchReferralHxLoading(false);
                setFetchReferralHxSuccess(false);
            }
        }
    }

    addRefecode = async (refcode, setAddingRefcode, setProfileData, setProfileLoadingAgain) => {

        setAddingRefcode(true);
        try {
            const { data } = await axios.put(`${BASE_URL}/referral/add-refcode`, { refcode }, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`
                }
            });

            // fetch profile if successful
            this.fetchProfileAgain(setProfileData, setProfileLoadingAgain)

            setAddingRefcode(false)
            toast(data.msg, { type: 'success' })

        }
        catch (err) {
            if (err.response) {
                setAddingRefcode(false);
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setAddingRefcode(false);
                toast(err.response.data.msg, { type: 'error' })
            }
        }
    }

    // admin deposit handler section
    getDepositAdmin_initial = async (
        setFetchingDepositData_initial,
        setDepositDataSuccess,
        setDepositData
    ) => {
        setFetchingDepositData_initial(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/deposit/get-all-admin`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });
            setFetchingDepositData_initial(false)
            setDepositDataSuccess(true)
            setDepositData(data.data)
            // toast(data.msg, { type: 'success' })
        }
        catch (err) {
            if (err.response) {
                setFetchingDepositData_initial(false)
                setDepositDataSuccess(false)
                // toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setFetchingDepositData_initial(false)
                setDepositDataSuccess(false)
                // toast(err.message, { type: 'error' })
            }
        }
    }

    // admin deposit handler section
    getDepositAdmin_refresh = async (
        setFetchingDepositData_refresh,
        setDepositData
    ) => {
        setFetchingDepositData_refresh(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/deposit/get-all-admin`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });
            setFetchingDepositData_refresh(false)
            setDepositData(data.data)
            // toast(data.msg, { type: 'success' })
        }
        catch (err) {
            if (err.response) {
                setFetchingDepositData_refresh(false)
                // toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setFetchingDepositData_refresh(false)
                // toast(err.message, { type: 'error' })
            }
        }
    }

    // resolve deposit manually
    resolveDepositAdmin = async (
        amount,
        id,
        setResolvingDeposit,
        setFetchingDepositData_refresh,
        setDepositData,
        setAmount,
        setShowResolvingDepositModal,
        setSelectedData
    ) => {
        setResolvingDeposit(true)
        try {
            const { data } = await axios.put(`${BASE_URL}/deposit/resolve/${id}`, { amount }, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });
            this.getDepositAdmin_refresh(setFetchingDepositData_refresh, setDepositData);

            setResolvingDeposit(false)
            toast(data.msg, { type: 'success' })
            setShowResolvingDepositModal(false);
            setAmount('');
            setSelectedData('')
        }
        catch (err) {
            if (err.response) {
                setResolvingDeposit(false)
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setResolvingDeposit(false)
                toast(err.message, { type: 'error' })
            }
        }
    }

    // admin withdrawal handler section
    getPendingWithdrawal_initial = async (
        setFetchingPendingWithdrawalData_initial,
        setPendingWithdrawalDataSuccess,
        setPendingWithdrawalData
    ) => {
        setFetchingPendingWithdrawalData_initial(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/withdrawal/get-all-transactions/?status=pending`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });
            setPendingWithdrawalData(data.data)
            setFetchingPendingWithdrawalData_initial(false)
            setPendingWithdrawalDataSuccess(true)
            // toast(data.msg, { type: 'success' })
        }
        catch (err) {
            if (err.response) {
                setFetchingPendingWithdrawalData_initial(false)
                setPendingWithdrawalDataSuccess(false)
                // toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setFetchingPendingWithdrawalData_initial(false)
                setPendingWithdrawalDataSuccess(false)
                // toast(err.message, { type: 'error' })
            }
        }
    }

    getPendingWithdrawal_refresh = async (
        setFetchingPendingWithdrawalData_refresh,
        setPendingWithdrawalData
    ) => {
        setFetchingPendingWithdrawalData_refresh(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/withdrawal/get-all-transactions/?status=pending`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });
            setPendingWithdrawalData(data.data)
            setFetchingPendingWithdrawalData_refresh(false)
            // toast(data.msg, { type: 'success' })
        }
        catch (err) {
            if (err.response) {
                setFetchingPendingWithdrawalData_refresh(false)
                // toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setFetchingPendingWithdrawalData_refresh(false)
                // toast(err.message, { type: 'error' })
            }
        }
    }

    getRejectedWithdrawal_initial = async (
        setFetchingRejectedWithdrawalData_initial,
        setRejectedWithdrawalDataSuccess,
        setRejectedWithdrawalData
    ) => {
        setFetchingRejectedWithdrawalData_initial(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/withdrawal/get-all-transactions/?status=rejected`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });
            setRejectedWithdrawalData(data.data)
            setFetchingRejectedWithdrawalData_initial(false)
            setRejectedWithdrawalDataSuccess(true)
            // toast(data.msg, { type: 'success' })
        }
        catch (err) {
            if (err.response) {
                setFetchingRejectedWithdrawalData_initial(false)
                setRejectedWithdrawalDataSuccess(false)
                // toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setFetchingRejectedWithdrawalData_initial(false)
                setRejectedWithdrawalDataSuccess(false)
                // toast(err.message, { type: 'error' })
            }
        }
    }

    getRejectedWithdrawal_refresh = async (
        setFetchingRejectedWithdrawalData_refresh,
        setRejectedWithdrawalData
    ) => {
        setFetchingRejectedWithdrawalData_refresh(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/withdrawal/get-all-transactions/?status=rejected`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });
            setRejectedWithdrawalData(data.data)
            setFetchingRejectedWithdrawalData_refresh(false)
            // toast(data.msg, { type: 'success' })
        }
        catch (err) {
            if (err.response) {
                setFetchingRejectedWithdrawalData_refresh(false)
                // toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setFetchingRejectedWithdrawalData_refresh(false)
                // toast(err.message, { type: 'error' })
            }
        }
    }

    getConfirmedWithdrawal_initial = async (
        setFetchingConfirmedWithdrawalData_initial,
        setConfirmedWithdrawalDataSuccess,
        setConfirmedWithdrawalData,
    ) => {
        setFetchingConfirmedWithdrawalData_initial(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/withdrawal/get-all-transactions/?status=confirmed`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });
            setConfirmedWithdrawalData(data.data)
            setFetchingConfirmedWithdrawalData_initial(false)
            setConfirmedWithdrawalDataSuccess(true)
            // toast(data.msg, { type: 'success' })
        }
        catch (err) {
            if (err.response) {
                setFetchingConfirmedWithdrawalData_initial(false)
                setConfirmedWithdrawalDataSuccess(false)
                // toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setFetchingConfirmedWithdrawalData_initial(false)
                setConfirmedWithdrawalDataSuccess(false)
                // toast(err.message, { type: 'error' })
            }
        }
    }

    getConfirmedWithdrawal_refresh = async (
        setFetchingConfirmedWithdrawalData_refresh,
        setConfirmedWithdrawalData
    ) => {
        setFetchingConfirmedWithdrawalData_refresh(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/withdrawal/get-all-transactions/?status=confirmed`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });
            setConfirmedWithdrawalData(data.data)
            setFetchingConfirmedWithdrawalData_refresh(false)
            // toast(data.msg, { type: 'success' })
        }
        catch (err) {
            if (err.response) {
                setFetchingConfirmedWithdrawalData_refresh(false)
                // toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setFetchingConfirmedWithdrawalData_refresh(false)
                // toast(err.message, { type: 'error' })
            }
        }
    }

    confirmWithdrawal = async (
        id,
        setConfirmingWithdrawal,
        setConfirmingWithdrawalSuccess,
        setFetchingPendingWithdrawalData_refresh,
        setPendingWithdrawalData,
        setShowPendingWithdrawalModal,
        setSelectedData
    ) => {
        setConfirmingWithdrawal(true)
        try {
            const { data } = await axios.put(`${BASE_URL}/withdrawal/confirm/${id}`, {}, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });

            // refresh confirmed transactions
            this.getPendingWithdrawal_refresh(setFetchingPendingWithdrawalData_refresh, setPendingWithdrawalData)

            setConfirmingWithdrawal(false)
            setConfirmingWithdrawalSuccess(true)
            toast(data.msg, { type: 'success' });
            setShowPendingWithdrawalModal(false);
            setSelectedData("")
        }
        catch (err) {
            if (err.response) {
                setConfirmingWithdrawal(false)
                setConfirmingWithdrawalSuccess(false)
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setConfirmingWithdrawal(false)
                setConfirmingWithdrawalSuccess(false)
                toast(err.message, { type: 'error' })
            }
        }
    }

    rejectWithdrawal = async (
        id,
        setRejectingWithdrawal,
        setRejectingWithdrawalSuccess,
        setFetchingPendingWithdrawalData_refresh,
        setPendingWithdrawalData,
        setShowPendingWithdrawalModal,
        setSelectedData
    ) => {
        setRejectingWithdrawal(true)
        try {
            const { data } = await axios.put(`${BASE_URL}/withdrawal/reject/${id}`, {}, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });

            // refresh pending transactions
            this.getPendingWithdrawal_refresh(setFetchingPendingWithdrawalData_refresh, setPendingWithdrawalData)
            setRejectingWithdrawal(false)
            setRejectingWithdrawalSuccess(true)

            toast(data.msg, { type: 'success' })
            setShowPendingWithdrawalModal(false);
            setSelectedData("")
        }
        catch (err) {
            if (err.response) {
                setRejectingWithdrawal(false)
                setRejectingWithdrawalSuccess(false)
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setRejectingWithdrawal(false)
                setRejectingWithdrawalSuccess(false)
                toast(err.message, { type: 'error' })
            }
        }
    }

    fetchUserHistory_user = async (
        id,
        setUserData_user,
        setFetchingUserData_user,
        setUserDataSuccess_user,
    ) => {
        setFetchingUserData_user(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/user/user/${id}`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`
                }
            });

            setFetchingUserData_user(false)
            setUserDataSuccess_user(true)
            setUserData_user(data.data)
        }
        catch (err) {
            if (err.response) {
                setFetchingUserData_user(false)
                setUserDataSuccess_user(false)
            }
            else {
                setFetchingUserData_user(false)
                setUserDataSuccess_user(false)
            }
        }
    }

    fetchUserHistory_admin = async (
        id,
        setUserData_admin,
        setFetchingUserData_admin,
        setUserDataSuccess_admin,
    ) => {
        setFetchingUserData_admin(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/admin/user/${id}`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });
            setFetchingUserData_admin(false)
            setUserDataSuccess_admin(true)
            setUserData_admin(data.data)
        }
        catch (err) {
            if (err.response) {
                setFetchingUserData_admin(false)
                setUserDataSuccess_admin(false)
            }
            else {
                setFetchingUserData_admin(false)
                setUserDataSuccess_admin(false)
            }
        }
    }

    fetchUserHistory_admin_refresh = async (
        id,
        setUserData_admin,
        setFetchingUserData_admin_refesh,
    ) => {
        setFetchingUserData_admin_refesh(true)

        try {
            const { data } = await axios.get(`${BASE_URL}/admin/user/${id}`, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });

            setFetchingUserData_admin_refesh(false)
            setUserData_admin(data.data)
        }
        catch (err) {
            if (err.response) {
                setFetchingUserData_admin_refesh(false)
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setFetchingUserData_admin_refesh(false)
            }
        }
    }

    creaditUser = async (
        data_,
        id,
        setCreditingUser,
        showOpenCreditUserModal,
        setUserData_admin,
        setFetchingUserData_admin_refesh,
        setInp
    ) => {
        setCreditingUser(true)

        try {
            const { data } = await axios.put(`${BASE_URL}/payusers/${id}`, data_, {
                headers: {
                    'authorization': `Bearer ${Cookies.get('accesstoken')}`,
                    'authorization-admin': `Bearer ${Cookies.get('extratoken')}`
                }
            });

            this.fetchUserHistory_admin_refresh(id, setUserData_admin, setFetchingUserData_admin_refesh)

            setCreditingUser(false)
            toast(data.msg, { type: 'success' });

            showOpenCreditUserModal(false);
            setInp({
                amount: null,
                action: ""
            })
        }
        catch (err) {
            if (err.response) {
                setCreditingUser(false)
                toast(err.response.data.msg, { type: 'error' })
            }
            else {
                setCreditingUser(false)
                toast(err.message, { type: 'error' })
            }
        }
    }
}

export default apiClass;