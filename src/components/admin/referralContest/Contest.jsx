import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Context } from '../../../context/Context';
import Spinner_ from '../../spinner/Spinner';
import apiClass from '../../../utils/api';
import Skeleton from '../../Skeleton';
import PersonIcon from '@mui/icons-material/Person';
import Cookies from 'js-cookie'
import Btn from '../../Btn/Btn';
import CountdownTimer from '../../CountdownTimer'

const api = new apiClass()


export default function Contest() {
    const { admin, skeleton, config } = useContext(Context);
    const [load, setLoading] = useState(true)


    const startDate = "";
    const stopDate = ""

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])


    return (
        <Wrapper>

            {
                load || !config.configData ?
                    <Skeletons>
                        ...loading
                    </Skeletons> :

                    <>
                        contestants
                    </>

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


const Skeletons = styled.div`
    width: 100%;

    .user {
        height: 100px;
    }

    .type {
        width: 70px;
        height: 20px;
    }
`