import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { Context } from '../../../context/Context'
import apiClass from '../../../utils/api'
import Spinner_ from '../../spinner/Spinner'
import Skeleton from '../../Skeleton'
import { Table } from '../../../styles/globalStyles'
import HistoryData from './HistoryData'
import Btn from '../../Btn/Btn'
import Modal from '../../Modal'
import AddRefcode from './AddReferrer'

const api = new apiClass()

export default function History() {
    const { config, user } = useContext(Context);

    const {
        fetchReferralHxLoading,
        setFetchReferralHxLoading,
        referralHxData,
        setReferralHxData,
        fetchReferralHxSuccess,
        setFetchReferralHxSuccess,
        showAddRefcodeModal,
        setShowAddRefcodeModal,
    } = user.referral

    const {
        setProfileData,
        profileLoading,
        profileData,
        setProfileLoading,
        setProfileLoadingAgain,
        setFetchProfileSuccess,
        setFetchProfileMsg
    } = user.profile


    const [load, setLoading] = useState(true)

    useEffect(() => {
        setFetchReferralHxLoading(true)

        // if accesstoken not there, refresh it before proceeding data, otherwise, get data straight up
        if (!Cookies.get('accesstoken')) {
            api.refreshToken()
            setTimeout(() => {
                api.fetchReferralHx(setFetchReferralHxLoading, setReferralHxData, setFetchReferralHxSuccess)
            }, 2000);
        }
        else {
            api.fetchReferralHx(setFetchReferralHxLoading, setReferralHxData, setFetchReferralHxSuccess)
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    return (
        <Wrapper>
            <SubWrapper>
                {
                    fetchReferralHxLoading || load ?
                        <Skeletons>
                            loading...
                        </Skeletons> :
                        !fetchReferralHxSuccess ? <div className="tag">Faild to fetch data, please refresh the brouser</div> :
                            referralHxData.length < 1 ? <div className="tag">Refer users to enjoy the referral bonus packages</div> :
                                <>
                                    <div className="tag">You have <span style={{ color: 'red' }}>{`(${referralHxData.length})`}</span> downlines</div>
                                    <HistoryData />
                                </>


                }
            </SubWrapper>

            <SubWrapper>
                {
                    profileLoading || load ?
                        <Skeletons>
                            loading...
                        </Skeletons> :
                        !setFetchProfileSuccess ? <div className="tag">Faild to fetch data, please refresh the brouser</div> :
                            <>
                                <div className="tag">Metadata</div>
                                {
                                    profileData.referrerUsername ?
                                        <div>
                                            You were referred by <span style={{ fontWeight: 'bold' }}>{profileData.referrerUsername}</span>
                                        </div> :

                                        <div className='text-center text-md-start mt- pt-2'>

                                            <Btn onClick={() => setShowAddRefcodeModal(true)} color="var(--blue)" link={false}>
                                                Add Referral
                                            </Btn>
                                        </div>
                                }
                            </>
                }
            </SubWrapper>

            <Modal
                title="Add Referral Code"
                show={showAddRefcodeModal}
                onHide={setShowAddRefcodeModal}
            >
                <AddRefcode />
            </Modal>

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

const SubWrapper = styled.div`
    background: #fff;
    min-height: 60px;
    padding: 20px 10px;
    width: 100%;
    margin: 10px auto 40px auto;
    box-shadow: 2px 2px 5px #ccc;
`

const Skeletons = styled.div`
    width: 100%;
    background: #fff;
    padding: 20px;
   
`