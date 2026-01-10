import {Posts} from "../components/Posts"

const ArticlesPage = () => {
    return (
        <div className="bg-zinc-900 h-screen pt-30">
            <Posts isHome={false}/>
        </div>
    );
}

export {ArticlesPage};
