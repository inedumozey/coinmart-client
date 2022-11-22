import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { Context } from '../../../context/Context'
import apiClass from '../../../utils/api'
import Spinner_ from '../../spinner/Spinner'
import Skeleton from '../../Skeleton'

const api = new apiClass()

export default function Notifications() {
    const { config } = useContext(Context);


    const [load, setLoading] = useState(true)

    useEffect(() => {
        // setFetchingInvestments_admin(true)

        // if accesstoken not there, refresh it before proceeding data, otherwise, get data straight up
        if (!Cookies.get('accesstoken')) {
            api.refreshToken()
            setTimeout(() => {
                // api.adminGetAllInvestments(setInvestmentData_admin, setFetchingInvestments_admin, setFetchInvestmentsMsg_admin)
            }, 2000);
        }
        else {
            // api.adminGetAllInvestments(setInvestmentData_admin, setFetchingInvestments_admin, setFetchInvestmentsMsg_admin)
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    return (
        <Wrapper>
            {
                load ?
                    <div className='skeleton'>
                        <Skeleton />
                    </div>
                    :
                    <div className="tag">No messages sent yet</div>
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
    padding: 20px ${({ theme }) => theme.lg_padding};
        @media (max-width: ${({ theme }) => theme.md_screen}){
            padding: 20px ${({ theme }) => theme.md_padding};
        }
        @media (max-width: ${({ theme }) => theme.sm_screen}){
            padding: 20px ${({ theme }) => theme.sm_padding};
            grid-template-columns: repeat( auto-fit, minmax(170px, 1fr) );
        }
    }

    .skeleton {
        width: 80vw;
        margin: auto;
        height: 80vh;
        padding: 10px;
    }
    
    .tag {
        font-size: .65rem;
        color: red;
    }
`