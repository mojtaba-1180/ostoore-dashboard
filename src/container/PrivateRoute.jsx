import React from 'react'
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie/es6'
// import Login from '../pages/Auth/Login';

function PrivateRoute({children}) {
    const cookies = new Cookies();
    const isAuth = cookies.get('login')
    return (
        <>
         {
            isAuth === "true" ? (
                children
            ) : (
                <Redirect to="/login" />
            )
         }   
        </>
    )
}

export default PrivateRoute
