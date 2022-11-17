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
import VerifiedIcon from '@mui/icons-material/Verified';
import LockIcon from '@mui/icons-material/Lock';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import PersonIcon from '@mui/icons-material/Person';

const Context = createContext()

function ContextApi() {
    // modal
    const [show, setShow] = useState(false);

    const [profileData, setProfileData] = useState({});
    const [profileLoading, setProfileLoading] = useState(true);
    const [fetchProfileSuccess, setFetchProfileSuccess] = useState(false);
    const [fetchProfileMsg, setFetchProfileMsg] = useState("");

    // ........................admin..............................
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);

    const admin_links = [
        { url: '/admin/home', name: 'Home', icon: DashboardIcon },
        { url: '/admin/users', name: 'Users', icon: PersonIcon },
        { url: '/admin/notifications', name: 'Notifications', icon: NotificationsIcon },
    ]

    const admin_investmentLinks = [
        { url: '/admin/investment/config', name: 'Config', icon: CreditScoreIcon },
        { url: '/admin/investment/plans', name: 'Plans', icon: CreditScoreIcon },
        { url: '/admin/investment/history', name: 'History', icon: CreditScoreIcon },
    ]

    const admin_transferLinks = [
        { url: '/admin/transfer/config', name: 'Config', icon: CreditScoreIcon },
        { url: '/admin/transfer/history', name: 'History', icon: CreditScoreIcon },
    ]

    const admin_depositLinks = [
        { url: '/admin/deposit/config', name: 'Config', icon: SavingsIcon },
        { url: '/admin/deposit/new', name: 'New', icon: SavingsIcon },
        { url: '/admin/deposit/confirmed', name: 'Confimred', icon: CreditScoreIcon },
    ]

    const admin_withdrawalLinks = [
        { url: '/admin/withdrawal/config', name: 'Config', icon: SavingsIcon },
        { url: '/admin/withdrawal/request', name: 'Request', icon: SavingsIcon },
        { url: '/admin/withdrawal/confirmed', name: 'Confimred', icon: CreditScoreIcon },
        { url: '/admin/withdrawal/rejected', name: 'Rejected', icon: CreditScoreIcon },
    ]

    const admin_referralLinks = [
        { url: '/admin/referral/config', name: 'Config', icon: CreditScoreIcon },
        { url: '/admin/referral/history', name: 'History', icon: SavingsIcon },
        { url: '/admin/referral/contest', name: 'Contest', icon: CreditScoreIcon },
    ]


    // .................user and user links................................

    // profile image uplaod
    const [profileImageLoading, setProfileImageLoading] = useState(false);
    const [profileImageSuccess, setProfileImageSuccess] = useState(false);
    const [newNotifications, setNewNotifications] = useState(true)
    const [newNotificationCounts, setNewNotificationCounts] = useState(5)

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
        { url: '/dashboard/security', name: 'Security', icon: LockIcon },
        { url: '/dashboard/verify-account', name: 'Verify Account', icon: VerifiedIcon },
    ]

    const referralLinks = [
        { url: '/dashboard/downlines', name: 'Downlines', icon: GroupAddIcon },
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
                setNewNotificationCounts
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
            }
        },
        admin: {
            login: {
                loginLoading,
                setLoginLoading,
                loginSuccess,
                setLoginSuccess,
            },
            links: {
                links: admin_links,
                transferLinks: admin_transferLinks,
                investmentLinks: admin_investmentLinks,
                depositLinks: admin_depositLinks,
                withdrawalLinks: admin_withdrawalLinks,
                referralLinks: admin_referralLinks,
            }
        },
        modal: {
            show,
            setShow
        },
    }

    return (
        <Context.Provider value={state}>
            <Layout>
                <Pages />
            </Layout>
        </Context.Provider>
    )
}



export { ContextApi, Context }