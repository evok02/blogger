import {Outlet, useLocation} from "react-router-dom";
import {Navbar} from "../components/Navbar";
import {useEffect} from "react";
import {Footer} from "../components/Footer.jsx";

const MainLayout = ({loggedIn}) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Navbar loggedIn={loggedIn}/>
            <Outlet />
        </>
    );
}

export {MainLayout};
