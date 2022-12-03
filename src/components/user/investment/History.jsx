import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { Context } from '../../../context/Context';
import apiClass from '../../../utils/api';
import Skeletons from './Skeletons';
import MaturedHistoryData from './MaturedHistoryData';
import ActiveHistoryData from './ActiveHistoryData';
const api = new apiClass();

export default function History() {

    const { investment } = useContext(Context);
    const {
        investmentData_users,
        setInvestmentData_users,
        fetchingInvestments_users,
        setFetchingInvestments_users,
        setFetchInvestmentsMsg_users,
    } = investment.invest;

    const [load, setLoading] = useState(true)

    useEffect(() => {
        setFetchingInvestments_users(true)

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
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    return (
        <Wrapper>{
            load || fetchingInvestments_users ? <Skeletons /> :
                !investmentData_users ?
                    <div className="tag red">
                        Failed to load data. Please refresh
                    </div> :
                    <>
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
`