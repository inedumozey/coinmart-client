import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../../context/Context';
import Spinner_ from '../../spinner/Spinner';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ChangeProfileImage from '../../../components/user/ChangeProfileImage';
import apiClass from '../../../utils/api';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Skeleton from '../../Skeleton';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import PublicIcon from '@mui/icons-material/Public';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import Cookies from 'js-cookie'
import Btn from '../../Btn/Btn';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

const api = new apiClass()


export default function UpdateAccount() {
    const { user, skeleton } = useContext(Context);
    const {
        profileData,
        profileLoading,
        fetchProfileSuccess,
    } = user.profile;

    const { preparing, setPreparing } = skeleton;

    useEffect(() => {
        setTimeout(() => {
            setPreparing(false)
        }, 500)
    }, [])

    const initiastate = {
        email: profileData.email,
        username: profileData.username,
        address: profileData.profile?.address,
        country: profileData.profile?.country,
        phone: profileData.profile?.phone,
        profileImage: profileData.profile?.profilePicUrl
    }

    return (
        <Wrapper>
            <h4 style={{ textAlign: 'center' }}>Update Your Account</h4>
            {
                preparing || profileLoading ?
                    <>
                        <ImgWrapper>
                            <div className="img">
                                <Skeleton type="round" />
                            </div>
                        </ImgWrapper>
                        {
                            [1, 2, 3, 4].map((item, i) => {
                                return <InputWrapper key={i}>
                                    <Skeleton />
                                </InputWrapper>

                            })
                        }
                    </>
                    :
                    !fetchProfileSuccess ?
                        <div style={{ color: 'red', fontSize: '.7rem' }} className="center">
                            Failed to fetch data! Please refresh
                        </div> :
                        <>
                            <Form initiastate={initiastate} />
                            <ChangePassword />
                        </>
            }

        </Wrapper>
    )
}

const Form = ({ initiastate }) => {
    const { user } = useContext(Context);
    const {
        profileData,
        setProfileData,
        profileLoadingAgain,
        setProfileLoadingAgain,
        setFetchProfileSuccess,
        setFetchProfileMsg,
        editProfileLoading,
        setEditProfileLoading } = user.profile;
    const [inp, setInp] = useState(initiastate);

    const {
        profileImageLoading,
    } = user.profileImage;

    const submitForm = () => {
        // if accesstoken not there, refresh it before proceeding to get profile, otherwise, get profile straight up
        if (!Cookies.get('accesstoken')) {
            api.refreshToken()
            setTimeout(() => {
                api.updateProfile(setEditProfileLoading, setProfileData, setProfileLoadingAgain, setFetchProfileSuccess, setFetchProfileMsg, inp)
            }, 2000);
        }
        else {
            api.updateProfile(setEditProfileLoading, setProfileData, setProfileLoadingAgain, setFetchProfileSuccess, setFetchProfileMsg, inp)
        }
    }

    return (
        <FormStyle>
            <ImgWrapper>
                <div className="img">
                    {
                        profileImageLoading ? <div className="changeProfile center"><Spinner_ size="sm" /></div> :
                            <label htmlFor='file' className="changeProfile">
                                <AddAPhotoIcon style={{ fontSize: '2rem', color: '#000' }} />
                            </label>
                    }
                    <ChangeProfileImage />
                    <img src={profileData.profile && profileData.profile.profilePicUrl ? profileData.profile.profilePicUrl : "https://api.multiavatar.com/popo.svg"} alt="profile image" />
                </div>
            </ImgWrapper>

            <InputWrapper>
                <div className="wrap">
                    <h5 className="tag">Account Bal: </h5>
                    <h6 className="value">{profileData.amount} {profileData.currency}</h6>
                </div>
            </InputWrapper>

            <InputWrapper>
                <div className="wrap">
                    <h5 className="tag">Account No: </h5>
                    <h6 className="value">{profileData.accountNumber}</h6>
                </div>
            </InputWrapper>

            <InputWrapper>
                <InputIcon right="" left="0">
                    <EmailRoundedIcon className='icon' />
                </InputIcon>
                <input
                    type="text"
                    disabled
                    value={inp.email || ''}
                    onChange={(e) => setInp({ ...inp, email: e.target.value })}
                />
            </InputWrapper>


            <InputWrapper>
                <InputIcon right="" left="0">
                    <PersonIcon className='icon' />
                </InputIcon>
                <input
                    type="text"
                    disabled
                    value={inp.username || ''}
                    onChange={(e) => setInp({ ...inp, username: e.target.value })}
                />
            </InputWrapper>

            <InputWrapper>
                <InputIcon right="" left="0">
                    <LocalPhoneIcon className='icon' />
                </InputIcon>
                <input
                    type="text"
                    value={inp.phone || ''}
                    onChange={(e) => setInp({ ...inp, phone: e.target.value })}
                />
            </InputWrapper>

            <InputWrapper>
                <InputIcon right="" left="0">
                    <EditLocationIcon className='icon' />
                </InputIcon>
                <input
                    type="text"
                    value={inp.address || ''}
                    onChange={(e) => setInp({ ...inp, address: e.target.value })}
                />
            </InputWrapper>

            <InputWrapper>
                <InputIcon right="" left="0">
                    <PublicIcon className='icon' />
                </InputIcon>
                <input
                    type="text"
                    value={inp.country || ''}
                    onChange={(e) => setInp({ ...inp, country: e.target.value })}
                />
            </InputWrapper>

            <div className='text-center text-md-start mt- pt-2'>

                <Btn onClick={submitForm} color="var(--blue)" link={false}>
                    {editProfileLoading || profileLoadingAgain ? <Spinner_ size="sm" /> : "Update Account"}
                </Btn>
            </div>

        </FormStyle>
    )
}


