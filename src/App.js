import { useState, useEffect } from 'react';
import { ContextApi } from './context/Context';
import Cookies from "js-cookie";

import apiClass from './utils/api';
const api = new apiClass()


function App() {
  const preloader = document.getElementById('preloader')
  const [preloading, setPreloading] = useState(true);


  // page preloader
  useEffect(() => {
    // preloader.style.opacity = '.4'
    setTimeout(() => {
      preloader.style.display = 'none'
      setPreloading(false)
    }, 500);

    // remove username or email's for resending verify email link from cookies
    Cookies.remove("access")

    // fetch website configurations
    api.fetchConfig()
  })

  return preloading ? "" : <ContextApi />
}

export default App;
