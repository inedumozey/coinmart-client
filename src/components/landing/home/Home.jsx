import React, { useEffect, useState, useContext } from 'react';
import apiClass from '../../../utils/api';
import { Context } from '../../../context/Context';
import Section_1 from './section_1/Section';
import styled from 'styled-components';

export default function Home() {
    const { config } = useContext(Context)


    return (
        <Wrapper>
            <Section_1 data={config.configData} />
        </Wrapper>
    )
}


const Wrapper = styled.div`
    width: 100vw;
    margin: auto;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: ${({ theme }) => theme.transition};
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
        color: red;
    }
`