import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { Context } from '../../context/Context';
import apiClass from '../../utils/api';
import Btn from '../Btn/Btn';
import Spinner_ from '../spinner/Spinner';
import Skeleton from '../Skeleton';
import resolve from '../../utils/resolve';
import Modal from '../Modal';
import { useNavigate } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BuyPlan from './BuyPlan';

const api = new apiClass()

export default function InvestmentPlans() {
    const { investment } = useContext(Context)
    const [laodSkeleton, setLoadSkeleton] = useState(true);
    const navigate = useNavigate();

    const {
        plans,
        setPlans,
        updatingPlan,
        setUpdatingPlan,
        deletingPlan,
        setDeletingPlan,
        refreshingPlans,
        setRefreshingPlans,
        operationType,
        setOperationType,
        selectedPlan,
        setSelectedPlan,
        setOpenAddPlanModal,
    } = investment.plans

    const {
        openInvestModal,
        setOpenInvestModal,
        selectedInvestingPlan,
        setSelectedInvestingPlan,
    } = investment.invest

    useEffect(() => {
        setTimeout(() => {
            setLoadSkeleton(false)
        }, 1500)
    }, [])

    const handleInvest = (plan) => {
        setSelectedInvestingPlan(plan);
        setOpenInvestModal(true)
    }

    const handleEdit = (plan) => {
        setSelectedPlan(plan)
        setOperationType('update-plan')
        setOpenAddPlanModal(true)
    }

    const handleDelete = (id) => {
        setDeletingPlan(true)

        // if accesstoken not there, refresh it before proceeding to get profile, otherwise, get profile straight up
        if (!Cookies.get('accesstoken')) {
            api.refreshToken()
            setTimeout(() => {
                api.deletePlan(id, setDeletingPlan, setPlans, setRefreshingPlans)
            }, 2000);
        }
        else {
            api.deletePlan(id, setDeletingPlan, setPlans, setRefreshingPlans)
        }

    }

    return (
        <Wrapper>
            {
                laodSkeleton ?
                    plans?.map((item, i) => {
                        return (
                            <Card key={i}>
                                <div className="header-skeleton">
                                    <div className="title">
                                        <Skeleton />
                                    </div>
                                    <div className="profit">
                                        <Skeleton />
                                    </div>
                                </div>
                                <div className="body-skeleton">
                                    <div className="lifespan">
                                        <Skeleton />
                                    </div>
                                    <div className="amount"><Skeleton /></div>
                                    <div style={{ width: '80%' }} className="amount"><Skeleton /></div>
                                    <div className="amount"><Skeleton /></div>
                                </div>
                                <div className="footer-skeleton">
                                    <div className="btn">
                                        <Skeleton />
                                    </div>
                                </div>
                            </Card>
                        )
                    }) :

                    plans?.length ?
                        plans?.map((plan, i) => {
                            return (
                                <Card key={plan._id}>
                                    <div className="header">
                                        <div className="title">{plan.type?.toUpperCase()}</div>
                                        <div className="profit">
                                            <span className="value">{plan.returnPercentage}%</span> {""}
                                            <span>Profit</span>
                                        </div>
                                    </div>
                                    <div className="body">
                                        <div className="lifespan">{resolve.resolveSeconds(plan.lifespan)}</div>
                                        <div className="amount">Minimun Amount: {plan.minAmount} {" "} {plan.currency}</div>
                                        <div className="amount">Maximun Amount: {plan.maxAmount === 0 ? 'Unlimited' : `${plan.maxAmount} ${plan.currency}`}</div>
                                        <div className="amount">Point: {plan.point}</div>
                                    </div>
                                    <div className="footer">
                                        {/* add ediy button if role admin and extratoken exist in cookies */}
                                        {

                                            Cookies.get('role')?.toLowerCase() === "admin" && Cookies.get('extratoken') ?
                                                <div
                                                    className='action-btn edit'
                                                    color="var(--blue)"
                                                    onClick={() => handleEdit(plan)}
                                                >
                                                    <EditIcon style={{ color: 'green' }} />
                                                </div> : ''
                                        }

                                        <Btn
                                            color="var(--blue)"
                                            link={false}
                                            onClick={() => handleInvest(plan)}
                                        >
                                            Invest
                                        </Btn>

                                        {/* add delete button if role admin and extratoken exist in cookies */}
                                        {
                                            Cookies.get('role')?.toLowerCase() === "admin" && Cookies.get('extratoken') ?
                                                <div
                                                    className='action-btn delete'
                                                    color="var(--blue)"
                                                    onClick={() => handleDelete(plan._id)}
                                                >
                                                    {deletingPlan || refreshingPlans ? <Spinner_ size='sm' /> : <DeleteForeverIcon style={{ color: 'red' }} />}
                                                </div> : ''
                                        }

                                    </div>
                                </Card>
                            )
                        }) :
                        <div style={{ color: 'red' }} className="center">No Plans at the moment</div>
            }

            {/* open investing modal */}
            <Modal
                show={openInvestModal}
                onHide={setOpenInvestModal}
                title={selectedInvestingPlan.type}
            >
                <BuyPlan />
            </Modal>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat( auto-fit, minmax(200px, 1fr) );
    padding: 20px ${({ theme }) => theme.lg_padding};
        @media (max-width: ${({ theme }) => theme.md_screen}){
            padding: 20px ${({ theme }) => theme.md_padding};
        }
        @media (max-width: ${({ theme }) => theme.sm_screen}){
            padding: 20px ${({ theme }) => theme.sm_padding};
            grid-template-columns: repeat( auto-fit, minmax(170px, 1fr) );
        }
    }
`

const Card = styled.div`
    width: 200px;
    height: 300px;
    box-shadow: 2px 2px 4px #ccc, -2px -2px 4px #ccc;
    background: #fff;
    // padding: 10px;
    margin: 2px 0;;
    justify-self: center;
    position: relative;

    @media (max-width: ${({ theme }) => theme.sm_screen}){
        width: 170px;
        padding: 5px;
    }

    .header {
        min-height: 100px;
        .title {
            background: var(--blue);
            font-weight: bold;
            text-align: center;
            padding: 10px;
            color: #fff;
            width: 100%;
        }
    
        .profit {
            padding: 10px 0;
            text-align: center;
            
            .value {
                color: var(--yellow);
                font-weight: bold;
                font-size: 1.5rem;
            }
        }
    }
    .footer {
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .body {
        height: calc(100% - 100px - 50px);

        .lifespan {
            padding: 5px 10px;
            font-weight: bold;
            font-size: 1.3rem;
        }

        .amount {
            padding: 3px 10px;
            font-size: .7rem;
            font-weight: 600;
        }
    }



    .header-skeleton {
        height: 100px;
        .title {
            height: 40%;
            padding: 0 0 3px 0;
        }
    
        .profit {
            height: 60%;
            padding: 3px 0;
        }
    }
    .footer-skeleton {
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;

        .btn {
            height: 50px;
            width: 70%;
        }
    }
    .body-skeleton {
        height: calc(100% - 100px - 50px);

        .lifespan {
            padding: 10px;
            height: 30%;
            width: 100%;
        }

        .amount {
            padding: 10px;
            height: 20%;
            width: 100%;
        }
    }

    .action-btn {
        padding: 10px;
        transition: .4s;
        position: absolute;
        top: 50%;
        border-radius: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        visibility: hidden;

        &:hover {
            opacity: .6;
        }
    }

    .edit {
        left: 10px;
        border: 1px solid green;
    }
    .delete {
        right: 10px;
        border: 1px solid red;
    }

    &:hover .action-btn {
        visibility: visible;
    }
`