import { useState, useEffect, createContext } from 'react';
import Pages from '../pages';
import Layout from '../layouts';
import staticData from '../utils/staticData';

const Context = createContext()

function ContextApi() {
    // modal
    const [show, setShow] = useState(false);

    const [profileData, setProfileData] = useState({});
    const [profileLoading, setProfileLoading] = useState(true);
    const [fetchProfileSuccess, setFetchProfileSuccess] = useState(false);
    const [fetchProfileMsg, setFetchProfileMsg] = useState("");

    const [profileImageLoading, setProfileImageLoading] = useState(false);
    const [profileImageSuccess, setProfileImageSuccess] = useState(false);

    const state = {
        ...staticData,
        user: {
            profile: {
                profileData,
                setProfileData,
                setProfileLoading,
                setFetchProfileSuccess,
                setFetchProfileMsg,
                profileLoading,
                fetchProfileSuccess,
                fetchProfileMsg,
            },
            profileImage: {
                setProfileImageLoading,
                setProfileImageSuccess,
                profileImageLoading,
                profileImageSuccess,
            }
        },
        admin: {},
        modal: {
            show,
            setShow
        }
    }

    return (
        <Context.Provider value={state}>
            <Layout>
                <Pages />
            </Layout>
        </Context.Provider>
    )
}



export { ContextApi, Context }