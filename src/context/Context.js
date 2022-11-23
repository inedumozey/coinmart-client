import { useState, useEffect, createContext } from 'react';
import Pages from '../pages';
import Layout from '../layouts';
import staticData from '../utils/staticData';
import styled from 'styled-components'
import SavingsIcon from '@mui/icons-material/Savings';
import PaidIcon from '@mui/icons-material/Paid';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SendIcon from '@mui/icons-material/Send';
import VerifiedIcon from '@mui/icons-material/Verified';
import LockIcon from '@mui/icons-material/Lock';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import PersonIcon from '@mui/icons-material/Person';
import apiClass from '../utils/api';
import Skeleton from '../components/Skeleton';

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

    const admin_transferLinks = [
        { url: '/admin/transfer/history', name: 'History', icon: CreditScoreIcon },
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
        { url: '/admin/referral/history', name: 'History', icon: SavingsIcon },
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
    const [transferLoading_checkUser, setTransferLoading_checkUser] = useState(false);
    const [transferLoading_payUser, setTransferLoading_payUser] = useState(false);

    //referral
    const [fetchReferralHxLoading, setFetchReferralHxLoading] = useState(false);
    const [referralHxData, setReferralHxData] = useState([]);
    const [addReferral, setAddingReferral] = useState(false);
    const [fetchReferralHxSuccess, setFetchReferralHxSuccess] = useState(false);
    const [showAddLinkModal, setShowAddLinkModal] = useState(false);


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
                addReferral,
                setAddingReferral,
                showAddLinkModal,
                setShowAddLinkModal
            },
            transfer: {
                transferLoading_checkUser,
                setTransferLoading_checkUser,
                transferLoading_payUser,
                setTransferLoading_payUser
            }
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
                transferLinks: admin_transferLinks,
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
            {
                configData && !load && fetchingPlansSuccess ?
                    <Layout>
                        <Pages />
                    </Layout> :
                    <Preloader />

            }
        </Context.Provider>
    )
}


function Preloader() {
    return (
        <PreloaderStyle>
            {/* header */}
            <div className="header"><Skeleton /></div>
            <div className="main">
                <span className="aside">
                    <Skeleton />
                    <div className="image">
                        <div className="child"><Skeleton type="round" /></div>
                    </div>
                </span>
                <span className="mainWrapper">
                    <div className="canvas"><Skeleton /></div>
                    <div className="footer"><Skeleton /></div>
                </span>
            </div>
        </PreloaderStyle>
    )
}
const PreloaderStyle = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    background: #ddd;

    .header {
        width: 100%;
        height: 70px;
        padding: 0 0 5px 0
    }
    .main {
        height: calc(100% - 70px);
        width: 100%;

        .aside {
            width: 150px;
            height: 100%;
            display: inline-block;
            padding: 0 5px 0 0;
            position: relative;

            .image {
                position: absolute;
                width: 80px;
                height: 80px;
                border-radius: 50%;
                left: 50%;
                display: flex;
                padding: 5px;
                justify-content: center;
                align-items: center;
                background: #ddd;
                z-index: 2;
                top: 10px;
                transform: translateX(-50%);

                .child {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;

                }
            }

            @media (max-width: ${({ theme }) => theme.md_screen}){
                display: none;
            }
        }

        .mainWrapper {
            width: calc(100% - 150px);
            height: 100%;
            display: inline-block;

            @media (max-width: ${({ theme }) => theme.md_screen}){
                width: 100%;
            }

            .footer {
                width: 100%;
                height: 70px;
            }
            .canvas {
                height: calc(100% - 70px);
                width: 100%;
                padding: 0 0 5px 0
            }
        }
    }
`


export { ContextApi, Context }