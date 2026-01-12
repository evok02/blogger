import {Posts} from "../components/Posts";
import {Navbar} from "../components/Navbar";
import {Hero} from "../components/Hero";
import {Footer} from "../components/Footer";

const HomePage = () => {
    return (
    <div className="bg-zinc-900 h-screen">
        <Hero/>
        <Posts isHome={true}/>            
        <Footer/>
    </div>
    );
}

export {HomePage};
