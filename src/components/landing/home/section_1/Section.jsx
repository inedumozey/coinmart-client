import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import Skeleton from '../../../Skeleton';

export default function Section_1({ data }) {

    const [load, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])


    return (
        <Flexbox>
            {
                load || !data ?
                    [1, 2, 3].map((item, i) => {
                        return <Skeletons key={i} />
                    }) :

                    <>
                        <Card Icon={PhoneAndroidIcon}>
                            <div>${data.totalDeposit}</div>
                            <h4>Total Deposited</h4>
                        </Card>

                        <Card Icon={LocationOnIcon}>
                            <div>${data.totalWithdrawal}</div>
                            <h4>Total Payments</h4>
                        </Card>

                        <Card Icon={LocationOnIcon}>
                            <div>{data.totalInvestors}</div>
                            <h4>Total Investors</h4>
                        </Card>

                        <Card Icon={MailOutlineIcon}>
                            <div>{data.totalMembers}</div>
                            <h4>Active Members</h4>
                        </Card>


                        <Card Icon={LocationOnIcon}>
                            <div>{data.membersCountry}</div>
                            <h4>Members Country</h4>
                        </Card>
                    </>
            }
        </Flexbox>
    )
}

const Card = ({ Icon, children }) => {
    return (
        <CardStyle>
            <div className="icon">
                <Icon style={{ color: 'var(--yellow)', fontSize: '5rem' }} />
            </div>
            <div className="children">
                {children}
            </div>
        </CardStyle>
    )
}

const Skeletons = () => {
    return (
        <CardStyle>
            <div className="icon" style={{ width: '90px', height: '90px', margin: 'auto', borderRadius: '50%', padding: 0 }}>
                <Skeleton type='round' />
            </div>
            <div className="children">
                <div style={{ height: '20px', marginBottom: '5px', width: '90px', margin: '3px auto' }}>
                    <Skeleton />
                </div>

                <div style={{ height: '20px', width: '130px', margin: '3px auto' }}>
                    <Skeleton />
                </div>
            </div>
        </CardStyle>
    )
}

const Flexbox = styled.div`
    width: 100%;
    margin: auto;
    max-width: 1200px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
`

const CardStyle = styled.div`
    width: 250px;
    min-hight: 50px;
    background: #fff;
    padding: 10px;
    margin: 10px;
    text-align: center;
    box-shadow: 2px 2px 5px #ddd, -2px -2px 5px #ddd;

    .icon {
        padding: 10px 0 20px 0;
    }
    .children {
        padding: 20px;
        font-weight: bold;

        div {
            font-size: 1.2rem;
        }
    }

    @media (max-width: ${({ theme }) => theme.sm_screen}){
        width: 90vw;
    }
`
