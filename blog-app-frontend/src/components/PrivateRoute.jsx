import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from '../auth/index'

const PrivateRoute = () => {
    // return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />;

    if (isLoggedIn()){
        return <Outlet />
    }
    else{
        return <Navigate to={"/login"} />
    }
}

export default PrivateRoute