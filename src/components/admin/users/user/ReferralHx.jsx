import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Context } from '../../../../context/Context';
import ReferralHistoryData from './ReferralHistoryData';


export default function ReferralHx({ data }) {
    const { admin, config } = useContext(Context);

    return (
        <Wrapper>
            <div className="name downlines">downlines: <span style={{ color: 'red' }}>{data.length}</span> </div>
            <ReferralHistoryData referralHxData={data} />
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