const ChangePassword = () => {
    const { user } = useContext(Context);
    const {
        changePasswordLoading,
        setChangePasswordLoading,
        changePasswordSuccess,
        setChangePasswordSuccess
    } = user.passwordReset;

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newCpassword, setNewCpassword] = useState("");

    const submitForm = () => {
        const data = {
            oldPassword,
            newPassword,
            newCpassword
        }
        // if accesstoken not there, refresh it before proceeding to get profile, otherwise, get profile straight up
        if (!Cookies.get('accesstoken')) {
            api.refreshToken()
            setTimeout(() => {
                api.resetPassword(setChangePasswordLoading, data, setChangePasswordSuccess)
            }, 2000);
        }
        else {
            api.resetPassword(setChangePasswordLoading, data, setChangePasswordSuccess)
        }
    }

    // clear form input when the update is successful
    useEffect(() => {
        if (changePasswordSuccess) {
            setOldPassword('');
            setNewPassword('');
            setNewCpassword('');
        }
    }, [changePasswordSuccess])

    return (
        <ChangePasswordStyle>
            <h5 style={{ textAlign: 'center' }}>Reset Password</h5>

            <InputWrapper>
                <InputIcon right="" left="0">
                    <VpnKeyRoundedIcon className='icon' />
                </InputIcon>
                <input
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword || ''}
                    placeholder="Old Password"
                    onInput={(e) => setOldPassword(e.target.value)}
                />
                <InputIcon onClick={() => setShowOldPassword(!showOldPassword)} right="0" left="">
                    {showOldPassword ? <VisibilityOffRoundedIcon className='icon' /> : <RemoveRedEyeRoundedIcon className='icon' />}
                </InputIcon>
            </InputWrapper>

            <InputWrapper>
                <InputIcon right="" left="0">
                    <VpnKeyRoundedIcon className='icon' />
                </InputIcon>
                <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword || ''}
                    placeholder="Password"
                    onInput={(e) => setNewPassword(e.target.value)}
                />
                <InputIcon onClick={() => setShowPassword(!showPassword)} right="0" left="">
                    {showPassword ? <VisibilityOffRoundedIcon className='icon' /> : <RemoveRedEyeRoundedIcon className='icon' />}
                </InputIcon>
            </InputWrapper>

            <InputWrapper>
                <InputIcon right="" left="0">
                    <VpnKeyRoundedIcon className='icon' />
                </InputIcon>
                <input
                    type={showCPassword ? "text" : "password"}
                    value={newCpassword || ''}
                    placeholder="Confirm Password"
                    onInput={(e) => setNewCpassword(e.target.value)}
                />
                <InputIcon onClick={() => setShowCPassword(!showCPassword)} right="0" left="">
                    {showCPassword ? <VisibilityOffRoundedIcon className='icon' /> : <RemoveRedEyeRoundedIcon className='icon' />}
                </InputIcon>
            </InputWrapper>
            <div className='text-center text-md-start mt- pt-2'>

                <Btn onClick={submitForm} color="var(--blue)" link={false}>
                    {changePasswordLoading ? <Spinner_ size="sm" /> : "Reset Password"}
                </Btn>
            </div>

        </ChangePasswordStyle>
    )
}


const Wrapper = styled.div`
    width: 100vw;
    margin: auto;
    max-width: 800px;
    padding: 10px ${({ theme }) => theme.lg_padding};
    @media (max-width: ${({ theme }) => theme.md_screen}){
        padding: 10px ${({ theme }) => theme.md_padding};
    }
    @media (max-width: ${({ theme }) => theme.sm_screen}){
        padding: 10px ${({ theme }) => theme.sm_padding};
    }
`

const InputWrapper = styled.div`
    width: 100%;
    box-shadow: 2px 2px 4px #ccc;
    height: 45px;
    margin-bottom: 15px;
    position: relative;

    .wrap{
        display: flex;
        padding: 12px;

        .tag {
            font-weight: bold;
            margin-right: 10px;
        }
    }
    
    
    input {
        border: none;
        border-right: none;
        padding: 12px 30px 12px 30px;
        height: 100%;
        width: 100%;
        display: block;
        font-size: .9rem;

        &: focus{
            outline: none;
            border-bottom: 2px solid var(--blue);
        }
    } 

    input[type="submit"]{
        border-radius: 20px;
        color: #fff;
        border: none;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        background: var(--blue);
    }
`

const InputIcon = styled.div`
    position: absolute;
    padding: 3px;
    width: 30px;
    z-index: 1;
    bottom: 0;
    left: ${({ left }) => left};
    right: ${({ right }) => right};
    font-size: .8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .icon {
        font-size: 1rem;
    }
`

const FormStyle = styled.div`
    
`

const ImgWrapper = styled.div`
    margin: 20px 0;

    .img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: contain;
        position: relative;

        .changeProfile {
            position: absolute;
            right: 10px;
            bottom: 0;
            cursor: pointer;
        }

        @media (max-width: ${({ theme }) => theme.sm_screen}){
            margin: auto;
        }

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
`

const ChangePasswordStyle = styled.div`
    background: #fff;
    min-height: 100px;
    padding: 20px;
    margin: 30px 0 20px 0;
`