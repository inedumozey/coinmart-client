import { Routes, Route } from "react-router-dom";
import Image from 'react-bootstrap/Image';

// landing pages
import LandingPagePlans from './landing/Plans';
import RealEstate from './landing/RealEstate';
import AboutUs from './landing/AboutUs';
import Contacts from './landing/Contacts';
import FAQ from './landing/FAQ';
import Home from './landing/Home';

//auth pages
import Index from './auth/';
import VerifyForgotPassword from './auth/VerifyForgotPassword';
import ForgotPassword from './auth/ForgotPassword';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import TC from './auth/TC';
import VerifyEmail from './auth/VerifyEmail';

// user dashboard pages
import UserDashboard from "./users/UserDashboard";
import Deposit from './users/Deposit';
import Plans from './users/Plans';
import Plan from './users/Plan';
import Notifications from './users/Notifications';
import Notification from './users/Notification';
import UpdateAccount from './users/UpdateAccount';
import Ticket from './users/Ticket';
import Transactions from './users/Transactions';
import Withdrawal from './users/Withdrawal';
import Security from './users/Security';
import VerifyAccount from './users/VerifyAccount';
import Downlines from './users/Downlines';
import ReferralHistory from './users/ReferralHistory';
import ReferralContest from './users/ReferralContest';

//admin pages
import AdminHome from './admin/Home';
import AdminUsers from './admin/Users';
import AdminUser from './admin/User';
import AdminNewDeposit from "./admin/NewDeposit";
import AdminConfirmedDeposit from "./admin/ConfirmedDeposit";
import AdminNotifications from './admin/Notifications';
import AdminInvestmentHx from './admin/InvestmentHx';
import AdminPlans from './admin/Plans';
import AdminPlan from './admin/Plan';
import AdminWithdrawalRequest from './admin/WithdrawalRequest';
import AdminWithdrawalRejected from './admin/WithdrawalRejected';
import AdminWithdrawalConfirmed from './admin/WithdrawalConfirmed';
import AdminReferralHx from './admin/ReferralHx';
import AdminReferralConfig from './admin/ReferralConfig';
import AdminReferralContest from './admin/ReferralContest';



//certificate model page
import Certificate from "./certificate/Certificate";

//404 page
import PageNotFound from "./404/PageNotFound";
import Custome404 from "./404/Custome404";



export default function Pages() {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Home />} />
                <Route path="plans" element={<LandingPagePlans />} />
                <Route path="real-estate" element={<RealEstate />} />
                <Route path="about-us" element={<AboutUs />} />
                <Route path="contact" element={<Contacts />} />
                <Route path="faq" element={<FAQ />} />
            </Route>

            <Route path="/auth">
                <Route path="" element={<Index />} />
                <Route path="signup" element={<Signup />} />
                <Route path="signin" element={<Signin />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="verify-forgot-password/:token" element={<VerifyForgotPassword />} />
                <Route path="tc" element={<TC />} />
                <Route path="verify-email/:token" element={<VerifyEmail />} />
            </Route>

            <Route path="/dashboard">
                <Route path="" element={<UserDashboard />} />
                <Route path="deposit" element={<Deposit />} />
                <Route path="withdrawal" element={<Withdrawal />} />
                <Route path="downlines" element={<Downlines />} />
                <Route path="plans" element={<Plans />} />
                <Route path="plans/:id" element={<Plan />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="notifications/:id" element={<Notification />} />
                <Route path="update-account" element={<UpdateAccount />} />
                <Route path="tickets" element={<Ticket />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="security" element={<Security />} />
                <Route path="verify-account" element={<VerifyAccount />} />
                <Route path="referral-history" element={<ReferralHistory />} />
                <Route path="referral-contest" element={<ReferralContest />} />
            </Route>

            <Route path="/admin">
                <Route path="" element={<AdminHome />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="users/:id" element={<AdminUser />} />
                <Route path="deposit/confirmed" element={<AdminConfirmedDeposit />} />
                <Route path="deposit/new" element={<AdminNewDeposit />} />
                <Route path="notifications" element={<AdminNotifications />} />
                <Route path="investment/history" element={<AdminInvestmentHx />} />
                <Route path="investment/plans" element={<AdminPlans />} />
                <Route path="investment/plans/:id" element={<AdminPlan />} />
                <Route path="withdrawal/request" element={<AdminWithdrawalRequest />} />
                <Route path="withdrawal/rejected" element={<AdminWithdrawalRejected />} />
                <Route path="withdrawal/confirmed" element={<AdminWithdrawalConfirmed />} />
                <Route path="referral/history" element={<AdminReferralHx />} />
                <Route path="referral/config" element={<AdminReferralConfig />} />
                <Route path="referral/contest" element={<AdminReferralContest />} />
            </Route>

            <Route path="certificate/1668012585323" element={<Certificate />} />

            <Route path="*" element={<PageNotFound />} />
            <Route path="/404" element={<Custome404 />} />
        </Routes>
    )
}

