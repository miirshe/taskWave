import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export const Protected_routes = () => {
    const userToken = Cookies.get('userToken')
    if (!userToken) {
        return <Navigate to='/user-login' />
    }
    return <Outlet />
}