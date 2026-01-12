import {Link} from "react-router-dom";
import Logo from "../assets/github-mark.svg";
const Footer = () => {
    return (
        <div>
    <footer className="text-white bg-zinc-900 py-40 text-center ">
            <div className="container mx-auto max-w-xl  ">
                <div className="grid grid-cols-2 gap-30 font-semibold text-xl">
                    <div >
                        <Link className="text-blue-600 hover:text-blue-600/80" to="https://github.com/evok02" target="_blank">Github</Link>
                    </div>
                    <div >
                        <Link className="text-blue-600 hover:text-blue-600/80" to="https://www.linkedin.com/in/gleb-tereschenko-a144b229b/" target="_blank">LinkedIn</Link>
                    </div>
                </div>
            </div>
    </footer>
    <div className="text-center bg-zinc-900 pb-5 text-white">
        <h1>&copy; All rights reserved, 2026</h1>
    </div>
    </div>
    );
}

export {Footer};
