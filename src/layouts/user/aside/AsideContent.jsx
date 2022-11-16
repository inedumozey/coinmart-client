import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom';
import { Context } from '../../../context/Context';
import { ScrollBar } from '../../../styles/globalStyles';
import Spinner_ from '../../../components/spinner/Spinner';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ChangeProfileImage from '../../../components/user/ChangeProfileImage';
import AsideLinks from './AsideLinks';

const asideHeaderheight = '70px';

export default function AsideContent({ expandedAside, shrinkedAside, isExpanded, headerHeight }) {
    const { user } = useContext(Context)

    const {
        profileData,
        profileLoading,
        fetchProfileSuccess,
        fetchProfileMsg,
        setProfileLoading,
        setFetchProfileSuccess,
        setFetchProfileMsg,
    } = user.profile

    const {
        profileImageLoading,
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
                <div className="profile">
                    {
                        profileLoading ? <div className="center"><Spinner_ size="sm" /></div> :
                            <>
                                <div className="img">
                                    {
                                        profileImageLoading ? <div className="changeProfile center"><Spinner_ size="sm" /></div> :
                                            <label htmlFor='file' className="changeProfile">
                                                <AddAPhotoIcon style={{ fontSize: '1.2rem', color: '#888' }} />
                                            </label>
                                    }
                                    <ChangeProfileImage />
                                    <img src={profileData.profile.profilePicUrl ? profileData.profile.profilePicUrl : "https://api.multiavatar.com/popo.svg"} alt="profile" />
                                </div>
                                <div className="username">{`${profileData.username} (${profileData.role})`}</div>
                                <div className="email">{profileData.email}</div>
                            </>
                    }
                </div>
            </Header>
            <Content
                headerHeight={headerHeight}
                asideHeaderheight={asideHeaderheight}
            >
                <AsideLinks isExpanded={isExpanded} />
            </Content>
            <Footer headerHeight={headerHeight}>

            </Footer>
        </Wrapper>
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
    min-height: ${({ asideHeaderheight }) => asideHeaderheight};
    width: 100%;
    padding: 0 5px;

    .profile {
        height: 100%;
        width: 100%;
        border-bottom: 1px solid var(--gray-light);
        font-size: .8rem;
        padding: 5px 0;

        .img {
            margin: auto;
            border-radius: 50%;
            border: 1px solid #ddd;
            cursor: pointer;
            margin: auto;
            height: ${({ isExpanded }) => isExpanded ? '55px' : '30px'};
            width: ${({ isExpanded }) => isExpanded ? '55px' : '30px'};
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
                height: ${({ isExpanded }) => !isExpanded ? '55px' : '30px'};
                width: ${({ isExpanded }) => !isExpanded ? '55px' : '30px'};
            }
        }
        .username, .email {
            font-size: .7.5rem;
            text-align: center;
            display: ${({ isExpanded }) => isExpanded ? 'block' : 'none'};

            @media (max-width: ${({ theme }) => theme.md_screen}){
                display: ${({ isExpanded }) => !isExpanded ? 'block' : 'none'};
            }
        }
        .email {
            font-weight: 600;
        }
    }
`

const Content = styled.div`
    height: ${({ headerHeight, asideHeaderheight }) => `calc(100% - ${asideHeaderheight} - ${headerHeight})`};
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