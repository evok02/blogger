import {Posts} from "../components/Posts";
import {Navbar} from "../components/Navbar";
import {Hero} from "../components/Hero";

const HomePage = () => {
    return (
    <div className="bg-zinc-900 h-screen">
        <Hero/>
        <Posts isHome={true}/>            
    </div>
    );
}

export {HomePage};
