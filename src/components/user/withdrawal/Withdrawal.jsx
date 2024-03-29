import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Context } from '../../../context/Context';
import Spinner_ from '../../spinner/Spinner';
import Skeleton from '../../Skeleton';
import Cookies from 'js-cookie'
import Btn from '../../Btn/Btn';
import Select from 'react-select'
import resolve from '../../../utils/resolve';
import apiClass from '../../../utils/api';

const api = new apiClass()


export default function Withdrawal() {

    const { user, config } = useContext(Context);
    const { configData } = config;

    const {
        setProfileLoadingAgain,
        setProfileData,
    } = user.profile;

    const {
        withdrawalLoading,
        setWithdrawalLoading,
    } = user.withdrawal

    const [loading, setLoading] = useState(true);

    const [inp, setInp] = useState({
        amount: null,
        walletAddress: '',
        coin: ''
    });



    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    // submit data
    const submitform = (e) => {
        e.preventDefault()
        setWithdrawalLoading(true)

        // if accesstoken not there, refresh it before proceeding, otherwise, proceed straight up
        if (!Cookies.get('accesstoken')) {
            api.refreshToken()
            setTimeout(() => {
                api.userWithdrawal(inp, setWithdrawalLoading, setInp, setProfileData, setProfileLoadingAgain)
            }, 2000);
        }
        else {
            api.userWithdrawal(inp, setWithdrawalLoading, setInp, setProfileData, setProfileLoadingAgain)
        }
    }


    const Note = () => {
        return configData.withdrawableFactors.length === 1 && configData.withdrawableFactors[0] === 1 ?
            <div style={{ fontSize: '.7rem', marginBottom: '20px' }}>Any amount can be withdrawn</div> :
            <div style={{ fontSize: '.7rem', marginBottom: '20px' }}>
                <div>
                    Min Withdrawable Amount:
                    {" "}<span style={{ color: 'var(--blue-deep)' }}>{configData.minWithdrawableLimit} {configData.curreny}</span>
                </div>
                <div>
                    Withdrawable Common Diff:
                    {" "}<span style={{ color: 'var(--blue-deep)' }}>{configData.withdrawableCommonDiff}  {configData.curreny}</span>
                </div>
                <div>
                    Max Withdrawable Amount:
                    {" "}<span style={{ color: 'var(--blue-deep)' }}>{configData.maxWithdrawableLimit} {configData.curreny}</span>
                </div>
            </div>
    }

    return (
        <Wrapper>
            {
                loading || !configData ?
                    <>
                        <SubWrapper>
                            <div className="amount">
                                <Skeleton />
                            </div>
                        </SubWrapper>
                    </>
                    :
                    <SubWrapper>
                        <form onSubmit={submitform} action="">
                            <Note />

                            <label htmlFor="">Amount</label>
                            <InputWrapper>
                                <input
                                    type="number"
                                    autoFocus
                                    placeholder='Enter Amount in USD'
                                    value={inp.amount || ''}
                                    onChange={(e) => setInp({ ...inp, amount: e.target.value })}
                                />
                            </InputWrapper>

                            <label htmlFor="">Wallet Address</label>
                            <InputWrapper>
                                <input
                                    placeholder='Wallet Address'
                                    value={inp.walletAddress || ''}
                                    onChange={(e) => setInp({ ...inp, walletAddress: e.target.value })}
                                />
                            </InputWrapper>

                            <InputWrapper>
                                <label> Select Coin:</label>
                                <Select
                                    options={resolve.makeReactSelectOptions(configData.withdrawableCoins)}
                                    defaultMenuIsOpen={inp.coin}
                                    onChange={(selectedOption) => setInp({ ...inp, coin: selectedOption.value })}
                                />
                            </InputWrapper>


                            <div className='text-center text-md-start mt- pt-2'>

                                <Btn disabled={!inp.amount || !inp.coin || !inp.walletAddress} color="var(--blue)" link={false}>
                                    {withdrawalLoading ? <Spinner_ size="sm" /> : "Proceed"}
                                </Btn>
                            </div>


                        </form>
                    </SubWrapper>
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
    }
`

const SubWrapper = styled.div`
    background: #fff;
    min-height: 60px;
    padding: 20px 10px;
    width: 100%;
    margin: auto;
    box-shadow: 2px 2px 5px #ccc;

    .amount {
        display: inline-block;
        padding: 2px 0;
        min-width: 120px;
        height: 30px;
        margin-bottom: 20px;
    }
`


const InputWrapper = styled.div`
    width: 100%;
    height: 45px;
    margin-bottom: 20px;
    position: relative;


    input {
        border: 1px solid #ccc;
        padding: 12px 30px 12px 30px;
        height: 100%;
        width: 100%;
        display: block;
        border-radius: 8px;
        font-size: .9rem;

        &: focus{
            outline: none;
            border: 2px solid var(--blue);
        }
    }
`