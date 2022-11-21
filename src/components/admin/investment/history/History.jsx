import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Context } from '../../../../context/Context';
import Spinner_ from '../../../spinner/Spinner';
import apiClass from '../../../../utils/api';
import Cookies from 'js-cookie'
import Btn from '../../../Btn/Btn';
import Select from 'react-select'
import resolve from '../../../../utils/resolve';

const api = new apiClass()

export default function History() {

    const { investment } = useContext(Context);
    const {
        investmentData_admin,
        setInvestmentData_admin,
        fetchingInvestments_admin,
        setFetchingInvestments_admin,
        fetchInvestmentsMsg_admin,
        setFetchInvestmentsMsg_admin,
    } = investment.invest;

    const [load, setLoading] = useState(true)

    useEffect(() => {
        setFetchingInvestments_admin(true)

        // if accesstoken not there, refresh it before proceeding data, otherwise, get data straight up
        if (!Cookies.get('accesstoken')) {
            api.refreshToken()
            setTimeout(() => {
                api.adminGetAllInvestments(setInvestmentData_admin, setFetchingInvestments_admin, setFetchInvestmentsMsg_admin)
            }, 2000);
        }
        else {
            api.adminGetAllInvestments(setInvestmentData_admin, setFetchingInvestments_admin, setFetchInvestmentsMsg_admin)
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    return (
        <Wrapper>
            histoy
        </Wrapper>
    )
}



const Wrapper = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat( auto-fit, minmax(200px, 1fr) );
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