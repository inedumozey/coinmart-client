import Cookies from "js-cookie";

const logout = () => {
    Cookies.remove('accesstoken')
    Cookies.remove('refreshtoken')
    Cookies.remove('role')

    window.location.reload()
}

export default logout