import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../../context/Context';
import Spinner_ from '../../spinner/Spinner';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ChangeProfileImage from '../../../components/user/ChangeProfileImage';
import apiClass from '../../../utils/api';
import Modal from '../../Modal';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Skeleton from '../../Skeleton';


export default function UpdateAccount() {
    const { user } = useContext(Context);
    const { profileData, profileLoading, fetchProfileSuccess } = user.profile;
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    })

    const initiastate = {
        email: profileData.email,
        username: profileData.username,
        amount: profileData.amount,
        currency: profileData.currency,
        address: profileData.profile?.address,
        country: profileData.profile?.country,
        phone: profileData.profile?.phone,
        profileImage: profileData.profile?.profilePicUrl
    }

    return (
        <Wrapper>
            <h4 style={{ textAlign: 'center' }}>Update Your Account</h4>
            {
                loading || profileLoading ?
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
                    fetchProfileSuccess ? <Form initiastate={initiastate} profileData={profileData} /> :
                        <div style={{ color: 'red', fontSize: '.7rem' }} className="center">Failed to fetch data! Please refresh</div>
            }

        </Wrapper>
    )
}

const Form = ({ initiastate, profileData }) => {
    const [inp, setInp] = useState(initiastate);

    const { user } = useContext(Context);
    const {
        profileImageLoading,
    } = user.profileImage;


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

            {/* <InputWrapper>
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
                    <EmailRoundedIcon className='icon' />
                </InputIcon>
                <input
                    type="text"
                    disabled
                    value={inp.username || ''}
                    onChange={(e) => setInp({ ...inp, username: e.target.value })}
                />
            </InputWrapper> */}

        </FormStyle>
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

const FormStyle = styled.form`
    
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