import {Outlet} from "react-router-dom";
import {Navbar} from "../components/Navbar";

const MainLayout = ({loggedIn, setIsIn}) => {
    console.log(typeof(setIsIn))
    return (
        <>
            <Navbar loggedIn={loggedIn}/>
            <Outlet />
        </>
    );
}

export {MainLayout};
