import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Context } from '../../../context/Context';
import Spinner_ from '../../spinner/Spinner';
import apiClass from '../../../utils/api';
import Skeleton from '../../Skeleton';
import PersonIcon from '@mui/icons-material/Person';
import Cookies from 'js-cookie'
import Btn from '../../Btn/Btn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PinIcon from '@mui/icons-material/Pin';
import Transfer from './config/Transfer';
import Withdrawal from './config/Withdrawal';
import Investment from './config/Investment';
import MemberManagement from './config/MemberManagement';
import Referral from './config/Referral';
import AdminResetPassword from './config/AdminResetPassword';

const api = new apiClass()


export default function Home() {
    const { admin, skeleton, config } = useContext(Context);
    const {
        configData,
    } = config;

    return (
        <Wrapper>

            <SubWrapper>
                <div className="tag">Transfer Config</div>
                <Transfer initialState={configData} />
            </SubWrapper>

            <SubWrapper>
                <div className="tag">Withdrawal Config</div>
                <Withdrawal initialState={configData} />
            </SubWrapper>

            <SubWrapper>
                <div className="tag">Investment Config</div>
                <Investment initialState={configData} />
            </SubWrapper>

            <SubWrapper>
                <div className="tag">Member's Management</div>
                <MemberManagement initialState={configData} />
            </SubWrapper>

            <SubWrapper>
                <div className="tag">Referral Control</div>
                <Referral initialState={configData} />
            </SubWrapper>

            <SubWrapper>
                <div className="tag">Reset Admin Password</div>
                <AdminResetPassword />
            </SubWrapper>

        </Wrapper>
    )
}


const Wrapper = styled.div`
width: 100vw;
margin: auto;
max-width: 800px;
min-height: 70vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

padding: 10px ${({ theme }) => theme.lg_padding};
@media (max-width: ${({ theme }) => theme.md_screen}){
    padding: 10px ${({ theme }) => theme.md_padding};
}
@media (max-width: ${({ theme }) => theme.sm_screen}){
    padding: 10px ${({ theme }) => theme.sm_padding};
}

.tag { 
    font-weight: bold;
    margin-bottom: 20px;
}
`

const SubWrapper = styled.div`
    background: #fff;
    min-height: 60px;
    padding: 20px 10px;
    width: 100%;
    margin: 10px auto 40px auto;
    box-shadow: 2px 2px 5px #ccc;

    .amount {
        display: inline-block;
        padding: 2px 0;
        min-width: 120px;
        height: 30px;
        margin-bottom: 20px;
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