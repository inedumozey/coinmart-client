import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Context } from '../../../../context/Context';
import Spinner_ from '../../../spinner/Spinner';
import apiClass from '../../../../utils/api';
import Cookies from 'js-cookie'
import { ScrollBar } from '../../../../styles/globalStyles';
import { useSnap } from '@mozeyinedu/hooks-lab';
import filter from "@mozeyinedu/filter";
import Investment from '../../home/config/Investment';
import { Table } from '../../../../styles/globalStyles';

const api = new apiClass()

export default function HistoryData({ data }) {
    const { snap } = useSnap(.5)
    const { config, investment } = useContext(Context);
    const [inp, setInp] = useState('')

    const num = 3
    const [count, setCount] = useState(num);
    const [opening, setOpening] = useState(false);
    const [selectedData, setSelectedData] = useState('');

    const { configData } = config;
    const {
        resolvingInvestment,
        setResolvingInvestment,
        setInvestmentData_admin,
        setFetchingInvestments_admin,
        setFetchInvestmentsMsg_admin
    } = investment.invest;

    const [filteredData, setFilter] = useState(data);

    useEffect(() => {
        const newData = filter({
            data: data,
            keys: ["status", "username", "email", "lifespan", "returnPercentage", "amount", "rewards"],
            input: inp
        })

        setFilter(newData)

    }, [inp, data])

    const handleViewMore = () => {
        setOpening(true)

        setTimeout(() => {
            setOpening(false)
            setCount(prevState => prevState + num)
        }, 1000)
    }

    const handleResolve = (item) => {
        setResolvingInvestment(true)
        setSelectedData(item)
        setResolvingInvestment(true)

        // if accesstoken not there, refresh it before proceeding data, otherwise, get data straight up
        if (!Cookies.get('accesstoken')) {
            api.refreshToken()
            setTimeout(() => {
                api.resolveInvestments(item._id, setInvestmentData_admin, setFetchingInvestments_admin, setFetchInvestmentsMsg_admin, setResolvingInvestment)
            }, 2000);
        }
        else {
            api.resolveInvestments(item._id, setInvestmentData_admin, setFetchingInvestments_admin, setFetchInvestmentsMsg_admin, setResolvingInvestment)
        }
    }


    return (
        <Wrapper>
            <div className="search">
                <input
                    type="text"
                    placeholder='Search by status, username, email, lifespan, returnPercentage, amount, rewards'
                    value={inp || ''}
                    onChange={(e) => setInp(e.target.value)}
                />
            </div>
            <Table>
                <table>
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Date Created</th>
                            <th>Date Matures</th>
                            <th>Plan</th>
                            <th>Amount Invested {`(${config.configData.currency})`}</th>
                            <th>Rewards {`(${config.configData.currency})`}</th>
                            <th>Status</th>
                            <th>Resolve</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData?.slice(0, count).map((data, i) => {
                            return (
                                <tr key={data._id}>
                                    <td>{i + 1}</td>
                                    <td>{data.userId ? data.userId.email : '(User Remove)'}</td>
                                    <td>{data.userId ? data.userId.username : '(User Remove)'}</td>
                                    <td>
                                        {data.createdAt && new Date(data.createdAt).toLocaleString()}
                                    </td>
                                    <td>
                                        {
                                            !data.isActive ? new Date(data.updatedAt).toLocaleString() :

                                                (function () {
                                                    let maturein = data && new Date(data.createdAt).getTime() / 1000 + data.lifespan
                                                    let formated = new Date(maturein * 1000);

                                                    return new Date(formated).toLocaleString()
                                                }())
                                        }
                                    </td>
                                    <td>{data.type}</td>
                                    <td>{data.amount && data.amount.toFixed(2)}</td>
                                    <td>{data.rewards && data.rewards.toFixed(2)}</td>
                                    <td style={{ color: data.status?.toLowerCase() === ' active' ? '#c20' : 'var(--blue-deep)' }}>
                                        {data.status?.toUpperCase()}
                                    </td>
                                    {
                                        data.isActive ? <td {...snap()} onDoubleClick={resolvingInvestment ? () => { } : () => handleResolve(data)} style={{ cursor: 'pointer', fontWeight: 'bold', color: 'var(--yellow)' }}>
                                            {
                                                resolvingInvestment && selectedData._id === data._id ? <div className="center"><Spinner_ size="sm" /></div> : "Resolve"
                                            }
                                        </td> : <td></td>
                                    }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Table>
            {
                count >= data.length ? '' :

                    <ViewMore>

                        <div onClick={handleViewMore} className="more" {...snap()}>
                            {opening ? <div className='center'> <Spinner_ size="sm" /></div> : 'View more...'}
                        </div>
                    </ViewMore>
            }
        </Wrapper>
    )
}



const Wrapper = styled.div`
    width: 100%;
    background: #fff;
    padding: 20px;
    box-shadow: 2px 2px 4px #ccc;
`

const ViewMore = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;

    .more{
        user-select: none;
        width: 80px;
        -webkit-user-select: none;
        font-size: .7rem;
        cursor: pointer;
        border: 1px solid;
        border-radius: 5px;
        padding: 7px;

        &:hover{
            opacity: .3
        }
    }
`