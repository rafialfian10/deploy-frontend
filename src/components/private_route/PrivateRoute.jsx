import { useContext } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import './PrivateRoute.scss'

export const PrivateRouteAdmin = () => {

    const [myContext] = useContext(UserContext)
    return (
        <>
            {!localStorage.getItem("token") ? (
                <Navigate to="/" />
            ) : myContext?.isLogin && myContext.user?.role === "admin" ? (
                <Outlet />
            ) : (
                myContext?.isLogin && myContext.user.role === "user" && <Navigate to="/" />
            )}
        </>
    )
}
// ------------------------------------

export const PrivateRouteUser = () => {

    const [myContext] = useContext(UserContext)
    return (
        <>
            {!localStorage.getItem("token") ? (
                <Navigate to="/" />
            ) : myContext?.isLogin && myContext.user?.role === "user" ? (
                <Outlet />
            ) : (
                myContext?.isLogin && myContext.user.role === "admin" && <Navigate to="/" />
            )}
        </>
    )
}


export const PageNotFound = () => {
    const params = useParams;
    let message = `"${params.pageName}" page not found!`;
    // if (params.pageName == "about") {
    //   message = "You need to be logged in to access this page.";
    // }
  
    return <p className="pages-not-found">{message}</p>;
  }

