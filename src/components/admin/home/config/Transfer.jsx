import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Context } from '../../../../context/Context';
import Spinner_ from '../../../spinner/Spinner';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ChangeProfileImage from '../../../../components/user/ChangeProfileImage';
import apiClass from '../../../../utils/api';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Skeleton from '../../../Skeleton';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import PublicIcon from '@mui/icons-material/Public';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import Cookies from 'js-cookie'
import Btn from '../../../Btn/Btn';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const api = new apiClass()


export default function Transfer({ initialState }) {

    const { admin, skeleton, config } = useContext(Context);
    const {
        configData,
        setConfigData,
        updatingConfig,
        setUpdatingConfig,
    } = config;

    const [inp, setInp] = useState({
        allowTransfer: initialState.allowTransfer,
        minTransferableLimit: initialState.minTransferableLimit,
        maxTransferableLimit: initialState.maxTransferableLimit,
        transferableCommonDiff: initialState.transferableCommonDiff,
    });

    const submitForm = () => {

    }

    console.log(configData)
    const options = [
        "true", "false"
    ];

    return (
        <Wrapper>
            <InputWrapper>
                <label>
                    Allow Transfer?: {" "}
                    <span style={{ color: "#c20" }} className='tag'>
                        {initialState.allowTransfer ? 'true' : 'false'}
                    </span>
                </label>
                <Dropdown
                    className='myClassName'
                    options={options}
                    value={inp.allowTransfer ? 'true' : "false"}
                    placeholder="Select an option"
                    onChange={(e) => console.log(e.value)}
                />
            </InputWrapper>

            <InputWrapper>
                <label>
                    Min Transferable Limit: {" "}
                    <span style={{ color: "#c20" }} className='tag'>
                        {initialState.minTransferableLimit} {" "}
                        {initialState.currency}
                    </span>
                </label>
                <input
                    type="number"
                    value={inp.minTransferableLimit || ''}
                    onChange={(e) => setInp({ ...inp, minTransferableLimit: e.target.value })}
                />
            </InputWrapper>

            <InputWrapper>
                <label>
                    Min Transferable Limit: {" "}
                    <span style={{ color: "#c20" }} className='tag'>
                        {initialState.maxTransferableLimit} {" "}
                        {initialState.currency}
                    </span>
                </label>
                <input
                    type="number"
                    value={inp.maxTransferableLimit || ''}
                    onChange={(e) => setInp({ ...inp, maxTransferableLimit: e.target.value })}
                />
            </InputWrapper>



            <div className='text-center text-md-start mt- pt-2'>

                <Btn onClick={submitForm} color="var(--blue)" link={false}>
                    {updatingConfig ? <Spinner_ size="sm" /> : "Update"}
                </Btn>
            </div>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    
`

const InputWrapper = styled.div`
    width: 100%;
    min-height: 45px;
    margin-bottom: 15px;    
    font-size: .8rem;
    
    input {
        padding: 12px;
        height: 100%;
        width: 100%;
        border: 1px solid #ccc;
        display: block;
        font-size: .9rem;

        &: focus{
            outline: none;
            border-bottom: 2px solid var(--blue);
        }
    } 
`

const InputIcon = styled.div`
    position: absolute;
    padding: 3px;
    width: 30px;
    z-index: 1;
    bottom: 0;
    left: ${({ left }) => left};
    right: ${({ right }) => right};
    font-size: .8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .icon {
        font-size: 1rem;
    }
`