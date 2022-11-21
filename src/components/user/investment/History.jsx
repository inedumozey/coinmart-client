import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import Spinner_ from '../../spinner/Spinner';
import { Context } from '../../../context/Context';

import apiClass from '../../../utils/api';
import Card from './Card';
import Skeletons from './Skeletons';
const api = new apiClass();

const count = 3;

export default function History() {

    const { investment } = useContext(Context);
    const {
        investmentData_users,
        setInvestmentData_users,
        fetchingInvestments_users,
        setFetchingInvestments_users,
        fetchInvestmentsMsg_users,
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
        <>

            <Container>
                <div className="tag title">Active Investment</div>
                <Wrapper className="active">
                    {
                        load || fetchingInvestments_users ?
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data, i) => {
                                return <Skeletons />
                            }) :
                            !investmentData_users ?
                                <div className="tag red">
                                    Failed to load data. Please refresh
                                </div> :
                                (
                                    investmentData_users.data.activeInvestment.length < 1 ?
                                        <div className="tag red">
                                            No any Active Investment at the moment
                                        </div> :
                                        (
                                            investmentData_users.data?.activeInvestment?.slice(0, count).map((data, i) => {
                                                return <Card key={i} data={data} type="active" />
                                            })
                                        )
                                )

                    }
                </Wrapper>
            </Container>
            <Container>
                <div className="tag title">Matured Investment</div>
                <Wrapper className="matured">
                    {
                        load || fetchingInvestments_users ?
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data, i) => {
                                return <Skeletons />
                            }) :
                            !investmentData_users ?
                                <div className="tag red">
                                    Failed to load data. Please refresh
                                </div> :
                                (
                                    investmentData_users.data.maturedInvestment.length < 1 ?
                                        <div className="tag red">
                                            No any matured Investment at the moment
                                        </div> :
                                        (
                                            investmentData_users?.data.maturedInvestment?.slice(0, count).map((data, i) => {
                                                return <Card key={i} data={data} type="matured" />
                                            })
                                        )
                                )

                    }
                </Wrapper>
            </Container>
        </>
    )
}


const Container = styled.div`
    padding: 0 10px;
    max-width: 1200px;

    .tag {
        font-size: .65rem;
        color: red;
    }

    .title {
        color: var(--blue);
        font-weight: 600;
        color: var(--blue);
        font-size: .9rem;
    }

    .active {
        border-bottom 1px solid #ccc;
    }   
`

const Wrapper = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    padding: 20px ${({ theme }) => theme.lg_padding};
        @media (max-width: ${({ theme }) => theme.md_screen}){
            padding: 20px ${({ theme }) => theme.md_padding};
        }
        @media (max-width: ${({ theme }) => theme.sm_screen}){
            padding: 20px ${({ theme }) => theme.sm_padding};
            grid-template-columns: repeat( auto-fit, minmax(170px, 1fr) );
        }
    }
`