import styled from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../../../context/Context';
import Btn from '../../../Btn/Btn';

export default function Section() {
    const { about_page_section1_data } = useContext(Context)

    return (
        <Wrapper>
            <Flexbox>
                <CardStlye className='image'>
                    <div className="img">
                        <img src="/b2.jpg" alt="" />
                    </div>
                </CardStlye>

                <CardStlye className='text'>
                    {about_page_section1_data?.map((item, i) => {
                        return (
                            <div key={i}>
                                <h2 style={{ textAlign: 'center' }}>{item.title}</h2>
                                <p>{item.discription}</p>
                            </div>
                        )
                    })}

                    <Btn url="/about-us">GET STARTED NOW</Btn>
                </CardStlye>

                <CardStlye className='text'>
                    {about_page_section1_data?.map((item, i) => {
                        return (
                            <div key={i}>
                                <h2 style={{ textAlign: 'center' }}>{item.title}</h2>
                                <p>{item.discription}</p>
                            </div>
                        )
                    })}

                    <Btn url="/about-us">LEARN MORE</Btn>
                </CardStlye>

                <CardStlye className='image'>
                    <div className="img">
                        <img src="/b7.png" alt="" />
                    </div>
                </CardStlye>

            </Flexbox>
        </Wrapper>
    )
}


const Wrapper = styled.div`
   
`

const Flexbox = styled.div`
    width: 100%;
    margin: 20px auto 10px auto;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .image {
        width: 400px;
        padding: 10px;
        display: flex;
        justify-content: center;

        .img {
            width: 100%;
            height: 300px;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
    }
    .text {
        width: calc(100% - 400px - 10px);
        text-align: justify;

        div {
            margin: 10px auto;
        }

        li {
            display: block;
            position: relative;

            &::after {
                position: absolute;
                left: 0px;
                top: 6px;
                content: "\e64c";
                font-family: themify;
                width: 24px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                border-radius: 50px;
                font-size: 12px;
                color: #fff;
                background: var(--yellow);
            }
        }
    }

    @media (max-width: ${({ theme }) => theme.md_screen}){
        .image {
            width: 90vw;
        }
        .text {
            width: 90vw;
        }
    }
`

const CardStlye = styled.div`
   margin: 30px auto;
    transition: ${({ theme }) => theme.transition};
    min-height: 180px;
`