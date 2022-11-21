import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components';
import Modal from '../../../Modal';
import { Context } from '../../../../context/Context';
import Add_Update_Plans from './Add_Update_Plans';
import InvestmentPlans from '../../../investmentPlans/InvestmentPlans';

export default function Plans() {
    const { investment } = useContext(Context);

    const {
        plans,
        setPlans,
        openAddPlanModal,
        setOpenAddPlanModal,
        postingPlan,
        setPostingPlan,
        updatingPlan,
        setUpdatingPlan,
        deletingPlan,
        setDeletingPlan,
        refreshingPlans,
        setRefreshingPlans,
        operationType,
        setOperationType,
        selectedPlan,
        setSelectedPlan
    } = investment.plans

    return (
        <Wrapper>
            <div onClick={() => { setOpenAddPlanModal(true); setOperationType('add-plan') }} className="add-plan">Add Plan Btn</div>
            <div className="list-plans"></div>
            <Modal
                title={operationType === 'add-plan' ? "Add Plans" : `Updating ${selectedPlan.type}`}
                show={openAddPlanModal}
                onHide={setOpenAddPlanModal}
            >
                <Add_Update_Plans type={operationType} />
            </Modal>

            {/* display plans */}
            <InvestmentPlans />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .add-plan {
        position: fixed;
        cursor: pointer;
        padding: 5px;
        font-size: .8rem;
        color: #fff;
        background: rgb(0 123 255 / 43%);
        border: 1px solid rgb(0 123 255 / 43%);
        top: 70px;
        right: 10px;
        transition: ${({ theme }) => theme.transition};
        text-align: center;
        border-radius: 15px;
        z-index: 1000;

        &:hover {
            background: rgb(255 255 255 / 43%);
            border: 1px solid rgb(0 123 255 / 43%);
            color: var(--blue);
        }
    }
`