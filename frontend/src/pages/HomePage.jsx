import {Posts} from "../components/Posts";
import {Navbar} from "../components/Navbar";
import {Hero} from "../components/Hero";

const HomePage = () => {
    return (
    <>
        <Navbar/>
        <Hero/>
        <Posts isHome={true}/>            
    </>
    );
}

export {HomePage};
