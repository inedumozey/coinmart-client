import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import PublicIcon from '@mui/icons-material/Public';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { Context } from '../../../../context/Context';
import Copy from '../../../CopyToClipboard';


export default function Profile({ data }) {
    const { admin, config } = useContext(Context);

    return (
        <Wrapper>
            <div className="user img">
                <img src={data.profile && data.profile.profilePicUrl ? data.profile.profilePicUrl : "https://api.multiavatar.com/popo.svg"} alt="profile image" />
            </div>

            <div className='user'>
                <span className="name">Username: </span>
                <span className="value">{data.username}</span>
            </div>

            <div className='user'>
                <span className="name">Email: </span>
                <span className="value">{data.email}</span>
            </div>

            <div className='user'>
                <span className="name">Member Since: </span>
                <span className="value"> {data.createdAt && new Date(data.createdAt).toLocaleString()}</span>
            </div>

            <div className='user'>
                <span className="name">Acct Bal: </span>
                <span className="value">{data.amount} {data.currency}</span>
            </div>

            <div className='user'>
                <span className="name">Acct No: </span>
                <span className="value">{data.accountNumber} </span>
            </div>
            <div className='user'>
                <span className="name">Referral Code: </span>
                <span className="value">{data.referralCode} </span>
            </div>
            <div className='user'>
                <span className="name">Investment: </span>
                <span className="value">{data.investmentCount} </span>
            </div>
            <div className='user'>
                <span className="name">Role: </span>
                <span className="value">{data.Role} {data.isSupperAdmin ? `(SUPPER ADMIN)` : ''}</span>
            </div>
            <div className='user'>
                <span className="name">Referred By: </span>
                <span className="value">{data.referrerUsername} </span>
            </div>

            {
                data.isBlocked ? <div className='user'>
                    <div className="name">User Account is Deactivated</div>
                </div> : ''
            }

        </Wrapper>
    )
}

const Wrapper = styled.div`

    .img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid #ccc;
        object-fit: contain;
        position: relative;

        @media (max-width: ${({ theme }) => theme.sm_screen}){
            margin: auto;
        }

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    
    .user {
        margin-bottom: 10px;
        .name {
            font-weight: bold;
        }
    }
`
