import React, { useContext } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../context/Context';
import { ScrollBar } from '../../../styles/globalStyles';
import Spinner_ from '../../../components/spinner/Spinner';
import LogoutIcon from '@mui/icons-material/Logout';
import AsideLinks from './AsideLinks';
import apiClass from '../../../utils/api';

const api = new apiClass()
const asideHeaderheight = '85px';

export default function AsideContent({ expandedAside, shrinkedAside, isExpanded, setExpanded, headerHeight }) {
    const { user, fetchDataErrorMsg } = useContext(Context);
    const navigate = useNavigate();

    const {
        profileData,
        profileLoading,
        fetchProfileSuccess,
    } = user.profile

    const {
    } = user.profileImage;

    return (
        <Wrapper
            expandedAside={expandedAside}
            shrinkedAside={shrinkedAside}
            isExpanded={isExpanded}
        >
            <Header
                expandedAside={expandedAside}
                asideHeaderheight={asideHeaderheight}
                shrinkedAside={shrinkedAside}
                isExpanded={isExpanded}
            >
                <div className="header_content">
                    <div className="profile">
                        {
                            profileLoading ? <div className="center"><Spinner_ size="sm" /></div> :
                                fetchProfileSuccess ?
                                    <>
                                        <div className="img">
                                            <div>
                                                <img src={profileData.profile && profileData.profile.profilePicUrl} alt="profile" />
                                            </div>
                                        </div>
                                        <div className="metadata">
                                            {/* if username is more than 20 characters, show only the first 17 charactesr */}
                                            <div className="username">
                                                {profileData.username && (profileData.username.length > 10 ? `${profileData.username.substr(0, 10)}...` : profileData.username)}
                                                <span style={
                                                    (function () {
                                                        if (profileData.role && profileData.role.toLowerCase() == 'admin' && !profileData.isSupperAdmin) {
                                                            return { color: 'var(--blue)' }
                                                        }
                                                        if (profileData.role && profileData.role.toLowerCase() == 'admin' && profileData.isSupperAdmin) {
                                                            return { color: 'red' }
                                                        }
                                                        else {
                                                            return { color: 'inherit' }
                                                        }
                                                    }())
                                                }>
                                                    {" "}
                                                    {`(${profileData.isSupperAdmin && profileData.role.toLowerCase() == 'admin' ? "SUPER ADMIN" : profileData.role})`}
                                                </span>
                                            </div>

                                            {/* if email is more than 20 characters, show only the last 14 and first 6 charactesr */}
                                            <div className="email">{profileData.email && (profileData.email.length > 20 ? `${profileData.email.substr(0, 6)}...${profileData.email.slice(profileData.email.length - 14)}` : profileData.email)}</div>
                                        </div>
                                    </> :
                                    <>
                                        <div style={{ color: 'red', fontSize: '.6rem' }}>{fetchDataErrorMsg}</div>
                                    </>
                        }
                    </div>
                    <div className="action-btn">
                        <div onClick={() => api.logoutAdmin(navigate)} className='logout'>
                            <span className='action-btn-icon'><LogoutIcon style={{ fontSize: '1rem' }} /></span>
                            <span className='action-btn-text'>Logout</span>
                        </div>
                    </div>
                </div>

            </Header>
            <Content
                headerHeight={headerHeight}
                asideHeaderheight={asideHeaderheight}
            >
                <AsideLinks isExpanded={isExpanded} setExpanded={setExpanded} />
            </Content>
            <Footer headerHeight={headerHeight}></Footer>
        </Wrapper >
    )
}


const Wrapper = styled.div`
    width: ${({ isExpanded, shrinkedAside, expandedAside }) => isExpanded ? expandedAside : shrinkedAside};
    padding: 0 1px;
    height: 100%;

    @media (max-width: ${({ theme }) => theme.md_screen}){
        width: ${({ isExpanded, expandedAside, shrinkedAside }) => isExpanded ? shrinkedAside : expandedAside};
    }
`

const Header = styled.div`
    height: ${({ asideHeaderheight }) => asideHeaderheight};
    width: 100%;
    padding: 0 5px;

    .profile {
        width: 100%;
        border-bottom: 1px solid var(--gray-light);
        font-size: .8rem;
        padding: 3px 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .img {
            margin: auto;
            border-radius: 50%;
            border: 1px solid #ddd;
            margin: auto;
            height: ${({ isExpanded }) => isExpanded ? '55px' : '40px'};
            width: ${({ isExpanded }) => isExpanded ? '55px' : '40px'};
            position: relative;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }

            .changeProfile {
                position: absolute;
                bottom: -2px;
                right: -10px;
            }
            
            @media (max-width: ${({ theme }) => theme.md_screen}){
                height: ${({ isExpanded }) => !isExpanded ? '55px' : '40px'};
                width: ${({ isExpanded }) => !isExpanded ? '55px' : '40px'};
            }
        }

        .metadata{
            flex-grow: 1;
            font-size: .7rem;
            padding: 0 5px 0 15px;
            display: ${({ isExpanded }) => isExpanded ? 'block' : 'none'};

            @media (max-width: ${({ theme }) => theme.md_screen}){
                display: ${({ isExpanded }) => !isExpanded ? 'block' : 'none'};
            }

            .username, .email {
                display: ${({ isExpanded }) => isExpanded ? 'block' : 'none'};
                font-weight: 600;
    
                @media (max-width: ${({ theme }) => theme.md_screen}){
                    display: ${({ isExpanded }) => !isExpanded ? 'block' : 'none'};
                }
            }
            .email {
                font-weight: bold;
            }

            &:hover {
                color: inherit;

            }
        }
    }

    .action-btn {
        display: flex;
        justify-content: space-around;
        text-align: center;
        font-size: .75rem;
        font-weight: 600;

        .logout{
            color: red;
            cursor: pointer;
            border-right: 1px solid #ccc;
            border-left: 1px solid #ccc;
            width: 50%;

            .action-btn-icon {
                transform: rotate(180deg);
            }
        }

        .logout {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .action-btn-text {
            margin-left: 3px;
            display: ${({ isExpanded }) => isExpanded ? 'block' : 'none'};

            @media (max-width: ${({ theme }) => theme.md_screen}){
                display: ${({ isExpanded }) => !isExpanded ? 'block' : 'none'};
            }
        }

        .action-btn-icon {
            font-size: .5rem;
        }
    }
`

const Content = styled.div`
    height: ${({ headerHeight, asideHeaderheight }) => `calc(100% - 205px)`};
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    ${ScrollBar()};
`

const Footer = styled.div`
    height: 70px;
    width: 100%;
    background: var(--gray-light)
`
