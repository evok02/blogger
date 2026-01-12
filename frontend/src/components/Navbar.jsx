import {Link} from "react-router-dom";

const Navbar = ({loggedIn}) => {
    return (
        <div className="bg-zinc-900 px-10 py-6 flex justify-between sticky top-0 z-30">
           <p className="font-sans text-blue-500  text-3xl font-extrabold">
                <Link to="/">MyPersonalBlog</Link>
            </p> 
            <div>
               <nav className="flex gap-4 ">
                    <Link to="/articles" className="font-sans text-blue-500 sm:text-2xl lg:text-xl">Articles</Link>     
                    {loggedIn ? <Link to="/user" className="font-sans text-blue-500 sm:text-2xl lg:text-xl">Log Out</Link>: <Link to="/login" className="font-sans text-blue-500 sm:text-2xl lg:text-xl">Sign In</Link> }
               </nav> 
            </div>
        </div>
    );
}

export {Navbar};
