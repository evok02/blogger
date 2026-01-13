import {Link} from "react-router-dom";
import {useState} from "react";
import UpdateArticleForm from "../components/UpdateArticleForm"

const Post = ({post, isPreview}) => {
    const formatDate = (stringDate) => {
        const date = new Date(stringDate)
        let day = date.getUTCDate();
        const months = ["January","February","March","April",
            "May","June","July","August","September","October",
            "November","December"];
        let month = months[date.getMonth()];
        let year = date.getFullYear();
        return day + " " + month + " " + year;
    }

    

        return (
        <div className={isPreview ? "bg-zinc-800 p-5 relative hover:bg-zinc-800/80 z-20" : "bg-zinc-900 p-5 relative z-20"}>
            <div className="flex justify-between">
                    
                <Link 
                        to = {`/articles/${post.id}`}
                    className="text-2xl article-link inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 group"
                >
                        <span className="absolute inset-0"></span>
                     {post.title}
                    <i className="arrow-icon fas fa-arrow-right ml-2 transition-transform duration-200 group-hover:translate-x-1"></i>
                </Link>
                    <p className="text-zinc-200 pt-1.5 ml-2">{formatDate(post.created_at)}</p>
                    
            </div>
            <p className="text-zinc-400 leading-relaxed text-xl mt-4">
                    {isPreview ? post.description : post.content}
            </p>
        </div>
        );
}

export {Post};
