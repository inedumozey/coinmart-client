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

const api = new apiClass()

export default function HistoryData({ data }) {
    const { snap } = useSnap(.5)
    const { config, investment } = useContext(Context);
    const [inp, setInp] = useState('')

    const num = 100
    const [count, setCount] = useState(num);
    const [opening, setOpening] = useState(false);
    const [selectedData, setSelectedData] = useState('');

    const { configData } = config;
    const {
        resolvingInvestment,
        setResolvingInvestment
    } = investment.invest;

    const [filteredData, setFilter] = useState(data);

    useEffect(() => {
        const newData = filter({
            data: data,
            keys: ["username", "email", "lifespan", "returnPercentage", "amount", "rewards"],
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
        console.log(item._id)
    }


    return (
        <Wrapper>
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
                            <th>Amount Invested</th>
                            <th>Rewards</th>
                            <th>Status</th>
                            <th>Resolve</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(0, count).map((data, i) => {
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
                                    <td style={{ color: data.isActive ? '#c20' : 'var(--blue)' }}>{data.isActive ? 'Active' : 'Matured'}</td>
                                    {
                                        data.isActive ? <td {...snap()} onDoubleClick={resolvingInvestment ? () => { } : () => handleResolve(data)} style={{ cursor: 'pointer', fontWeight: 'bold', color: 'var(--yellow)' }}>
                                            {
                                                resolvingInvestment && selectedData._id === data._id ? "loading..." : "Resolve"
                                            }
                                        </td> : <td></td>
                                    }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Table>
            <ViewMore>
                {
                    opening ? <div className='center'> <Spinner_ size="sm" /></div> : ''
                }
                <div onClick={handleViewMore} className="more" {...snap()}>View More...</div>
            </ViewMore>
        </Wrapper>
    )
}



const Wrapper = styled.div`
    width: 100%;
`

const Table = styled.div`
    padding: 0;
    width: 100%;
    overflow: auto;
    margin: 0px auto 10px auto;
    border: 1px solid #ccc;

    ${ScrollBar()}

    table{
        font-size: .7rem;
        margin: auto;
        border-spacing: 0.5rem;
        height: 100%;
        border-collapse: collapse;
        width: ${({ width }) => width ? width : '1000px'};
        text-align: left;
        cursor: default;
        color: #000;
    }

    td, th {
        border: 1px solid #999;
        padding: 0.5rem;
        text-align: left;
        padding: 0.25rem;
    }

    th{
        background: var(--blue-deep);
        color: #fff;
    }

    tr:nth-child(even) {
        background: var(--yellow);
        color: #fff;
    }

    tbody tr:hover {
        background: #333;
        color: #fff;
    }

`

const ViewMore = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;

    .more{
    user-select: none;
    -webkit-user-select: none;
    font-size: .7rem;
    cursor: pointer;
    border: 1px solid;
    border-radius: 5px;
    padding: 7px;

    &:hover{
        opacity: .4
    }
    }
`