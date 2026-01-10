import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-zinc-900 px-10 py-6 flex justify-between">
           <p className="font-sans text-blue-500  text-3xl font-extrabold">
                <a href="/">MyPersonalBlog</a>
            </p> 
            <div>
               <nav className="flex gap-4">
                    <Link to="/articles" className="font-sans text-blue-500 sm:text-2xl lg:text-xl">Articles</Link>     
                    <Link to="/login" className="font-sans text-blue-500 sm:text-2xl lg:text-xl">Login</Link>     
               </nav> 
            </div>
        </div>
    );
}

export {Navbar};
