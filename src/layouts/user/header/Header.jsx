import React, { useContext } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom';
import { Context } from '../../../context/Context';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function Header({ isExpanded, setExpanded, headerHeight }) {
    const state = useContext(Context)
    const { contact } = state;

    return (
        <HeaderStyle isExpanded={isExpanded} headerHeight={headerHeight} >
            <h4>User Dashboard</h4>
            {/* <h4>{contact.name} {contact.investment}</h4> */}
            <div className="toggle lg-screen">
                <span onClick={() => setExpanded(!isExpanded)} className='shrink'>
                    <ArrowLeftIcon className='icon' />
                </span>
                <span onClick={() => setExpanded(!isExpanded)} className='expand'>
                    <ArrowRightIcon className='icon' />
                </span>
            </div>

            <div className="toggle sm-screen">
                <span onClick={() => setExpanded(!isExpanded)} className='shrink'>
                    <ArrowLeftIcon className='icon' />
                </span>
                <span onClick={() => setExpanded(!isExpanded)} className='expand'>
                    <ArrowRightIcon className='icon' />
                </span>
            </div>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.div`
    width: 100%;
    height: ${({ headerHeight }) => headerHeight};
    color: #fff;
    font-weight: 600;
    background: var(--blue-deep);
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    transition: ${({ theme }) => theme.transition};
    font-size: 1.5rem;
    text-align: center;
    box-shadow: 0 0 5px rgb(18 23 39 / 50%);
    z-index: 3;
    padding: 15px ${({ theme }) => theme.lg_padding};
    @media (max-width: ${({ theme }) => theme.md_screen}){
        padding: 15px ${({ theme }) => theme.md_padding};
    }
    @media (max-width: ${({ theme }) => theme.sm_screen}){
        padding: 15px ${({ theme }) => theme.sm_padding};
    }

    .toggle {
        width: 35px;
        height: 35px;
        box-shadow: 0 0 5px rgb(18 23 39 / 50%), -0 -0 5px rgb(18 23 39 / 50%);
        background: inherit;;
        color: #fff;
        user-select: none;
        border-radius: 50%;
        font-size: .9rem;
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        justify-content: center;
        align-items: center;
        cursor: pointer;
        
        .icon {
            color: #fff;
            font-size: 2rem;
        }

        .expand {
            display: ${({ isExpanded }) => isExpanded ? 'none' : 'block'};
        }

        .shrink {
            display: ${({ isExpanded }) => isExpanded ? 'block' : 'none'};
        }

        @media (max-width: ${({ theme }) => theme.md_screen}){

            .expand {
                display: ${({ isExpanded }) => isExpanded ? 'block' : 'none'};
            }

            .shrink {
                display: ${({ isExpanded }) => isExpanded ? 'none' : 'block'};
            }
        }

    }

    .sm-screen {
        display: none;
    }
    .lg-screen {
        display: flex;
    }
    @media (max-width: ${({ theme }) => theme.md_screen}){
        .lg-screen {
            display: none;
        }

        .sm-screen {
            display: flex;
        }
    }
`