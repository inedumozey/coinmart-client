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

const api = new apiClass()


export default function Transfer() {
    const { user, skeleton } = useContext(Context);
    const {
        profileData,
        profileLoading,
        fetchProfileSuccess,
        profileLoadingAgain,
        setProfileLoadingAgain,
        setProfileData,
        setFetchProfileSuccess,
        setFetchProfileMsg,
    } = user.profile;

    const {
        transferLoading_checkUser,
        setTransferLoading_checkUser,
        transferLoading_payUser,
        setTransferLoading_payUser
    } = user.transfer

    const { preparing, setPreparing } = skeleton;

    const initiastate = {
        amount: null,
        accountNumber: null
    }

    const [inp, setInp] = useState(initiastate);
    const [restrict, setRestrict] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setPreparing(false)
        }, 500)
    }, [])


    useEffect(() => {
        // if inp.amount is more than total balance, restrict
        if (inp.amount > profileData.amount) {
            setRestrict(true)
        }
        else if (!inp.amount || !inp.accountNumber) {
            setRestrict(true)
        }
        else {
            setRestrict(false)
        }


        // if inp.amount is not amoung the listed amount for transfer, restrict
    }, [inp.amount, inp.accountNumber]);

    // submit data
    const submitForm = () => {
        // if accesstoken not there, refresh it before proceeding to get profile, otherwise, get profile straight up
        if (!Cookies.get('accesstoken')) {
            api.refreshToken()
            setTimeout(() => {
                api.transfer_checkUser(inp, setTransferLoading_checkUser)
            }, 2000);
        }
        else {
            api.transfer_checkUser(inp, setTransferLoading_checkUser)
        }
    }

    // submit data
    // const submitForm = () => {
    //     // if accesstoken not there, refresh it before proceeding to get profile, otherwise, get profile straight up
    //     if (!Cookies.get('accesstoken')) {
    //         api.refreshToken()
    //         setTimeout(() => {
    //             api.transfer_payUser(setProfileData, setProfileLoadingAgain, setFetchProfileSuccess, setFetchProfileMsg, inp, setTransferLoading_checkUser)
    //         }, 2000);
    //     }
    //     else {
    //         api.transfer_payUser(setProfileData, setProfileLoadingAgain, setFetchProfileSuccess, setFetchProfileMsg, inp, setTransferLoading_checkUser)
    //     }
    // }


    return (
        <Wrapper>
            {
                preparing || profileLoading ?
                    <>
                        <SubWrapper>
                            <div className="amount">
                                <Skeleton />
                            </div>
                        </SubWrapper>
                    </>
                    :
                    !fetchProfileSuccess ?
                        <div style={{ color: 'red', fontSize: '.7rem' }} className="center">
                            Failed to fetch data! Please refresh
                        </div> :
                        <>
                            <SubWrapper>
                                <div className="amount">
                                    <div>
                                        <span className="tag">Total Balance: </span><span>{profileData.amount} {profileData.currency}</span>
                                    </div>
                                </div>
                                <form onSubmit={submitForm} action="">
                                    <InputWrapper>
                                        <InputIcon right="" left="0">
                                            <PinIcon className='icon' />
                                        </InputIcon>
                                        <input
                                            type="number"
                                            placeholder='Account Number'
                                            value={inp.accountNumber || ''}
                                            onChange={(e) => setInp({ ...inp, accountNumber: e.target.value })}
                                        />
                                    </InputWrapper>

                                    <InputWrapper>
                                        <InputIcon right="" left="0">
                                            <AttachMoneyIcon className='icon' />
                                        </InputIcon>
                                        <input
                                            type="number"
                                            placeholder='Amout'
                                            value={inp.amount || ''}
                                            onChange={(e) => setInp({ ...inp, amount: e.target.value })}
                                        />
                                    </InputWrapper>

                                    <div className='text-center text-md-start mt- pt-2'>

                                        <Btn disabled={restrict} color="var(--blue)" link={false}>
                                            {transferLoading_checkUser || profileLoadingAgain ? <Spinner_ size="sm" /> : "Update Account"}
                                        </Btn>
                                    </div>

                                </form>
                            </SubWrapper>
                        </>
            }

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
    }
`

const SubWrapper = styled.div`
    background: #fff;
    min-height: 60px;
    padding: 20px 10px;
    width: 100%;
    margin: auto;
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