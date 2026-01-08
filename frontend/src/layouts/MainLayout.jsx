import {Outlet} from "react-router-dom";
import {Title} from "../components/Title";

const MainLayout = () => {
    return (
        <>
            <Title/>
            <Outlet/>
        </>
    );
}

export {MainLayout};
