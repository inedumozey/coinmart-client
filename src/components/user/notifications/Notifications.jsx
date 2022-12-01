import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Context } from '../../../context/Context';
import Preview from '../../notifications/Preview';
import Cookies from 'js-cookie';
import Spinner_ from '../../spinner/Spinner';
import apiClass from '../../../utils/api';
import Skeleton from '../../Skeleton';
import { useNavigate } from 'react-router-dom'

const api = new apiClass()

export default function Notifications() {
    const { user, notifications } = useContext(Context);
    const [selectedId, setSelectedId] = useState('');
    const navigate = useNavigate()

    const [load, setLoading] = useState(true)

    const {
        profileData,
        profileLoading,
        fetchProfileSuccess,
        setReadingNotification,
        readingNotification,
        setReadingNotificationSuccess,
        setProfileData,
        setProfileLoadingAgain
    } = user.profile;

    const {
        setSelectedNotification,
        selectedNotification
    } = notifications

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])


    const handleRead = (id) => {
        setSelectedId(id)
        setReadingNotification(true)

        // if accesstoken not there, refresh it before proceeding, otherwise, proceed straight up
        if (!Cookies.get('accesstoken')) {
            api.refreshToken()
            setTimeout(() => {
                api.readNotification_user(id, setReadingNotification, setReadingNotificationSuccess, setSelectedNotification, setProfileData, setProfileLoadingAgain, navigate)
            }, 2000);
        }
        else {
            setTimeout(() => {
                api.readNotification_user(id, setReadingNotification, setReadingNotificationSuccess, setSelectedNotification, setProfileData, setProfileLoadingAgain, navigate)
            }, 1000);
        }
    }

    const openNotification = (id) => {
        setSelectedNotification(id)

        // open notification
        navigate(`/dashboard/notifications/${id}`)

    }

    return (
        <Wrapper>
            {
                load || profileLoading ?
                    [1, 2, 3].map((item, i) => {
                        return <SubWrapper key={i}>
                            <div className="title">
                                <div style={{ width: '50%', height: '20px', marginBottom: '10px' }}><Skeleton /></div>
                            </div>
                            <div className="title">
                                <div style={{ width: '30%', height: '10px' }}><Skeleton /></div>
                            </div>
                        </SubWrapper>
                    })
                    :
                    !fetchProfileSuccess ?
                        <div style={{ color: 'red', fontSize: '.7rem' }} className="center">
                            Failed to fetch data! Please refresh
                        </div> :

                        <>
                            {
                                profileData.newNotifications.length ?
                                    profileData.newNotifications.map((item, i) => {
                                        return <SubWrapper
                                            key={i}
                                            onClick={() => handleRead(item._id)}
                                        >
                                            <Preview data={item} type="new" />
                                            {
                                                selectedId === item._id && readingNotification ? <div className="loading"><Spinner_ size="sm" /></div> : ''
                                            }

                                        </SubWrapper>
                                    }) : ''
                            }

                            {
                                profileData.readNotifications.length ?
                                    profileData.readNotifications.map((item, i) => {
                                        return <SubWrapper
                                            key={i}
                                            onClick={() => openNotification(item._id)}>
                                            <Preview data={item} type="read" />
                                        </SubWrapper>
                                    }) : ''
                            }
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
    cursor: pointer;
    margin: 10px auto;
    box-shadow: 2px 2px 5px #ccc;

    &:hover {
        opacity: .4;
    }

`