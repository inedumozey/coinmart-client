import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { Context } from '../../../context/Context';
import apiClass from '../../../utils/api';
import Skeletons from './Skeletons';
import MaturedHistoryData from './MaturedHistoryData';
import ActiveHistoryData from './ActiveHistoryData';
import { Link } from 'react-router-dom';
const api = new apiClass();

export default function History() {

    const { user, investment, fetchDataErrorMsg } = useContext(Context);
    const {
        investmentData_users,
        setInvestmentData_users,
        fetchingInvestments_users,
        setFetchingInvestments_users,
        setFetchInvestmentsMsg_users,
    } = investment.invest;

    const {
        profileData,
        profileLoading,
        fetchProfileSuccess,
        setProfileData,
        setProfileLoadingAgain,
        profileLoadingAgain
    } = user.profile;

    const [load, setLoading] = useState(true)

    useEffect(() => {
        setFetchingInvestments_users(true);
        setProfileLoadingAgain(true)

        // if accesstoken not there, refresh it before proceeding data, otherwise, get data straight up
        if (!Cookies.get('accesstoken')) {
            api.refreshToken()
            setTimeout(() => {
                api.userGetAllInvestments(setInvestmentData_users, setFetchingInvestments_users, setFetchInvestmentsMsg_users)
            }, 2000);
        }
        else {
            api.userGetAllInvestments(setInvestmentData_users, setFetchingInvestments_users, setFetchInvestmentsMsg_users)
        }


        // if accesstoken not there, refresh it before proceeding, otherwise, proceed straight up
        if (!Cookies.get('accesstoken')) {
            api.refreshToken()
            setTimeout(() => {
                api.fetchProfileAgain(setProfileData, setProfileLoadingAgain)
            }, 2000);
        }
        else {
            api.fetchProfileAgain(setProfileData, setProfileLoadingAgain)
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, []);



    return (
        <Wrapper>
            {
                load || fetchingInvestments_users || profileLoadingAgain ? <Skeletons /> :
                    !investmentData_users || !profileData ?
                        <div style={{ color: 'red' }} className="tag">{fetchDataErrorMsg}</div> :
                        <>
                            <div className='profile-info'>
                                <div>
                                    Account Balance: <span>{profileData.amount} {profileData.currency}</span>
                                </div>
                                <div>
                                    Total Investment Earnings: {function () {
                                        let sum = 0;
                                        const filtereddata = investmentData_users.data?.maturedInvestment.filter(item => {
                                            const amount = item.amount;
                                            const rewards = item.rewards;

                                            const returns = rewards - amount
                                            sum += returns
                                        })

                                        return <span>{sum} {profileData.currency}</span>
                                    }()}
                                </div>
                                <div className="click">Click <Link to="/dashboard/plans">here</Link> to invest</div>
                            </div>
                            <br />



                            <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                                <div className="tag title">Active Investment</div>
                                <ActiveHistoryData data={investmentData_users.data?.activeInvestment} />
                            </div>

                            <div style={{ paddingTop: '10px' }}>
                                <div className="tag title">Matured Investment</div>
                                <MaturedHistoryData data={investmentData_users.data?.maturedInvestment} />
                            </div>
                        </>
            }
        </Wrapper>
    )
}



const Wrapper = styled.div`
    
    padding: 20px ${({ theme }) => theme.lg_padding};
        @media (max-width: ${({ theme }) => theme.md_screen}){
            padding: 20px ${({ theme }) => theme.md_padding};
        }
        @media (max-width: ${({ theme }) => theme.sm_screen}){
            padding: 20px ${({ theme }) => theme.sm_padding};
        }
    }

    .tag {
        font-size: .65rem;
    }
    .header {
        .search-wrapper {
            display: flex;
            justify-content: flex-end;
        }

        .search {
            display: inline-block;
            margin-bottom: 10px;
            width: 40%;
            max-width: 300px;
            min-width: 200px;
    
            input {
                padding: 6px;
                border-radius: 5px;
                width: 100%;
                border: 1px solid #ccc;
        
                &: focus {
                    outline: none;
                }
            }
        }
    }

    .profile-info {
        background: #fff;
        box-shadow: 2px 2px 5px #ccc;
        min-height: 30vh;
        padding: 30px 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 2rem;

        @media (max-width: ${({ theme }) => theme.md_screen}){
            font-size: 1.5rem;
        }
        @media (max-width: ${({ theme }) => theme.sm_screen}){
            font-size: 1rem;
        }

        span {
            color: red;
        }

        .click {
            font-size: 1.3rem;
            margin-top: 60px;

            @media (max-width: ${({ theme }) => theme.md_screen}){
                font-size: 1rem;
            }
            @media (max-width: ${({ theme }) => theme.sm_screen}){
                font-size: .8rem;
            }
        }
    }
`