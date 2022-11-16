import styled from 'styled-components'
import React, { useState, useEffect, useContext } from 'react';
import Header from './header/Header';
import Aside from './aside/Aside';
import Cookies from 'js-cookie';
import refreshToken from '../../utils/refreshToken';
import { Context } from '../../context/Context';
import apiClass from '../../utils/api';
const api = new apiClass()

const headerHeight = '63px'
const expandedAside = '200px'
const shrinkedAside = '60px'

export default function User({ children }) {
    const [isExpanded, setExpanded] = useState(true);
    const { user } = useContext(Context);
    const {
        setProfileData,
        setProfileLoading,
        setFetchProfileSuccess,
        setFetchProfileMsg
    } = user.profile;


    useEffect(() => {
        // if accesstoken not there, refresh it before proceeding to get profile, otherwise, get profile straight up
        if (!Cookies.get('accesstoken')) {
            refreshToken()
            setTimeout(() => {
                api.fetchProfile(setProfileData, setProfileLoading, setFetchProfileSuccess, setFetchProfileMsg)
            }, 2000);
        }
        else {
            api.fetchProfile(setProfileData, setProfileLoading, setFetchProfileSuccess, setFetchProfileMsg)
        }

    }, [])

    return (
        <Wrapper>
            <Header
                headerHeight={headerHeight}
                isExpanded={isExpanded}
                setExpanded={setExpanded}
            />

            <Aside
                expandedAside={expandedAside}
                shrinkedAside={shrinkedAside}
                headerHeight={headerHeight}
                isExpanded={isExpanded}
                setExpanded={setExpanded}
            />

            <MainStyle
                shrinkedAside={shrinkedAside}
                headerHeight={headerHeight}
                isExpanded={isExpanded}
            >
                <MainContent headerHeight={headerHeight}>
                    {children}
                </MainContent>
                <FooterStyle headerHeight={headerHeight}>Footer</FooterStyle>
            </MainStyle>
        </Wrapper>
    )
}


const Wrapper = styled.div``

const MainStyle = styled.div`;
    position: absolute;
    top: ${({ headerHeight }) => `calc(${headerHeight} - 5px)`};
    right: 400px;
    transition: ${({ theme }) => theme.transition};
    width:  ${({ shrinkedAside, isExpanded }) => isExpanded ? '100vw' : `calc(100vw - ${shrinkedAside} + 5px)`};
    align-items: center;
    background: var(--gray-pale);
    left: ${({ isExpanded }) => isExpanded ? `calc(${expandedAside} - 5px)` : `calc(${shrinkedAside} - 5px)`};

    @media (max-width: ${({ theme }) => theme.md_screen}){
        left: ${({ isExpanded }) => isExpanded ? `0` : `calc(${expandedAside} - 5px)`};
    }
`

const MainContent = styled.div`
    width: 100%;
    min-height: ${({ headerHeight }) => `calc(100vh - ${headerHeight} - ${headerHeight} + 5px)`};
    background: var(--gray-pale);
    padding: 15px ${({ theme }) => theme.lg_padding};
    @media (max-width: ${({ theme }) => theme.md_screen}){
        padding: 15px ${({ theme }) => theme.md_padding};
    }
    @media (max-width: ${({ theme }) => theme.sm_screen}){
        padding: 15px ${({ theme }) => theme.sm_padding};
    }
`
const FooterStyle = styled.div`
    width: 100%;
    height: ${({ headerHeight }) => headerHeight};
    background: var(--gray-light);

    padding: 15px ${({ theme }) => theme.lg_padding};
    @media (max-width: ${({ theme }) => theme.md_screen}){
        padding: 15px ${({ theme }) => theme.md_padding};
    }
    @media (max-width: ${({ theme }) => theme.sm_screen}){
        padding: 15px ${({ theme }) => theme.sm_padding};
    }
`