import { useState, useEffect, createContext } from 'react';
import Pages from '../pages';
import Layout from '../layouts';
import staticData from '../utils/staticData';
import SavingsIcon from '@mui/icons-material/Savings';
import PaidIcon from '@mui/icons-material/Paid';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SendIcon from '@mui/icons-material/Send';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import PersonIcon from '@mui/icons-material/Person';
import apiClass from '../utils/api';

const api = new apiClass()

const Context = createContext()

function ContextApi() {
    // modal
    const [show, setShow] = useState(false);

    // load skeleton
    const [preparing, setPreparing] = useState(true);

    // config
    const [configData, setConfigData] = useState('')
    const [updatingConfig, setUpdatingConfig] = useState(false)
    const [category, setCategory] = useState('')

    useEffect(() => {
        api.fetchConfig(setConfigData)
    }, [])


    // ........................admin..............................
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);

    // Reset Password
    const [changeAdminPasswordLoading, setChangeAdminPasswordLoading] = useState(false)
    const [changeAdminPasswordSuccess, setChangeAdminPasswordSuccess] = useState(false);

    // Investment plan
    const [plans, setPlans] = useState([]);
    const [fetchingPlans, setFetchingPlans] = useState(false)
    const [fetchingPlansSuccess, setFetchingPlansSuccess] = useState(false);

    const [openAddPlanModal, setOpenAddPlanModal] = useState(false);
    const [postingPlan, setPostingPlan] = useState(false)
    const [updatingPlan, setUpdatingPlan] = useState(false)
    const [deletingPlan, setDeletingPlan] = useState(false)
    const [refreshingPlans, setRefreshingPlans] = useState(false);
    const [operationType, setOperationType] = useState('');
    const [selectedPlan, setSelectedPlan] = useState('');

    const [openInvestModal, setOpenInvestModal] = useState(false)
    const [selectedInvestingPlan, setSelectedInvestingPlan] = useState('')
    const [investLoading, setInvestLoading] = useState(false)

    // ---------for admin
    const [investmentData_admin, setInvestmentData_admin] = useState([]);
    const [fetchingInvestments_admin, setFetchingInvestments_admin] = useState(false);
    const [fetchInvestmentsMsg_admin, setFetchInvestmentsMsg_admin] = useState('');
    const [resolvingInvestment, setResolvingInvestment] = useState(false);
    // ---------for users
    const [investmentData_users, setInvestmentData_users] = useState('');
    const [fetchingInvestments_users, setFetchingInvestments_users] = useState(false);
    const [fetchInvestmentsMsg_users, setFetchInvestmentsMsg_users] = useState('');

    // fetch all users by admin
    const [userData, setUserData] = useState([]);
    const [fetchingUsers_initial, setFetchingUsers_initial] = useState(true);
    const [fetchingUsersSuccess_initial, setFetchingUsersSuccess_initial] = useState(false);
    const [fetchingUsers_refresh, setFetchingUsers_refresh] = useState(false);

    const [toggleBlockUserLoading, setToggleBockUserLoading] = useState(false);
    const [toggleMakeAdminLoading, setToggleMakeAdminLoading] = useState(false);
    const [deleteUserLoading, setDeleteUserLoading] = useState(false);

    // fetch pending withdrawal data
    const [fetchingPendingWithdrawalData_initial, setFetchingPendingWithdrawalData_initial] = useState(false);
    const [fetchingPendingWithdrawalData_refresh, setFetchingPendingWithdrawalData_refresh] = useState(false);
    const [pendingWithdrawalDataSuccess, setPendingWithdrawalDataSuccess] = useState(false);
    const [pendingWithdrawalData, setPendingWithdrawalData] = useState([]);
    const [showPendingWithdrawalModal, setShowPendingWithdrawalModal] = useState(false);

    // fetch rejected withdrawal data
    const [fetchingRejectedWithdrawalData_initial, setFetchingRejectedWithdrawalData_initial] = useState(false);
    const [fetchingRejectedWithdrawalData_refresh, setFetchingRejectedWithdrawalData_refresh] = useState(false);
    const [rejectedWithdrawalDataSuccess, setRejectedWithdrawalDataSuccess] = useState(false);
    const [rejectedWithdrawalData, setRejectedWithdrawalData] = useState([]);

    // fetch confirmed withdrawal data
    const [fetchingConfirmedWithdrawalData_initial, setFetchingConfirmedWithdrawalData_initial] = useState(false);
    const [fetchingConfirmedWithdrawalData_refresh, setFetchingConfirmedWithdrawalData_refresh] = useState(false);
    const [confirmedWithdrawalDataSuccess, setConfirmedWithdrawalDataSuccess] = useState(false);
    const [confirmedWithdrawalData, setConfirmedWithdrawalData] = useState([]);

    // reject withdrawal
    const [rejectingWithdrawal, setRejectingWithdrawal] = useState(false);
    const [rejectingWithdrawalSuccess, setRejectingWithdrawalSuccess] = useState(false);

    // comfirm withdrawal
    const [confirmingWithdrawal, setConfirmingWithdrawal] = useState(false);
    const [confirmingWithdrawalSuccess, setConfirmingWithdrawalSuccess] = useState(false);

    // admin get user transaction history
    const [selectedUser, setSelectedUser] = useState("");
    const [fetchingUserData_admin, setFetchingUserData_admin] = useState(false);
    const [fetchingUserData_admin_refesh, setFetchingUserData_admin_refesh] = useState(false);
    const [userDataSuccess_admin, setUserDataSuccess_admin] = useState(false);
    const [userData_admin, setUserData_admin] = useState([]);


    // credit user
    const [openCreditUserModal, showOpenCreditUserModal] = useState(false);
    const [creditingUser, setCreditingUser] = useState(false);

    useEffect(() => {
        api.fetchPlans(setPlans, setFetchingPlans, setFetchingPlansSuccess)

        // resolve investment
        api.resolveInvestment()

    }, [])


    const admin_links = [
        { url: '/admin/home', name: 'Home', icon: DashboardIcon },
        { url: '/admin/users', name: 'Users', icon: PersonIcon },
        { url: '/admin/notifications', name: 'Notifications', icon: NotificationsIcon },
    ]

    const admin_investmentLinks = [
        { url: '/admin/investment/plans', name: 'Plans', icon: CreditScoreIcon },
        { url: '/admin/investment/history', name: 'History', icon: CreditScoreIcon },
    ]

    const admin_depositLinks = [
        { url: '/admin/deposit/new', name: 'New', icon: SavingsIcon },
        { url: '/admin/deposit/confirmed', name: 'Confimred', icon: CreditScoreIcon },
    ]

    const admin_withdrawalLinks = [
        { url: '/admin/withdrawal/request', name: 'Request', icon: SavingsIcon },
        { url: '/admin/withdrawal/confirmed', name: 'Confimred', icon: CreditScoreIcon },
        { url: '/admin/withdrawal/rejected', name: 'Rejected', icon: CreditScoreIcon },
    ]

    const admin_referralLinks = [
        { url: '/admin/referral/contest', name: 'Contest', icon: CreditScoreIcon },
    ]


    // .................user and user links................................
    const [profileData, setProfileData] = useState({});
    const [profileLoading, setProfileLoading] = useState(true); // get profile data on initial load of web page
    const [profileLoadingAgain, setProfileLoadingAgain] = useState(false); // subsequent call to get profile data
    const [fetchProfileSuccess, setFetchProfileSuccess] = useState(false);
    const [fetchProfileMsg, setFetchProfileMsg] = useState("");

    // profile image uplaod
    const [profileImageLoading, setProfileImageLoading] = useState(false);
    const [profileImageSuccess, setProfileImageSuccess] = useState(false);
    const [newNotifications, setNewNotifications] = useState(true)
    const [newNotificationCounts, setNewNotificationCounts] = useState(5)
    const [editProfileLoading, setEditProfileLoading] = useState(false)

    // Reset Password
    const [changePasswordLoading, setChangePasswordLoading] = useState(false)
    const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);

    //transfer
    const [fetchingTransferData, setFetchingTransferData] = useState(false);
    const [verifyAccountNoLoading, setVerifyAccountNoLoading] = useState(false);
    const [verifyAccountNoData, setVerifyAccountNoData] = useState('');
    const [showPayUserModal, setShowPayUserModal] = useState(false);
    const [payLoading, setPayLoading] = useState(false);
    const [transferSuccess, setTransferSuccess] = useState(false);

    //withdrawal
    const [withdrawalLoading, setWithdrawalLoading] = useState(false);
    const [withdrawalSuccess, setWithdrawalSuccess] = useState(false);

    //referral
    const [fetchReferralHxLoading, setFetchReferralHxLoading] = useState(false);
    const [referralHxData, setReferralHxData] = useState([]);
    const [fetchReferralHxSuccess, setFetchReferralHxSuccess] = useState(false);
    const [showAddRefcodeModal, setShowAddRefcodeModal] = useState(false);
    const [addingRefcode, setAddingRefcode] = useState(false);

    // user get user transaction history
    const [fetchingUserData_user, setFetchingUserData_user] = useState(false);
    const [userDataSuccess_user, setUserDataSuccess_user] = useState(false);
    const [userData_user, setUserData_user] = useState([]);


    const links = [
        { url: '/dashboard/my-packages', name: 'My Packages', icon: DashboardIcon },
        { url: '/dashboard/withdrawal', name: 'Withdrawal', icon: PaidIcon },
        { url: '/dashboard/deposit', name: 'Deposit', icon: SavingsIcon },
        { url: '/dashboard/transfer', name: 'Transfer', icon: SavingsIcon },
        { url: '/dashboard/transactions', name: 'Transactions', icon: CurrencyExchangeIcon },
        { url: '/dashboard/plans', name: 'Plans', icon: CreditScoreIcon },
        { url: '/dashboard/notifications', name: 'Notifications', icon: newNotifications ? NotificationsActiveIcon : NotificationsIcon },
        { url: '/dashboard/tickets', name: 'Ticket', icon: SendIcon },
    ]

    const profileLinks = [
        { url: '/dashboard/account', name: 'Account', icon: PersonIcon },
        // { url: '/dashboard/security', name: 'Security', icon: LockIcon },
        // { url: '/dashboard/verify-account', name: 'Verify Account', icon: VerifiedIcon },
    ]

    const referralLinks = [
        { url: '/dashboard/referral-history', name: 'Referral History', icon: ManageHistoryIcon },
        { url: '/dashboard/referral-contest', name: 'Referral Contest', icon: SportsKabaddiIcon },
    ]

    const state = {
        ...staticData,
        user: {
            profile: {
                profileData,
                setProfileData,
                setProfileLoading,
                setFetchProfileSuccess,
                setFetchProfileMsg,
                profileLoading,
                fetchProfileSuccess,
                fetchProfileMsg,
                newNotifications,
                setNewNotifications,
                newNotificationCounts,
                setNewNotificationCounts,
                setEditProfileLoading,
                editProfileLoading,
                profileLoadingAgain,
                setProfileLoadingAgain
            },
            profileImage: {
                setProfileImageLoading,
                setProfileImageSuccess,
                profileImageLoading,
                profileImageSuccess,
            },
            links: {
                links,
                profileLinks,
                referralLinks,
            },
            passwordReset: {
                changePasswordLoading,
                setChangePasswordLoading,
                changePasswordSuccess,
                setChangePasswordSuccess
            },
            referral: {
                fetchReferralHxLoading,
                setFetchReferralHxLoading,
                fetchReferralHxSuccess,
                setFetchReferralHxSuccess,
                referralHxData,
                setReferralHxData,
                showAddRefcodeModal,
                setShowAddRefcodeModal,
                addingRefcode,
                setAddingRefcode,
            },
            transfer: {
                verifyAccountNoLoading,
                setVerifyAccountNoLoading,
                verifyAccountNoData,
                setVerifyAccountNoData,
                payLoading,
                setPayLoading,
                fetchingTransferData,
                setFetchingTransferData,
                showPayUserModal,
                setShowPayUserModal,
                transferSuccess,
                setTransferSuccess,
            },
            withdrawal: {
                withdrawalLoading,
                setWithdrawalLoading,
                withdrawalSuccess,
                setWithdrawalSuccess,
            },
            userHistory: {
                fetchingUserData_user,
                setFetchingUserData_user,
                setUserDataSuccess_user,
                userDataSuccess_user,
                userData_user,
                setUserData_user,
            },
        },

        admin: {
            login: {
                loginLoading,
                setLoginLoading,
                loginSuccess,
                setLoginSuccess,
            },
            passwordReset: {
                changePasswordLoading: changeAdminPasswordLoading,
                setChangePasswordLoading: setChangeAdminPasswordLoading,
                changePasswordSuccess: changeAdminPasswordSuccess,
                setChangePasswordSuccess: setChangeAdminPasswordSuccess
            },
            links: {
                links: admin_links,
                investmentLinks: admin_investmentLinks,
                depositLinks: admin_depositLinks,
                withdrawalLinks: admin_withdrawalLinks,
                referralLinks: admin_referralLinks,
            },
            userMgt: {
                fetchingUsers_initial,
                setFetchingUsers_initial,
                fetchingUsersSuccess_initial,
                setFetchingUsersSuccess_initial,
                fetchingUsers_refresh,
                setFetchingUsers_refresh,
                userData,
                setUserData,

                toggleBlockUserLoading,
                setToggleBockUserLoading,
                toggleMakeAdminLoading,
                setToggleMakeAdminLoading,
                deleteUserLoading,
                setDeleteUserLoading,
            },
            withdrawal: {
                fetchingRejectedWithdrawalData_initial,
                setFetchingRejectedWithdrawalData_initial,
                fetchingRejectedWithdrawalData_refresh,
                setFetchingRejectedWithdrawalData_refresh,
                rejectedWithdrawalDataSuccess,
                setRejectedWithdrawalDataSuccess,
                rejectedWithdrawalData,
                setRejectedWithdrawalData,

                fetchingPendingWithdrawalData_initial,
                setFetchingPendingWithdrawalData_initial,
                fetchingPendingWithdrawalData_refresh,
                setFetchingPendingWithdrawalData_refresh,
                pendingWithdrawalDataSuccess,
                setPendingWithdrawalDataSuccess,
                pendingWithdrawalData,
                setPendingWithdrawalData,
                showPendingWithdrawalModal,
                setShowPendingWithdrawalModal,

                fetchingConfirmedWithdrawalData_initial,
                setFetchingConfirmedWithdrawalData_initial,
                fetchingConfirmedWithdrawalData_refresh,
                setFetchingConfirmedWithdrawalData_refresh,
                confirmedWithdrawalDataSuccess,
                setConfirmedWithdrawalDataSuccess,
                confirmedWithdrawalData,
                setConfirmedWithdrawalData,

                rejectingWithdrawal,
                setRejectingWithdrawal,
                rejectingWithdrawalSuccess,
                setRejectingWithdrawalSuccess,
                confirmingWithdrawal,
                setConfirmingWithdrawal,
                confirmingWithdrawalSuccess,
                setConfirmingWithdrawalSuccess,
            },
            userHistory: {
                selectedUser,
                setSelectedUser,
                fetchingUserData_admin,
                setFetchingUserData_admin,
                setUserDataSuccess_admin,
                userDataSuccess_admin,
                userData_admin,
                setUserData_admin,
                setFetchingUserData_admin_refesh,
                fetchingUserData_admin_refesh,

            },
            creditUser: {
                openCreditUserModal,
                showOpenCreditUserModal,
                creditingUser,
                setCreditingUser,
            }
        },

        modal: { show, setShow },

        skeleton: { preparing, setPreparing },

        config: {
            configData,
            setConfigData,
            updatingConfig,
            setUpdatingConfig,
            category,
            setCategory
        },

        investment: {
            plans: {
                plans,
                setPlans,
                openAddPlanModal,
                setOpenAddPlanModal,
                postingPlan,
                setPostingPlan,
                updatingPlan,
                setUpdatingPlan,
                deletingPlan,
                setDeletingPlan,
                refreshingPlans,
                setRefreshingPlans,
                operationType,
                setOperationType,
                selectedPlan,
                setSelectedPlan
            },
            invest: {
                openInvestModal,
                setOpenInvestModal,
                selectedInvestingPlan,
                setSelectedInvestingPlan,
                investLoading,
                setInvestLoading,

                investmentData_admin,
                setInvestmentData_admin,
                fetchingInvestments_admin,
                setFetchingInvestments_admin,
                fetchInvestmentsMsg_admin,
                setFetchInvestmentsMsg_admin,
                resolvingInvestment,
                setResolvingInvestment,

                investmentData_users,
                setInvestmentData_users,
                fetchingInvestments_users,
                setFetchingInvestments_users,
                fetchInvestmentsMsg_users,
                setFetchInvestmentsMsg_users,
            }
        }
    }

    const [load, setLoad] = useState(true)
    setTimeout(() => {
        setLoad(false)
    }, 1000)
    return (
        <Context.Provider value={state}>
            <Layout>
                <Pages />
            </Layout>
        </Context.Provider>
    )
}

export { ContextApi, Context }