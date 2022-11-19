import { useState, useEffect, useContext } from 'react';
import { ContextApi, Context } from './context/Context';
import Cookies from "js-cookie";
import { useLocation } from 'react-router-dom'

import apiClass from './utils/api';
const api = new apiClass()


function App() {
  const preloader = document.getElementById('preloader')
  const [preloading, setPreloading] = useState(true);
  const location = useLocation()

  // page preloader
  useEffect(() => {
    // preloader.style.opacity = '.4'
    setTimeout(() => {
      preloader.style.display = 'none'
      setPreloading(false)
    }, 500);

    // remove username or email's for resending verify email link from cookies
    Cookies.remove("access")

    // remove extratoken (jwt token that keeps admin logged in ..session base cookies) from cookies if the user navigates to any route other than admin routes
    if (!location.pathname.includes('admin')) {
      Cookies.remove('extratoken')
    }

    // fetch website configurations
    api.fetchConfig()
  }, [])

  return preloading ? "" : <ContextApi />
}

export default App;
