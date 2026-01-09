import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-slate-800 drop-shadow-lg px-10 py-6 flex justify-between">
           <p className="font-sans text-blue-300  text-3xl font-extrabold">MyPersonalBlog</p> 
            <div>
               <nav className="flex gap-4">
                    <Link to="/aritcles" className="font-sans text-blue-300 sm:text-2xl lg:text-xl">Articles</Link>     
                    <Link to="/login" className="font-sans text-blue-300 sm:text-2xl lg:text-xl">Login</Link>     
               </nav> 
            </div>
        </div>
    );
}

export {Navbar};
