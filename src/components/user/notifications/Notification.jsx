import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Context } from '../../../context/Context';

export default function Notification({ id }) {
    const { user } = useContext(Context);

    const [load, setLoading] = useState(true)

    const {
        profileData,
        profileLoading,
        fetchProfileSuccess,
    } = user.profile;

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])



    return (
        <Wrapper>
            {
                load || profileLoading ? 'Loading...' :
                    !fetchProfileSuccess ?
                        <div style={{ color: 'red', fontSize: '.7rem' }} className="center">
                            Failed to fetch data! Please refresh
                        </div> :
                        <>ofr: {id}</>
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
        margin-bottom: 20px;
    }
`

const SubWrapper = styled.div`
    background: #fff;
    min-height: 60px;
    padding: 20px;
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