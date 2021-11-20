import { Redirect, useHistory } from "react-router"
import Cookies from "universal-cookie/es6"
const Logout = () => {
    const cookies = new Cookies()
    cookies.set('login', false)
    return (
        <Redirect to="/login" />
    )
}

export default Logout
