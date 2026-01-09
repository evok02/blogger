import {Link} from "react-router-dom";

const Post = ({title, desc}) => {
    return (
    <div className="bg-white p-5 rounded hover:bg-slate-200 relative">
        <div className="flex justify-between ">
            <Link 
                to="/" 
                className="text-2xl article-link inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 group"
            >
                    <span className="absolute inset-0"></span>
                 {title}
                <i className="arrow-icon fas fa-arrow-right ml-2 transition-transform duration-200 group-hover:translate-x-1"></i>
            </Link>
                <p>20.12.2022</p>
        </div>
        <p className="text-gray-600 leading-relaxed">
                {desc}
        </p>
    </div>
    );
}

export {Post};
