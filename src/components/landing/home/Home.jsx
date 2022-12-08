import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../../context/Context';
import Section_1 from './section_1/Section';
import Section_2 from './section_2/Section';
import Section_3 from './section_3/Section';
import styled from 'styled-components';

export default function Home() {
    const { config } = useContext(Context)


    return (
        <Wrapper>
            <SubWrapper>
                <Section_1 data={config.configData} />
            </SubWrapper>

            <SubWrapper bg="var(--gray-light2)">
                <Section_2 />
            </SubWrapper>

            <SubWrapper >
                <Section_3 />
            </SubWrapper>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    transition: ${({ theme }) => theme.transition};

    .tag {
        font-size: .65rem;
        color: red;
    }
`
const SubWrapper = styled.div`
    background: ${({ bg }) => bg};
    padding: 20px ${({ theme }) => theme.lg_padding};
    @media (max-width: ${({ theme }) => theme.md_screen}){
        padding: 20px ${({ theme }) => theme.md_padding};
    }
    @media (max-width: ${({ theme }) => theme.sm_screen}){
        padding: 20px ${({ theme }) => theme.sm_padding};
    }
}

`